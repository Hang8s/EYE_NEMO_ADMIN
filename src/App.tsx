import { type FormEvent, useEffect, useState } from "react";
import {
  type Attachment,
  type Audit,
  bytes,
  type Chat,
  type Dashboard,
  date,
  type Media,
  type Message,
  type Operation,
  type Page,
  type Person,
  type Purge,
  request,
  saveToken,
  statusNames,
  token,
  API_BASE,
} from "./api";
import Filters from "./Filters";
import { MediaDialog, PurgeDialog } from "./Dialogs";
import MediaGrid from "./MediaGrid";
import MessageList from "./MessageList";
import People from "./People";
import { locationState, names, navigate, type View } from "./navigation";

type Row = Person | Chat | Media | Message | Operation | Audit;
const icons: Record<View, string> = {
  overview: "◫",
  owners: "♙",
  participants: "♧",
  chats: "▣",
  messages: "≡",
  media: "▧",
  operations: "↻",
  audit: "☷",
  settings: "⚙",
};
const listViews: View[] = [
  "owners",
  "participants",
  "chats",
  "messages",
  "media",
  "operations",
  "audit",
];
const filterViews: View[] = [
  "owners",
  "participants",
  "chats",
  "messages",
  "media",
];

function Login() {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    try {
      const result = await request<{ token: string }>("/auth/login", {
        username: data.get("username"),
        password: data.get("password"),
      });
      saveToken(result.token);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="login">
      <div className="login-story">
        <a className="brand" href="#/overview">
          <span className="brand-mark">◉</span>EYE<span>NEMO</span>
        </a>
        <div>
          <p className="eyebrow">ЦЕНТР АДМІНІСТРУВАННЯ</p>
          <h1>
            Увесь архів.
            <br />
            Під твоїм контролем.
          </h1>
          <p>
            Користувачі, розмови та медіа —<br />в одному робочому просторі.
          </p>
        </div>
        <small>Telegram Business Archive</small>
      </div>
      <form className="login-form" onSubmit={submit}>
        <span className="badge">ADMIN ACCESS</span>
        <h2>Вхід до адмінки</h2>
        <p className="muted">Увійди, щоб працювати з архівом.</p>
        <label>
          Логін
          <input
            name="username"
            autoComplete="username"
            required
            maxLength={128}
            autoFocus
          />
        </label>
        <label>
          Пароль
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            maxLength={1024}
          />
        </label>
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        {!API_BASE && (
          <p className="error">
            Адреса API не налаштована. Вкажіть VITE_API_BASE_URL під час збірки.
          </p>
        )}
        <button disabled={busy || !API_BASE} className="primary">
          {busy ? "Перевіряємо…" : "Увійти →"}
        </button>
      </form>
    </main>
  );
}

