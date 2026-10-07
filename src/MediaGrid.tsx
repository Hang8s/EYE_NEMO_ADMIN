import { useEffect, useRef, useState } from "react";
import {
  type Attachment,
  bytes,
  date,
  type Media,
  mediaSource,
  statusNames,
  typeNames,
} from "./api";
import { navigate } from "./navigation";

function Thumbnail({ item }: { item: Media }) {
  const ref = useRef<HTMLDivElement>(null);
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (item.type !== "photo" || !item.available) return;
    const controller = new AbortController();
    let owned: string | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        mediaSource(item.id, controller.signal)
          .then((result) => {
            if (controller.signal.aborted) {
              if (result.revoke) URL.revokeObjectURL(result.url);
              return;
            }
            if (result.revoke) owned = result.url;
            setUrl(result.url);
          })
          .catch(() => {});
      },
      { rootMargin: "100px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      controller.abort();
      if (owned) URL.revokeObjectURL(owned);
    };
  }, [item.id, item.type, item.available]);
  return (
    <div className={`thumbnail kind-${item.type}`} ref={ref}>
      {url ? (
        <img src={url} alt="" loading="lazy" onError={() => setUrl("")} />
      ) : (
        <>
          <span className="file-symbol">
            {item.type === "photo"
              ? "▧"
              : ["video", "video_note", "animation"].includes(item.type)
                ? "▷"
                : ["voice", "audio"].includes(item.type)
                  ? "♫"
                  : "▤"}
          </span>
          <span>{typeNames[item.type] || item.type}</span>
        </>
      )}
    </div>
  );
}

export default function MediaGrid({
  items,
  table,
  selected,
  toggle,
  show,
}: {
  items: Media[];
  table: boolean;
  selected: Set<string>;
  toggle: (id: string) => void;
  show: (a: Attachment) => void;
}) {
  if (table)
    return (
      <div className="table-wrap panel">
        <table>
          <thead>
            <tr>
              <th aria-label="Вибір" />
              <th>Файл</th>
              <th>Тип / розмір</th>
              <th>Користувач / чат</th>
              <th>Дата</th>
              <th>Стан</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <input
                    type="checkbox"
                    aria-label={`Вибрати файл ${item.file_name || item.id}`}
                    checked={selected.has(item.id)}
                    onChange={() => toggle(item.id)}
                  />
                </td>
                <td>
                  {item.file_name || "Без назви"}
                  <small>{item.mime_type}</small>
                </td>
                <td>
                  {typeNames[item.type]}
                  <small>{bytes(item.file_size)}</small>
                </td>
                <td>
                  {item.sender_name}
                  <small>
                    {item.chat_title} · Власник {item.owner_id}
                  </small>
                </td>
                <td>{date(item.sent_at)}</td>
                <td>
                  <span
                    className={`badge ${item.available ? "success" : "warn"}`}
                  >
                    {statusNames[item.status]}
                  </span>
                </td>
                <td>
                  <button disabled={!item.available} onClick={() => show(item)}>
                    Відкрити
                  </button>
                  <button
                    className="link"
                    onClick={() =>
                      navigate("messages", { message_id: item.message_id })
                    }
                  >
                    Повідомлення
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  return (
    <div className="media-grid">
      {items.map((item) => (
        <article className="media-card panel" key={item.id}>
          <div className="media-card-top">
            <label className="check">
              <input
                type="checkbox"
                aria-label={`Вибрати файл ${item.file_name || item.id}`}
                checked={selected.has(item.id)}
                onChange={() => toggle(item.id)}
              />
            </label>
            <span className={`badge ${item.available ? "success" : "warn"}`}>
              {statusNames[item.status]}
            </span>
          </div>
          <button
            className="thumbnail-button"
            disabled={!item.available}
            onClick={() => show(item)}
            aria-label={`Відкрити ${item.file_name || typeNames[item.type]}`}
          >
            <Thumbnail item={item} />
          </button>
          <div className="media-card-info">
            <h3 title={item.file_name || ""}>
              {item.file_name || typeNames[item.type]}
            </h3>
            <p className="muted">
              {bytes(item.file_size)} · {item.sender_name}
            </p>
            <small>{date(item.sent_at)}</small>
            {item.saved_by_reply && (
              <span className="badge">Збережено reply</span>
            )}
            <button
              className="link"
              onClick={() =>
                navigate("messages", { message_id: item.message_id })
              }
            >
              {item.chat_title} →
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
