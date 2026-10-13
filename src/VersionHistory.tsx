import { useEffect, useState } from "react";
import { date, request, type Attachment, type Schemas, typeNames } from "./api";

export function VersionHistory({ id, showMedia }: { id: string; showMedia: (a: Attachment) => void }) {
  const [cursor, setCursor] = useState<string | null>(null);
  const [page, setPage] = useState<Schemas["MessageVersionPage"]>();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setBusy(true);
    setError("");
    setPage(undefined);
    request<Schemas["MessageVersionPage"]>(`/messages/${id}/versions?limit=30${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ""}`, undefined, controller.signal)
      .then(result => { if (!controller.signal.aborted) setPage(result); })
      .catch(cause => { if (!controller.signal.aborted) setError(cause.message); })
      .finally(() => { if (!controller.signal.aborted) setBusy(false); });
    return () => controller.abort();
  }, [id, cursor, retry]);
  return <div aria-busy={busy}>
    {busy && <p role="status">Завантажуємо історію…</p>}
    {error && <p role="alert">{error} <button type="button" onClick={() => setRetry(value => value + 1)}>Спробувати ще раз</button></p>}
    {page && <>
      {!page.has_original && <p>Оригінал не отримано</p>}
      {page.items.map(version => <div className="version" key={version.id}>
        <small>{version.kind === "original" ? "Оригінал" : version.kind === "edit" ? "Редагування" : "Попередній архів"} · {version.kind === "edit" && !version.edited_at ? `час невідомий · отримано ${date(version.observed_at)}` : date(version.edited_at || version.observed_at)}</small>
        <p>{version.text || version.caption || "Без тексту"}</p>
        {version.attachments.map(file => <button type="button" key={file.id} disabled={!file.available} onClick={() => showMedia(file)}>{file.file_name || typeNames[file.type]}{!file.available ? " · Недоступний" : ""}</button>)}
      </div>)}
      {page.next_cursor && <button type="button" onClick={() => setCursor(page.next_cursor!)}>Наступні версії</button>}
    </>}
    {cursor && <button type="button" onClick={() => setCursor(null)}>На початок історії</button>}
  </div>;
}
