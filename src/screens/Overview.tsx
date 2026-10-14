import { bytes, type Dashboard } from "../api";
import { navigate, type View } from "../navigation";

export default function Overview({ stats }: { stats: Dashboard }) {
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
            <span>Видалення в черзі</span>
            <button className="link" onClick={() => navigate("operations")}>
              {stats.pending_operations} →
            </button>
          </div>
          <div className="system-row">
            <span>Медіа в черзі</span>
            <b>{stats.pending_media_jobs ?? 0}</b>
          </div>
          <div className="system-row">
            <span>Невиконані медіазавдання</span>
            <b>{stats.failed_media_jobs ?? 0}</b>
          </div>
          <div className="system-row">
            <span>Найстаріше медіазавдання</span>
            <b>
              {stats.oldest_media_job_age_seconds == null
                ? "—"
                : `${Math.ceil(stats.oldest_media_job_age_seconds / 60)} хв`}
            </b>
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
