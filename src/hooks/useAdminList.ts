import { useCallback, useEffect, useRef, useState } from "react";
import {
  type Audit,
  type Chat,
  type Dashboard,
  type Media,
  type Message,
  type Operation,
  type Page,
  type Person,
  request,
  token,
} from "../api";
import { locationState } from "../navigation";

export type Row = Person | Chat | Media | Message | Operation | Audit;
export function idOf(item: Row) {
  return "telegram_id" in item ? String(item.telegram_id) : item.id;
}

export function useAdminList(
  session: string,
  route: ReturnType<typeof locationState>,
  report: (notice: string) => void,
) {
  const [revision, setRevision] = useState(0);
  const [rawItems, setItems] = useState<Row[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [trimmedMessages, setTrimmedMessages] = useState(false);
  const generation = useRef(0);
  const [stats, setStats] = useState<Dashboard>();
  const [rawSelected, setSelected] = useState(new Set<string>());
  const [loadedKey, setLoadedKey] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const view = route.view,
    query = route.params.toString();
  const items = loadedKey === `${view}:${query}` ? rawItems : [];
  const selected =
    loadedKey === `${view}:${query}` ? rawSelected : new Set<string>();
  const refresh = useCallback(() => setRevision((n) => n + 1), []);
  useEffect(() => {
    generation.current += 1;
    if (view === "settings") return;
    const controller = new AbortController();
    setBusy(true);
    setError("");
    setItems([]);
    setTrimmedMessages(false);
    setCursor(null);
    setSelected(new Set());
    setLoadedKey(`${view}:${query}`);
    const params = new URLSearchParams(query);
    params.delete("layout");
    const promise =
      view === "overview"
        ? request<Dashboard>("/stats", undefined, controller.signal).then(
            (stats) => {
              if (!controller.signal.aborted && token() === session)
                setStats(stats);
            },
          )
        : request<Page<Row>>(
            `/${view}?${params}`,
            undefined,
            controller.signal,
          ).then((page) => {
            if (controller.signal.aborted || token() !== session) return;
            setItems(page.items);
            setCursor(page.next_cursor || null);
          });
    promise
      .catch((e) => {
        if (!controller.signal.aborted) setError(e.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setBusy(false);
      });
    return () => {
      controller.abort();
      generation.current += 1;
    };
  }, [session, view, query, revision]);
  useEffect(() => {
    if (view !== "operations") return;
    const timer = setInterval(refresh, 15000);
    return () => clearInterval(timer);
  }, [session, view, refresh]);
  function toggle(id: string) {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else if (next.size < 100) next.add(id);
      return next;
    });
  }
  async function more() {
    if (!cursor || busy) return;
    setBusy(true);
    setError("");
    const requestedView = view,
      requestedQuery = query;
    const requestedSession = session;
    const requestedGeneration = generation.current;
    const isCurrent = () => {
      const currentRoute = locationState();
      return (
        currentRoute.view === requestedView &&
        currentRoute.params.toString() === requestedQuery &&
        generation.current === requestedGeneration &&
        token() === requestedSession
      );
    };
    const params = new URLSearchParams(query);
    params.delete("layout");
    params.set("cursor", cursor);
    try {
      const page = await request<Page<Row>>(`/${view}?${params}`);
      if (isCurrent()) {
        const loadedIds = new Set(items.map(idOf));
        const combined = [
          ...items,
          ...page.items.filter((row) => !loadedIds.has(idOf(row))),
        ];
        const bounded = view === "messages" ? combined.slice(-500) : combined;
        if (view === "messages" && combined.length > 500) {
          setTrimmedMessages(true);
          const retained = new Set(bounded.map(idOf));
          setSelected(
            (current) => new Set([...current].filter((id) => retained.has(id))),
          );
        }
        setItems(bounded);
        setCursor(page.next_cursor || null);
      }
    } catch (e) {
      if (isCurrent()) setError((e as Error).message);
    } finally {
      if (isCurrent()) setBusy(false);
    }
  }
  async function bulkBlock(blocked: boolean) {
    setBusy(true);
    setError("");
    try {
      for (const id of selected)
        await request("/blocks", {
          kind: view === "owners" ? "owner" : "participant",
          telegram_id: Number(id),
          blocked,
        });
      report("Дії застосовано до вибраних користувачів");
      refresh();
    } catch (e) {
      setError((e as Error).message);
      refresh();
    } finally {
      setBusy(false);
    }
  }

  function toggleAll() {
    setSelected(
      selected.size === Math.min(items.length, 100)
        ? new Set()
        : new Set(items.slice(0, 100).map(idOf)),
    );
  }
  return {
    items,
    selected,
    cursor,
    trimmedMessages,
    stats,
    busy,
    error,
    setError,
    refresh,
    toggle,
    toggleAll,
    more,
    bulkBlock,
  };
}

export type AdminList = ReturnType<typeof useAdminList>;
