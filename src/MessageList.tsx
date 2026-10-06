import { useEffect, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { type Attachment, date, type Message, request, typeNames } from "./api";
import { navigate } from "./navigation";
import { Dialog } from "./Dialogs";

export function MessageCard({
  item,
  selected,
  toggle,
  showMedia,
  inspect,
}: {
  item: Message;
  selected: boolean;
  toggle: () => void;
  showMedia: (a: Attachment) => void;
  inspect?: () => void;
}) {
  const versions = item.versions || [],
    unversioned = item.unversioned_attachments || [];
  return (
    <article className={`message panel ${item.is_outgoing ? "outgoing" : ""}`}>
      <div className="message-meta">
        <label className="check">
          <input
            type="checkbox"
            checked={selected}
            onChange={toggle}
            aria-label={`Вибрати повідомлення ${item.telegram_message_id}`}
          />
        </label>
        <strong>{item.sender_name}</strong>
        <span>{item.is_outgoing ? "Вихідне" : "Вхідне"}</span>
        <time>{date(item.sent_at)}</time>
      </div>
      <div className="message-context">
        <button
          className="link"
          onClick={() => navigate("messages", { chat_id: item.chat_id })}
        >
          {item.chat_title}
        </button>
        <span>
          Власник {item.owner_id} · #{item.telegram_message_id}
        </span>
        {item.is_deleted && (
          <span className="badge warn">Видалено в Telegram</span>
        )}
        {item.edited_at && <span className="badge">Редаговано</span>}
      </div>
      {item.reply_to_telegram_message_id && (
        <div className="reply">
          ↳ Відповідь на #{item.reply_to_telegram_message_id}{" "}
          {item.reply_to_message_id && (
            <button
              className="link"
              onClick={() =>
                navigate("messages", { message_id: item.reply_to_message_id! })
              }
            >
              Перейти
            </button>
          )}
        </div>
      )}
      <p className="message-text">
        {item.text ||
          item.caption ||
          typeNames[item.message_type] ||
          item.message_type}
      </p>
      <div className="attachments">
        {item.attachments.map((a) => (
          <button
            key={a.id}
            disabled={!a.available}
            onClick={() => showMedia(a)}
          >
            {typeNames[a.type] || a.type} · {a.file_name || "Файл"}
            {!a.available ? " · Недоступний" : ""}
            {a.saved_by_reply ? " · Збережено reply" : ""}
          </button>
        ))}
      </div>
      {versions.length > 0 && (
        <details>
          <summary>Історія: {versions.length} версій</summary>
          {versions.map((v) => (
            <div className="version" key={v.id}>
              <small>
                {v.kind === "original"
                  ? "Оригінал"
                  : v.kind === "edit"
                    ? "Редагування"
                    : "Попередній архів"}{" "}
                · {date(v.edited_at || v.observed_at)}
              </small>
              <p>{v.text || v.caption || "Без тексту"}</p>
              {v.attachments.map((a) => (
                <button
                  key={a.id}
                  disabled={!a.available}
                  onClick={() => showMedia(a)}
                >
                  {a.file_name || typeNames[a.type]}
                  {!a.available ? " · Недоступний" : ""}
                </button>
              ))}
            </div>
          ))}
        </details>
      )}
      {unversioned.length > 0 && (
        <details>
          <summary>Файли з невідомою версією</summary>
          {unversioned.map((a) => (
            <button
              key={a.id}
              disabled={!a.available}
              onClick={() => showMedia(a)}
            >
              {a.file_name || "Файл"}
            </button>
          ))}
        </details>
      )}
      {inspect && (
        <button className="link details-link" onClick={inspect}>
          Усі дані повідомлення
        </button>
      )}
    </article>
  );
}

export default function MessageList({
  items,
  selected,
  toggle,
  showMedia,
}: {
  items: Message[];
  selected: Set<string>;
  toggle: (id: string) => void;
  showMedia: (a: Attachment) => void;
}) {
  const scroll = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => scroll.current,
    estimateSize: () => 260,
    overscan: 5,
    getItemKey: (index) => items[index].id,
  });
  const [inspect, setInspect] = useState<string>();
  return (
    <>
      <div className="message-scroll" ref={scroll}>
        <div
          style={{ height: virtualizer.getTotalSize(), position: "relative" }}
        >
          {virtualizer.getVirtualItems().map((row) => (
            <div
              key={row.key}
              data-index={row.index}
              ref={virtualizer.measureElement}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${row.start}px)`,
              }}
            >
              <MessageCard
                item={items[row.index]}
                selected={selected.has(items[row.index].id)}
                toggle={() => toggle(items[row.index].id)}
                showMedia={showMedia}
                inspect={() => setInspect(items[row.index].id)}
              />
            </div>
          ))}
        </div>
      </div>
      {inspect && (
        <MessageDetail id={inspect} close={() => setInspect(undefined)} />
      )}
    </>
  );
}

function MessageDetail({ id, close }: { id: string; close: () => void }) {
  const [item, setItem] = useState<Message>();
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    request<Message>(`/messages/${id}`, undefined, controller.signal)
      .then(setItem)
      .catch((e) => {
        if (!controller.signal.aborted) setError(e.message);
      });
    return () => controller.abort();
  }, [id]);
  return (
    <Dialog title="Дані повідомлення" close={close}>
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
      {item ? (
        <pre className="raw-details">{JSON.stringify(item, null, 2)}</pre>
      ) : (
        !error && <p>Завантажуємо…</p>
      )}
    </Dialog>
  );
}
