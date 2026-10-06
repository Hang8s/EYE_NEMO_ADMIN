import { useEffect, useState } from "react";
import { Dialog } from "./Dialogs";
import { date, type Person, type Purge, request, type Schemas } from "./api";
import { navigate } from "./navigation";

export default function People({
  items,
  kind,
  selected,
  toggle,
  purge,
  refresh,
  report,
}: {
  items: Person[];
  kind: "owner" | "participant";
  selected: Set<string>;
  toggle: (id: string) => void;
  purge: (s: Purge) => void;
  refresh: () => void;
  report: (text: string) => void;
}) {
  const [person, setPerson] = useState<Person>();
  return (
    <>
      <div className="people-grid">
        {items.map((item) => (
          <article className="person panel" key={item.telegram_id}>
            <div className="person-top">
              <span className="avatar">
                {item.name.slice(0, 1).toUpperCase()}
              </span>
              <label className="check">
                <input
                  type="checkbox"
                  aria-label={`Вибрати ${item.name}`}
                  checked={selected.has(String(item.telegram_id))}
                  onChange={() => toggle(String(item.telegram_id))}
                />
              </label>
            </div>
            <h3>
              <button className="link" onClick={() => setPerson(item)}>
                {item.name}
              </button>
            </h3>
            <p className="muted">
              {item.username ? `@${item.username} · ` : ""}
              {item.telegram_id}
            </p>
            <div className="person-stats">
              <span>
                <b>{item.chats}</b> чатів
              </span>
              <span>
                <b>{item.messages}</b> повідомлень
              </span>
              <span>
                <b>{item.media}</b> медіа
              </span>
            </div>
            <div className="person-footer">
              <span className={`badge ${item.blocked ? "warn" : "success"}`}>
                {item.blocked ? "Заблокований" : "Архівування дозволено"}
              </span>
              <button onClick={() => setPerson(item)}>Відкрити →</button>
            </div>
          </article>
        ))}
      </div>
      {person && (
        <PersonDialog
          person={person}
          kind={kind}
          close={() => setPerson(undefined)}
          purge={(s) => {
            setPerson(undefined);
            purge(s);
          }}
          refresh={refresh}
          report={report}
        />
      )}
    </>
  );
}

function PersonDialog({
  person,
  kind,
  close,
  purge,
  refresh,
  report,
}: {
  person: Person;
  kind: "owner" | "participant";
  close: () => void;
  purge: (s: Purge) => void;
  refresh: () => void;
  report: (s: string) => void;
}) {
  const [scope, setScope] = useState("");
  const [busy, setBusy] = useState(false);
  const [keys, setKeys] = useState<string[]>();
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    request<string[]>("/blocks", undefined, controller.signal)
      .then(setKeys)
      .catch((e) => {
        if (!controller.signal.aborted) setError(e.message);
      });
    return () => controller.abort();
  }, []);
  const key =
    kind === "owner"
      ? `owner:${person.telegram_id}`
      : `participant:${person.telegram_id}:${scope || "all"}`;
  const blocked = keys?.includes(key) || false;
  const params =
    kind === "owner"
      ? { owner_id: String(person.telegram_id) }
      : {
          participant_id: String(person.telegram_id),
          ...(scope ? { owner_id: scope } : {}),
        };
  async function block() {
    setBusy(true);
    setError("");
    try {
      await request("/blocks", {
        kind,
        telegram_id: person.telegram_id,
        owner_id: scope ? Number(scope) : null,
        blocked: !blocked,
      });
      refresh();
      report(blocked ? "Блокування знято" : "Архівування заблоковано");
      close();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <Dialog title={person.name} close={close}>
      <p className="muted">
        Telegram ID: {person.telegram_id}
        {person.username ? ` · @${person.username}` : ""}
      </p>
      <div className="preview-counts">
        <span>
          <b>{person.connections}</b> підключень
        </span>
        <span>
          <b>{person.chats}</b> чатів
        </span>
        <span>
          <b>{person.messages}</b> повідомлень
        </span>
        <span>
          <b>{person.media}</b> медіа
        </span>
      </div>
      {kind === "participant" && (
        <label>
          Обсяг дії: Telegram ID власника
          <input
            aria-label="Обсяг дії: Telegram ID власника"
            type="number"
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            placeholder="Порожнє поле — усі архіви"
          />
          <small>
            Перегляд чатів показує обидві сторони розмови. Медіатека — файли
            цього відправника.
          </small>
        </label>
      )}
      {kind === "owner" && <Connections ownerId={person.telegram_id} />}
      <div className="actions">
        <button
          className="primary"
          onClick={() => {
            navigate("chats", params);
            close();
          }}
        >
          Чати користувача
        </button>
        <button
          onClick={() => {
            navigate("media", params);
            close();
          }}
        >
          Усі медіа
        </button>
        <button
          onClick={() => {
            navigate("messages", params);
            close();
          }}
        >
          Повідомлення
        </button>
      </div>
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
      <footer>
        <button disabled={busy || !keys} onClick={block}>
          {blocked ? "Розблокувати" : "Заблокувати архівування"}
        </button>
        <button
          className="danger"
          disabled={busy}
          onClick={() =>
            purge({
              kind,
              telegram_id: person.telegram_id,
              owner_id: scope ? Number(scope) : null,
            })
          }
        >
          Стерти дані…
        </button>
      </footer>
    </Dialog>
  );
}

function Connections({ ownerId }: { ownerId: number }) {
  const [items, setItems] = useState<Schemas["ConnectionResponse"][]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    request<Schemas["ConnectionPage"]>(
      `/owners/${ownerId}/connections`,
      undefined,
      controller.signal,
    )
      .then((page) => {
        setItems(page.items);
        setCursor(page.next_cursor || null);
      })
      .catch((e) => {
        if (!controller.signal.aborted) setError(e.message);
      });
    return () => controller.abort();
  }, [ownerId]);
  async function more() {
    setBusy(true);
    setError("");
    try {
      const page = await request<Schemas["ConnectionPage"]>(
        `/owners/${ownerId}/connections?cursor=${encodeURIComponent(cursor!)}`,
      );
      setItems((old) => [...old, ...page.items]);
      setCursor(page.next_cursor || null);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <details>
      <summary>Підключення Telegram Business</summary>
      {items.map((connection) => (
        <div className="system-row" key={connection.id}>
          <span className="mono">
            {connection.telegram_business_connection_id}
            <small>
              {connection.connected_at
                ? date(connection.connected_at)
                : "Дата підключення невідома"}
              {connection.disconnected_at
                ? ` · Відключено ${date(connection.disconnected_at)}`
                : ""}
            </small>
          </span>
          <span
            className={`badge ${connection.is_enabled ? "success" : "warn"}`}
          >
            {connection.is_enabled ? "Активне" : "Відключене"}
          </span>
        </div>
      ))}
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      {cursor && (
        <button onClick={more} disabled={busy}>
          Ще підключення
        </button>
      )}
    </details>
  );
}
