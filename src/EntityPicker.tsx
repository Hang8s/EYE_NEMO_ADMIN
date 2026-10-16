import { useEffect, useId, useState, useSyncExternalStore } from 'react';
import { request, type Page, type Person, type Chat } from './api';

export const entityLabels = new Map<string, string>();
const listeners = new Set<() => void>();
let revision = 0;
function rememberLabel(key: string, label: string) {
  if (entityLabels.get(key) === label) return;
  entityLabels.set(key, label);
  revision++;
  listeners.forEach(listener => listener());
}
const subscribe = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; };
export function useEntityLabels() { useSyncExternalStore(subscribe, () => revision); }
type Entity = Person | Chat;
export function EntityPicker({ name, label, endpoint, initialValue, onChange }: { name: string; label: string; endpoint: 'owners' | 'participants' | 'chats'; initialValue: string; onChange?: (value: string) => void }) {
  const id = useId();
  const [selected, setSelected] = useState(initialValue);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<Entity[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  const [open, setOpen] = useState(false);
  const [initialLabel, setInitialLabel] = useState(() => entityLabels.get(`${name}:${initialValue}`));
  function select(value: string) { setSelected(value); onChange?.(value); }
  useEffect(() => {
    if (!initialValue || entityLabels.has(`${name}:${initialValue}`)) return;
    const controller = new AbortController();
    const params = new URLSearchParams(endpoint === 'chats' ? { chat_id: initialValue } : { q: initialValue });
    request<Page<Entity>>(`/${endpoint}?${params}`, undefined, controller.signal).then(page => {
      if (controller.signal.aborted) return;
      const item = page.items.find(item => ('telegram_id' in item ? String(item.telegram_id) : item.id) === initialValue);
      if (item) {
        const title = 'name' in item ? item.name : item.title;
        rememberLabel(`${name}:${initialValue}`, title);
        setInitialLabel(title);
      }
    }).catch(() => { /* Keep the saved selection usable if the lookup fails. */ });
    return () => controller.abort();
  }, [initialValue, endpoint, name]);
  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    setBusy(true);
    setError('');
    const timer = setTimeout(() => {
      const params = new URLSearchParams({ q: query, limit: '30', ...(cursor ? { cursor } : {}) });
      request<Page<Entity>>(`/${endpoint}?${params}`, undefined, controller.signal).then(page => {
        if (controller.signal.aborted) return;
        for (const item of page.items) {
          const key = 'telegram_id' in item ? String(item.telegram_id) : item.id;
          rememberLabel(`${name}:${key}`, 'name' in item ? item.name : item.title);
        }
        setItems(current => cursor ? [...current, ...page.items] : page.items);
        setNextCursor(page.next_cursor || null);
      }).catch(cause => { if (!controller.signal.aborted) setError(cause.message); })
        .finally(() => { if (!controller.signal.aborted) setBusy(false); });
    }, 250);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [open, query, cursor, endpoint, name, retry]);
  return <div className="entity-picker">
    <input type="hidden" name={name} value={selected} />
    <span id={`${id}-label`}>{label}</span>
    <button type="button" aria-labelledby={`${id}-label ${id}-value`} aria-expanded={open} aria-controls={`${id}-options`} onClick={() => setOpen(value => !value)}>
      <span id={`${id}-value`}>{selected ? entityLabels.get(`${name}:${selected}`) || (selected === initialValue ? initialLabel : undefined) || `Вибрано: ${selected}` : 'Обрати…'}</span>
    </button>
    {selected && <button type="button" aria-label={`Прибрати: ${label}`} onClick={() => select('')}>×</button>}
    {open && <div id={`${id}-options`} className="entity-options">
      <input type="search" aria-label={`Пошук: ${label}`} placeholder="Назва, ім’я або username" value={query} onChange={event => { setQuery(event.target.value); setCursor(null); setItems([]); }} />
      {busy && <p role="status">Завантажуємо…</p>}
      {error && <p role="alert">{error} <button type="button" onClick={() => setRetry(value => value + 1)}>Повторити</button></p>}
      {!busy && !error && !items.length && <p>Нічого не знайдено</p>}
      {items.map(item => {
        const value = 'telegram_id' in item ? String(item.telegram_id) : item.id;
        const title = 'name' in item ? item.name : item.title;
        return <button type="button" key={value} aria-pressed={selected === value} onClick={() => { select(value); setOpen(false); }}>
          {title} <small>{'username' in item ? (item.username ? `@${item.username} · ` : '') + value : `${item.owner_name} · ${item.telegram_chat_id}`}</small>
        </button>;
      })}
      {nextCursor && <button type="button" disabled={busy} onClick={() => setCursor(nextCursor)}>Ще результати</button>}
    </div>}
  </div>;
}
