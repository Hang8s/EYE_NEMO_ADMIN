import { type ReactNode } from "react";
import Filters from "../Filters";
import { filterViews, names, navigate, type View } from "../navigation";

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

export default function AdminLayout({
  view,
  params,
  menu,
  setMenu,
  logout,
  refresh,
  busy,
  children,
}: {
  view: View;
  params: URLSearchParams;
  menu: boolean;
  setMenu: (menu: boolean) => void;
  logout: () => Promise<void>;
  refresh: () => void;
  busy: boolean;
  children: ReactNode;
}) {
  const query = params.toString();
  const scoped = ["owner_id", "participant_id", "chat_id", "message_id"].filter(
    (key) => params.has(key),
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
                  : <b>{params.get(key)}</b>
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
            <Filters view={view} params={params} />
          )}
          {children}
        </main>
        <footer className="workspace-footer">
          EYE NEMO · Адміністрування архіву
          <span>Час відображається за Києвом</span>
        </footer>
      </div>
    </div>
  );
}