export default function App() {
  const [session, setSession] = useState(token);
  const [route, setRoute] = useState(locationState);
  const [revision, setRevision] = useState(0);
  const [rawItems, setItems] = useState<Row[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [stats, setStats] = useState<Dashboard>();
  const [rawSelected, setSelected] = useState(new Set<string>());
  const [loadedKey, setLoadedKey] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [purge, setPurge] = useState<Purge>();
  const [attachment, setAttachment] = useState<Attachment>();
  const [menu, setMenu] = useState(false);
  const view = route.view,
    query = route.params.toString();
  const items = loadedKey === `${view}:${query}` ? rawItems : [];
  const selected =
    loadedKey === `${view}:${query}` ? rawSelected : new Set<string>();
  const refresh = () => setRevision((n) => n + 1);
  useEffect(() => {
    const changed = () => {
      setRoute(locationState());
      setMenu(false);
    };
    const sessionChanged = () => setSession(token());
    window.addEventListener("hashchange", changed);
    window.addEventListener("admin-session", sessionChanged);
    return () => {
      window.removeEventListener("hashchange", changed);
      window.removeEventListener("admin-session", sessionChanged);
    };
  }, []);
  useEffect(() => {
    if (!session || view === "settings") return;
    const controller = new AbortController();
    setBusy(true);
    setError("");
    setItems([]);
    setCursor(null);
    setSelected(new Set());
    setLoadedKey(`${view}:${query}`);
    const params = new URLSearchParams(query);
    params.delete("layout");
    const promise =
      view === "overview"
        ? request<Dashboard>("/stats", undefined, controller.signal).then(
            setStats,
          )
        : request<Page<Row>>(
            `/${view}?${params}`,
            undefined,
            controller.signal,
          ).then((page) => {
            setItems(page.items);
            setCursor(page.next_cursor || null);
          });
    promise
      .catch((e) => {
        if (!controller.signal.aborted) setError(e.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setBusy(false);
      });
    return () => controller.abort();
  }, [session, view, query, revision]);
  useEffect(() => {
    if (!session || view !== "operations") return;
    const timer = setInterval(refresh, 15000);
    return () => clearInterval(timer);
  }, [session, view]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 5000);
    return () => clearTimeout(timer);
  }, [notice]);
  useEffect(() => {
    if (!session) {
      setAttachment(undefined);
      setPurge(undefined);
      setItems([]);
      setStats(undefined);
    }
  }, [session]);
  if (!session) return <Login />;
  function toggle(id: string) {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else if (next.size < 100) next.add(id);
      return next;
    });
  }
  function idOf(item: Row) {
    return "telegram_id" in item ? String(item.telegram_id) : item.id;
  }
  async function more() {
    if (!cursor || busy) return;
    setBusy(true);
    setError("");
    const requestedView = view,
      requestedQuery = query;
    const params = new URLSearchParams(query);
    params.delete("layout");
    params.set("cursor", cursor);
    try {
      const page = await request<Page<Row>>(`/${view}?${params}`);
      if (
        locationState().view === requestedView &&
        locationState().params.toString() === requestedQuery
      ) {
        setItems((current) => [
          ...current,
          ...page.items.filter(
            (row) => !current.some((old) => idOf(old) === idOf(row)),
          ),
        ]);
        setCursor(page.next_cursor || null);
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function logout() {
    try {
      await request("/auth/logout", {});
    } catch {
      /* Local exit still clears the session on a network failure. */
    } finally {
      saveToken(null);
    }
  }
  async function bulkBlock(blocked: boolean) {
    setBusy(true);
    setError("");
    try {
      for (const id of selected)
        await request("/blocks", {
          kind: view === "owners" ? "owner" : "participant",
          telegram_id: Number(id),
          blocked,
        });
      setNotice("Дії застосовано до вибраних користувачів");
      refresh();
    } catch (e) {
      setError((e as Error).message);
      refresh();
    } finally {
      setBusy(false);
    }
  }
  const table = route.params.get("layout") === "table";
  const scoped = ["owner_id", "participant_id", "chat_id", "message_id"].filter(
    (key) => route.params.has(key),
  );
  return (
    <div className="shell">
      <aside className={menu ? "sidebar open" : "sidebar"}>
        <a className="brand" href="#/overview">
          <span className="brand-mark">◉</span>EYE<span>NEMO</span>
        </a>
        <p className="sidebar-caption">КЕРУВАННЯ АРХІВОМ</p>
        <nav aria-label="Основна навігація">
          {Object.entries(names).map(([key, label]) => (
            <a
              key={key}
              className={view === key ? "active" : ""}
              href={`#/${key}`}
              aria-current={view === key ? "page" : undefined}
            >
              <span>{icons[key as View]}</span>
              {label}
              {view === key && <i />}
            </a>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <span className="online-dot" />
          Адміністративний простір
          <small>Один обліковий запис · повний доступ</small>
          <button onClick={logout}>Вийти з облікового запису ↗</button>
        </div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <button
            className="menu-button"
            aria-label="Відкрити меню"
            onClick={() => setMenu(!menu)}
          >
            ☰
          </button>
          <span>
            Робочий простір <span className="muted">/</span>{" "}
            <b>{names[view]}</b>
          </span>
          <span className="admin-chip">
            <span className="online-dot" /> Адміністратор
          </span>
        </header>
        <main className="content">
          <div className="page-heading">
            <div>
              <p className="eyebrow">EYE NEMO / ARCHIVE CONTROL</p>
              <h1>{names[view]}</h1>
              <p className="muted">
                {view === "overview"
                  ? "Стан архіву та активність за останній час."
                  : view === "owners" || view === "participants"
                    ? "Переглядай архіви та керуй доступом до архівування."
                    : view === "media"
                      ? "Фото, відео й файли з усіх розмов."
                      : view === "operations"
                        ? "Хід стирання даних і результати фонових операцій."
                        : view === "audit"
                          ? "Історія адміністративних дій."
                          : view === "settings"
                            ? "Пароль та активні сесії адміністратора."
                            : "Перегляд і пошук у збережених розмовах."}
              </p>
            </div>
            <button onClick={refresh} disabled={busy}>
              ↻ Оновити
            </button>
          </div>
          {scoped.length > 0 && (
            <div className="scope-bar">
              {scoped.map((key) => (
                <span key={key}>
                  {
                    (
                      {
                        owner_id: "Власник",
                        participant_id: "Відправник",
                        chat_id: "Чат",
                        message_id: "Повідомлення",
                      } as Record<string, string>
                    )[key]
                  }
                  : <b>{route.params.get(key)}</b>
                </span>
              ))}
              {view === "messages" && (
                <button
                  onClick={() => {
                    const p = new URLSearchParams(query);
                    p.delete("message_id");
                    navigate("media", p);
                  }}
                >
                  Медіа цієї вибірки →
                </button>
              )}
            </div>
          )}
          {filterViews.includes(view) && (
            <Filters view={view} params={route.params} />
          )}
          {error && (
            <div role="alert" className="error panel">
              {error} <button onClick={refresh}>Повторити</button>
            </div>
          )}
          {notice && (
            <div role="status" className="notice">
              {notice}
            </div>
          )}
          {view === "overview" && stats && <Overview stats={stats} />}
          {view === "settings" && <Settings report={setNotice} />}
          {listViews.includes(view) && (
            <>
              <div className="list-toolbar">
                <span className="muted">
                  Завантажено: <b>{items.length}</b>
                  {selected.size ? ` · Вибрано: ${selected.size}` : ""}
                </span>
                <div className="actions">
                  {filterViews.includes(view) && items.length > 0 && (
                    <button
                      onClick={() =>
                        setSelected(
                          selected.size === Math.min(items.length, 100)
                            ? new Set()
                            : new Set(items.slice(0, 100).map(idOf)),
                        )
                      }
                    >
                        {selected.size === Math.min(items.length, 100)
                        ? "Зняти вибір"
                          : "Вибрати до 100"}
                    </button>
                  )}
                  {selected.size > 0 &&
                    (view === "owners" || view === "participants" ? (
                      <>
                        <button disabled={busy} onClick={() => bulkBlock(true)}>
                          Заблокувати
                        </button>
                        <button
                          disabled={busy}
                          onClick={() => bulkBlock(false)}
                        >
                          Розблокувати
                        </button>
                      </>
                    ) : (
                      <button
                        className="danger"
                        onClick={() =>
                          setPurge({
                            kind:
                              view === "chats"
                                ? "chat"
                                : view === "messages"
                                  ? "message"
                                  : "attachment",
                            ids: [...selected],
                          })
                        }
                      >
                        Стерти вибрані…
                      </button>
                    ))}
                  {view === "media" && (
                    <button
                      onClick={() => {
                        const p = new URLSearchParams(query);
                        p.set("layout", table ? "gallery" : "table");
                        navigate(view, p);
                      }}
                    >
                      {table ? "▧ Галерея" : "☷ Таблиця"}
                    </button>
                  )}
                </div>
              </div>
              {view === "owners" || view === "participants" ? (
                <People
                  items={items as Person[]}
                  kind={view === "owners" ? "owner" : "participant"}
                  selected={selected}
                  toggle={toggle}
                  purge={setPurge}
                  refresh={refresh}
                  report={setNotice}
                />
              ) : view === "chats" ? (
                <ChatTable
                  items={items as Chat[]}
                  selected={selected}
                  toggle={toggle}
                  params={route.params}
                />
              ) : view === "messages" ? (
                <MessageList
                  items={items as Message[]}
                  selected={selected}
                  toggle={toggle}
                  showMedia={setAttachment}
                />
              ) : view === "media" ? (
                <MediaGrid
                  items={items as Media[]}
                  table={table}
                  selected={selected}
                  toggle={toggle}
                  show={setAttachment}
                />
              ) : view === "operations" ? (
                <Operations
                  items={items as Operation[]}
                  refresh={refresh}
                  error={setError}
                />
              ) : (
                <AuditTable items={items as Audit[]} />
              )}
              {!busy && !error && items.length === 0 && (
                <div className="empty panel">
                  <span>◌</span>
                  <h2>Тут поки порожньо</h2>
                  <p>
                    Спробуй змінити фільтри або зачекай на нові дані архіву.
                  </p>
                </div>
              )}
              {cursor && (
                <div className="load-more">
                  <button disabled={busy} onClick={more}>
                    {busy ? "Завантажуємо…" : "Завантажити ще"}
                  </button>
                </div>
              )}
            </>
          )}
          {busy && items.length === 0 && (
            <div role="status" className="loading">
              Завантажуємо дані…
            </div>
          )}
        </main>
        <footer className="workspace-footer">
          EYE NEMO · Адміністрування архіву
          <span>Час відображається за Києвом</span>
        </footer>
      </div>
      {purge && (
        <PurgeDialog
          selection={purge}
          close={() => setPurge(undefined)}
          done={() => {
            setNotice("Операцію стирання створено");
            navigate("operations");
            refresh();
          }}
        />
      )}
      {attachment && (
        <MediaDialog
          attachment={attachment}
          close={() => setAttachment(undefined)}
        />
      )}
    </div>
  );
}

function Overview({ stats }: { stats: Dashboard }) {
  const cards: [string, number | string, string, View][] = [
    ["Власники архівів", stats.owners, "Підключені облікові записи", "owners"],
    [
      "Співрозмовники",
      stats.participants,
      "Відправники повідомлень",
      "participants",
    ],
    ["Збережені повідомлення", stats.messages, "У всіх архівах", "messages"],
    [
      "Медіафайли",
      stats.media,
      `${bytes(stats.stored_bytes)} у сховищі`,
      "media",
    ],
  ];
  return (
    <>
      <div className="stats-grid">
        {cards.map(([label, value, hint, target]) => (
          <button
            className="stat-card panel"
            key={label}
            onClick={() => navigate(target)}
          >
            <span>{label} ↗</span>
            <strong>
              {typeof value === "number"
                ? value.toLocaleString("uk-UA")
                : value}
            </strong>
            <small>{hint}</small>
          </button>
        ))}
      </div>
      <div className="overview-grid">
        <section className="panel overview-panel">
          <div className="section-heading">
            <h2>Активність архіву</h2>
            <span className="badge">ОСТАННІ 7 ДНІВ</span>
          </div>
          <div className="activity-number">
            {stats.last_7d.toLocaleString("uk-UA")}
            <small>повідомлень за тиждень</small>
          </div>
          <div className="activity-bars">
            <div>
              <span>За останні 24 години</span>
              <b>{stats.last_24h}</b>
            </div>
            <progress max={Math.max(stats.last_7d, 1)} value={stats.last_24h} />
            <div>
              <span>За останні 7 днів</span>
              <b>{stats.last_7d}</b>
            </div>
            <progress max={Math.max(stats.last_7d, 1)} value={stats.last_7d} />
          </div>
        </section>
        <section className="panel overview-panel">
          <h2>Стан системи</h2>
          <div className="system-row">
            <span>Чати в архіві</span>
            <b>{stats.chats}</b>
          </div>
          <div className="system-row">
            <span>Помилки завантаження</span>
            <button
              className="link"
              onClick={() => navigate("media", { availability: "failed" })}
            >
              {stats.failed_downloads} →
            </button>
          </div>
          <div className="system-row">
            <span>Операції в черзі</span>
            <button className="link" onClick={() => navigate("operations")}>
              {stats.pending_operations} →
            </button>
          </div>
          <div className="system-note">
            <span className="online-dot" />
            Дані отримано із сервера
          </div>
        </section>
      </div>
      <section className="panel quick-links">
        <h2>Швидкий перехід</h2>
        <div>
          {[
            ["Фото", "photo"],
            ["Відео", "video"],
            ["Голосові", "voice"],
            ["Документи", "document"],
          ].map(([label, kind]) => (
            <button
              key={kind}
              onClick={() => navigate("media", { content_type: kind })}
            >
              {label} <span>→</span>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

function ChatTable({
  items,
  selected,
  toggle,
  params,
}: {
  items: Chat[];
  selected: Set<string>;
  toggle: (id: string) => void;
  params: URLSearchParams;
}) {
  const open = (view: View, chat: Chat) => {
    const next = new URLSearchParams(params);
    next.delete("q");
    next.delete("participant_id");
    next.set("chat_id", chat.id);
    navigate(view, next);
  };
  return (
    <div className="table-wrap panel">
      <table>
        <thead>
          <tr>
            <th aria-label="Вибір" />
            <th>Чат</th>
            <th>Власник архіву</th>
            <th>Повідомлення</th>
            <th>Останнє оновлення</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {items.map((chat) => (
            <tr key={chat.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.has(chat.id)}
                  onChange={() => toggle(chat.id)}
                  aria-label={`Вибрати чат ${chat.title}`}
                />
              </td>
              <td>
                <button className="link" onClick={() => open("messages", chat)}>
                  {chat.title}
                </button>
                <small>{chat.telegram_chat_id}</small>
              </td>
              <td>
                {chat.owner_name}
                <small>{chat.owner_id}</small>
              </td>
              <td>{chat.messages}</td>
              <td>{date(chat.updated_at)}</td>
              <td>
                <button onClick={() => open("messages", chat)}>
                  Повідомлення
                </button>
                <button onClick={() => open("media", chat)}>Медіа</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Operations({
  items,
  refresh,
  error,
}: {
  items: Operation[];
  refresh: () => void;
  error: (s: string) => void;
}) {
  async function retry(id: string) {
    try {
      await request(`/operations/${id}/retry`, {});
      refresh();
    } catch (e) {
      error((e as Error).message);
    }
  }
  return (
    <div className="table-wrap panel">
      <table>
        <thead>
          <tr>
            <th>Операція</th>
            <th>Створено</th>
            <th>Стан</th>
            <th>Прогрес</th>
            <th>Помилка / дії</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                Стирання: {String(item.selection.kind)}
                <small>{item.id}</small>
              </td>
              <td>{date(item.created_at)}</td>
              <td>
                <span
                  className={`badge ${item.status === "failed" ? "warn" : ""}`}
                >
                  {statusNames[item.status] || item.status}
                </span>
              </td>
              <td>
                {item.processed} / {item.total}
                <progress
                  max={Math.max(item.total, 1)}
                  value={item.processed}
                />
              </td>
              <td>
                {item.last_error || "—"}
                {item.status === "failed" && (
                  <button onClick={() => retry(item.id)}>Повторити</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const actions: Record<string, string> = {
  login: "Вхід",
  login_failed: "Невдалий вхід",
  logout: "Вихід",
  password_changed: "Зміна пароля",
  sessions_revoked: "Завершено всі сесії",
  blocked: "Блокування",
  unblocked: "Розблокування",
  purge_requested: "Створено стирання",
  purge_completed: "Стирання завершено",
  purge_retry: "Повторення стирання",
  purge_failed: "Помилка стирання",
  purge_manual_retry: "Ручний повтор стирання",
};
function AuditTable({ items }: { items: Audit[] }) {
  return (
    <div className="table-wrap panel">
      <table>
        <thead>
          <tr>
            <th>Час</th>
            <th>Дія</th>
            <th>Об’єкт</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{date(item.created_at)}</td>
              <td>{actions[item.action] || item.action}</td>
              <td className="mono">{item.target || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Settings({ report }: { report: (s: string) => void }) {
  const [blocks, setBlocks] = useState<string[]>([]);
  const [blocksRevision, setBlocksRevision] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    request<string[]>("/blocks", undefined, controller.signal)
      .then(setBlocks)
      .catch((e) => {
        if (!controller.signal.aborted) setError(e.message);
      });
    return () => controller.abort();
  }, [blocksRevision]);
  async function unblock(key: string) {
    const [kind, id, owner] = key.split(":");
    setBusy(true);
    setError("");
    try {
      await request("/blocks", {
        kind,
        telegram_id: Number(id),
        owner_id: owner && owner !== "all" ? Number(owner) : null,
        blocked: false,
      });
      setBlocksRevision((n) => n + 1);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function change(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("new_password") !== data.get("repeat")) {
      setError("Нові паролі не збігаються");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await request("/auth/password", {
        current_password: data.get("current_password"),
        new_password: data.get("new_password"),
      });
      report("Пароль змінено. Увійдіть знову.");
      saveToken(null);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function revoke() {
    setBusy(true);
    setError("");
    try {
      await request("/auth/revoke-all", {});
      saveToken(null);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="settings-grid">
      <form className="panel settings-panel" onSubmit={change}>
        <h2>Змінити пароль</h2>
        <label>
          Поточний пароль
          <input
            type="password"
            name="current_password"
            autoComplete="current-password"
            required
          />
        </label>
        <label>
          Новий пароль
          <input
            type="password"
            name="new_password"
            autoComplete="new-password"
            minLength={12}
            maxLength={1024}
            required
          />
        </label>
        <label>
          Повторіть новий пароль
          <input
            type="password"
            name="repeat"
            autoComplete="new-password"
            minLength={12}
            required
          />
        </label>
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <button className="primary" disabled={busy}>
          Змінити пароль
        </button>
      </form>
      <section className="panel settings-panel">
        <h2>Сесії адміністратора</h2>
        <p>
          Кожна сесія діє до 8 годин. Завершення всіх сесій одразу скасовує
          доступ на всіх пристроях, включно з цим.
        </p>
        <button disabled={busy} onClick={revoke}>
          Завершити всі сесії
        </button>
      </section>
      <section className="panel settings-panel">
        <h2>Блокування архівування</h2>
        <p>
          Блокування зберігається після стирання даних. Тут можна зняти його
          навіть для видаленого профілю.
        </p>
        {blocks.length === 0 ? (
          <p>Активних блокувань немає.</p>
        ) : (
          blocks.map((key) => {
            const [kind, id, owner] = key.split(":");
            return (
              <div className="system-row" key={key}>
                <span>
                  {kind === "owner" ? "Власник" : "Співрозмовник"} {id}
                  <small>
                    {kind === "participant"
                      ? owner === "all"
                        ? " · Усі архіви"
                        : ` · Власник ${owner}`
                      : ""}
                  </small>
                </span>
                <button disabled={busy} onClick={() => unblock(key)}>
                  Розблокувати
                </button>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}
