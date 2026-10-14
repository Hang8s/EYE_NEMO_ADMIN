import {
  type Attachment,
  type Audit,
  type Chat,
  type Media,
  type Message,
  type Operation,
  type Person,
  type Purge,
} from "../api";
import { type AdminList } from "../hooks/useAdminList";
import { filterViews, navigate, type View } from "../navigation";
import MediaGrid from "../MediaGrid";
import MessageList from "../MessageList";
import People from "../People";
import ChatTable from "./ChatTable";
import Operations from "./Operations";
import AuditTable from "./AuditTable";

export default function ListScreen({
  view,
  params,
  list,
  setPurge,
  setAttachment,
  report,
}: {
  view: View;
  params: URLSearchParams;
  list: AdminList;
  setPurge: (purge: Purge) => void;
  setAttachment: (attachment: Attachment) => void;
  report: (notice: string) => void;
}) {
  const {
    items,
    selected,
    busy,
    error,
    trimmedMessages,
    cursor,
    toggle,
    toggleAll,
    more,
    bulkBlock,
    refresh,
    setError,
  } = list;
  const table = params.get("layout") === "table";
  const query = params.toString();
  return (
    <>
      <div className="list-toolbar">
        <span className="muted">
          Завантажено: <b>{items.length}</b>
          {selected.size ? ` · Вибрано: ${selected.size}` : ""}
        </span>
        <div className="actions">
          {filterViews.includes(view) && items.length > 0 && (
            <button onClick={toggleAll}>
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
                <button disabled={busy} onClick={() => bulkBlock(false)}>
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
          report={report}
        />
      ) : view === "chats" ? (
        <ChatTable
          items={items as Chat[]}
          selected={selected}
          toggle={toggle}
          params={params}
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
          <p>Спробуй змінити фільтри або зачекай на нові дані архіву.</p>
        </div>
      )}
      {trimmedMessages && (
        <button disabled={busy} onClick={refresh}>
          До останніх повідомлень
        </button>
      )}
      {cursor && (
        <div className="load-more">
          <button disabled={busy} onClick={more}>
            {busy ? "Завантажуємо…" : "Завантажити ще"}
          </button>
        </div>
      )}
    </>
  );
}
