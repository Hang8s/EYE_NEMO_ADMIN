import { type FormEvent, useEffect, useState } from "react";
import { request } from "../api";

export default function Settings({
  report,
  changePassword,
  revokeSessions,
}: {
  report: (s: string) => void;
  changePassword: (data: FormData) => Promise<void>;
  revokeSessions: () => Promise<void>;
}) {
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
      await changePassword(data);
      report("Пароль змінено. Увійдіть знову.");
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
      await revokeSessions();
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
