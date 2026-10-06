import { type ReactNode, useEffect, useRef, useState } from "react";
import {
  type Attachment,
  bytes,
  mediaSource,
  type Preview,
  type Purge,
  request,
} from "./api";

export function Dialog({
  title,
  close,
  children,
}: {
  title: string;
  close: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current!;
    dialog.showModal();
    return () => dialog.close();
  }, []);
  return (
    <dialog
      ref={ref}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
    >
      <header>
        <h2>{title}</h2>
        <button onClick={close} aria-label="Закрити">
          ×
        </button>
      </header>
      {children}
    </dialog>
  );
}

export function PurgeDialog({
  selection,
  close,
  done,
}: {
  selection: Purge;
  close: () => void;
  done: () => void;
}) {
  const [preview, setPreview] = useState<Preview>();
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    request<Preview>("/purges/preview", selection, controller.signal)
      .then(setPreview)
      .catch((e) => {
        if (!controller.signal.aborted) setError(e.message);
      });
    return () => controller.abort();
  }, [selection]);
  async function submit() {
    setBusy(true);
    setError("");
    try {
      await request("/purges", { ...selection, confirmation });
      done();
      close();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <Dialog title="Стерти дані з архіву" close={busy ? () => {} : close}>
      <p>
        Ця дія незворотна. Вона стирає дані архіву та файли на сервері.
        Блокування користувача змінюється окремо.
      </p>
      {preview ? (
        <div className="preview-counts">
          <span>
            <b>{preview.chats}</b> чатів
          </span>
          <span>
            <b>{preview.messages}</b> повідомлень
          </span>
          <span>
            <b>{preview.attachments}</b> файлів
          </span>
          <span>
            <b>{bytes(preview.stored_bytes)}</b> на диску
          </span>
        </div>
      ) : (
        <p>Розраховуємо обсяг…</p>
      )}
      <label>
        Введіть СТЕРТИ для підтвердження
        <input
          autoComplete="off"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
        />
      </label>
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
      <footer>
        <button disabled={busy} onClick={close}>
          Скасувати
        </button>
        <button
          className="danger"
          disabled={!preview || confirmation !== "СТЕРТИ" || busy}
          onClick={submit}
        >
          {busy ? "Створюємо операцію…" : "Стерти дані"}
        </button>
      </footer>
    </Dialog>
  );
}

export function MediaDialog({
  attachment,
  close,
}: {
  attachment: Attachment;
  close: () => void;
}) {
  const [source, setSource] = useState("");
  const [error, setError] = useState("");
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    let owned: string | undefined;
    setSource("");
    setError("");
    mediaSource(attachment.id, controller.signal)
      .then((result) => {
        if (controller.signal.aborted) {
          if (result.revoke) URL.revokeObjectURL(result.url);
          return;
        }
        if (result.revoke) owned = result.url;
        setSource(result.url);
      })
      .catch((e) => {
        if (!controller.signal.aborted) setError(e.message);
      });
    return () => {
      controller.abort();
      if (owned) URL.revokeObjectURL(owned);
    };
  }, [attachment.id, revision]);
  async function download() {
    setError("");
    try {
      const result = await mediaSource(attachment.id);
      const response = await fetch(result.url);
      if (!response.ok) throw new Error("Не вдалося завантажити файл");
      const url = URL.createObjectURL(await response.blob());
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = attachment.file_name || "archive-file";
      anchor.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      if (result.revoke) URL.revokeObjectURL(result.url);
    } catch (e) {
      setError((e as Error).message);
    }
  }
  const kind = attachment.type;
  const broken = () =>
    setError(
      "Посилання могло завершити дію або браузер не підтримує цей формат. Оновіть посилання чи завантажте файл.",
    );
  return (
    <Dialog title={attachment.file_name || "Перегляд файла"} close={close}>
      <div className="media-stage">
        {source ? (
          kind === "photo" || attachment.mime_type?.startsWith("image/") ? (
            <img
              src={source}
              alt={attachment.file_name || "Фото з архіву"}
              onError={broken}
            />
          ) : ["video", "video_note", "animation"].includes(kind) ||
            attachment.mime_type?.startsWith("video/") ? (
            <video src={source} controls playsInline onError={broken} />
          ) : ["voice", "audio"].includes(kind) ? (
            <audio src={source} controls onError={broken} />
          ) : (
            <p>
              Попередній перегляд цього формату недоступний. Завантажте файл.
            </p>
          )
        ) : (
          !error && <p>Завантажуємо файл…</p>
        )}
      </div>
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
      <footer>
        <span>{bytes(attachment.file_size)}</span>
        <button onClick={() => setRevision((n) => n + 1)}>
          Оновити посилання
        </button>
        <button className="primary" onClick={download}>
          Завантажити
        </button>
      </footer>
    </Dialog>
  );
}
