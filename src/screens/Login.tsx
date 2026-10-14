import { type FormEvent, useState } from "react";
import { API_BASE } from "../api";

export default function Login({
  login,
}: {
  login: (data: FormData) => Promise<void>;
}) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    try {
      await login(data);
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
