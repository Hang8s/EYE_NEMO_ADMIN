import type { components } from "./generated/api";
export type Schemas = components["schemas"];
export type Person = Schemas["PersonResponse"];
export type Chat = Schemas["ChatResponse"];
export type Message = Schemas["MessageResponse"];
export type Media = Schemas["MediaResponse"];
export type Attachment = Schemas["AttachmentResponse"];
export type Operation = Schemas["OperationResponse"];
export type Audit = Schemas["AuditResponse"];
export type Dashboard = Schemas["DashboardResponse"];
export type Purge = Schemas["PurgeInput"];
export type Preview = Schemas["PurgePreview"];
export type Page<T> = { items: T[]; next_cursor?: string | null };
export const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(
  /\/$/,
  "",
);
const SESSION_KEY = "eye-nemo-admin.session.v1";
export function token() {
  return sessionStorage.getItem(SESSION_KEY);
}
export function saveToken(value: string | null) {
  if (value) sessionStorage.setItem(SESSION_KEY, value);
  else sessionStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event("admin-session"));
}
export async function request<T>(
  path: string,
  data?: unknown,
  signal?: AbortSignal,
): Promise<T> {
  const response = await fetch(`${API_BASE}/admin-api${path}`, {
    method: data === undefined ? "GET" : "POST",
    signal,
    headers: {
      ...(token() ? { Authorization: `Bearer ${token()}` } : {}),
      ...(data === undefined ? {} : { "Content-Type": "application/json" }),
    },
    ...(data === undefined ? {} : { body: JSON.stringify(data) }),
  });
  if (!response.ok) {
    if (response.status === 401 && path !== "/auth/login") saveToken(null);
    const body = await response.json().catch(() => null);
    throw new Error(
      typeof body?.detail === "string"
        ? body.detail
        : `Помилка запиту (${response.status})`,
    );
  }
  return response.json() as Promise<T>;
}
export async function mediaSource(
  id: string,
  signal?: AbortSignal,
): Promise<{ url: string; revoke: boolean }> {
  const link = await request<Schemas["MediaLinkResponse"]>(
    `/media/${id}/url`,
    undefined,
    signal,
  );
  if (link.direct) return { url: link.url, revoke: false };
  const response = await fetch(`${API_BASE}${link.url}`, {
    headers: { Authorization: `Bearer ${token()}` },
    signal,
  });
  if (!response.ok) throw new Error("Не вдалося завантажити файл");
  return { url: URL.createObjectURL(await response.blob()), revoke: true };
}
export function bytes(value: number | null | undefined) {
  if (value == null) return "—";
  if (value < 1024) return `${value} Б`;
  if (value < 1024 ** 2) return `${(value / 1024).toFixed(1)} КБ`;
  if (value < 1024 ** 3) return `${(value / 1024 ** 2).toFixed(1)} МБ`;
  return `${(value / 1024 ** 3).toFixed(1)} ГБ`;
}
export function date(value: string) {
  return new Date(value).toLocaleString("uk-UA", { timeZone: "Europe/Kyiv" });
}
export const typeNames: Record<string, string> = {
  text: "Текст",
  photo: "Фото",
  video: "Відео",
  video_note: "Відеоповідомлення",
  voice: "Голосове",
  audio: "Аудіо",
  document: "Документ",
  animation: "Анімація",
  sticker: "Стікер",
  location: "Локація",
  contact: "Контакт",
  poll: "Опитування",
  media: "Усі медіа",
};
export const statusNames: Record<string, string> = {
  stored: "Збережений",
  pending: "Очікує",
  processing: "Виконується",
  failed: "Помилка",
  expired: "Прострочений",
  deleted: "Стертий",
  completed: "Завершено",
};
