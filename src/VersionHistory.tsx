import { useEffect, useState } from "react";
import { date, request, type Attachment, type Schemas, typeNames } from "./api";
import { VersionDiff } from './VersionDiff';

export function VersionHistory({ id, showMedia, versions }: { id: string; showMedia: (a: Attachment) => void; versions?: Schemas['MessageVersionResponse'][] }) {
  const [cursor, setCursor] = useState<string | null>(null);
  const [previousText, setPreviousText] = useState<string>();
  const [page, setPage] = useState<Schemas["MessageVersionPage"]>();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    if (versions) return;
    const controller = new AbortController();
    setBusy(true);
    setError("");
    setPage(undefined);
    request<Schemas["MessageVersionPage"]>(`/messages/${id}/versions?limit=30${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ""}`, undefined, controller.signal)
      .then(result => { if (!controller.signal.aborted) setPage(result); })
      .catch(cause => { if (!controller.signal.aborted) setError(cause.message); })
      .finally(() => { if (!controller.signal.aborted) setBusy(false); });
    return () => controller.abort();
  }, [id, cursor, retry, versions]);
  const content = versions ? { items: versions, has_original: versions.some(v => v.kind === 'original'), next_cursor: null } : page;
  return <div aria-busy={busy}>
    {busy && <p role="status">Завантажуємо історію…</p>}
    {error && <p role="alert">{error} <button type="button" onClick={() => setRetry(value => value + 1)}>Спробувати ще раз</button></p>}
    {content && <>
      {!content.has_original && <p>Оригінал не отримано</p>}
      {content.items.map((version, index) => <div className="version" key={version.id}>
        <small>{version.kind === "original" ? "Оригінал" : version.kind === "edit" ? "Редагування" : "Попередній архів"} · {version.kind === "edit" && !version.edited_at ? `час невідомий · отримано ${date(version.observed_at)}` : date(version.edited_at || version.observed_at)}</small>
        <p><VersionDiff before={index ? content.items[index - 1].text || content.items[index - 1].caption || '' : previousText} after={version.text || version.caption || ''} />{!version.text && !version.caption && 'Без тексту'}</p>
        {version.attachments.map(file => <button type="button" key={file.id} disabled={!file.available} onClick={() => showMedia(file)}>{file.file_name || typeNames[file.type]}{!file.available ? " · Недоступний" : ""}</button>)}
      </div>)}
      {content.next_cursor && <button type="button" onClick={() => { const last = content.items.at(-1); setPreviousText(last?.text || last?.caption || ''); setCursor(content.next_cursor!); }}>Наступні версії</button>}
    </>}
    {cursor && <button type="button" onClick={() => { setPreviousText(undefined); setCursor(null); }}>На початок історії</button>}
  </div>;
}
