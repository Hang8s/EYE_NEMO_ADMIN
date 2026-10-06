export type View =
  | "overview"
  | "owners"
  | "participants"
  | "chats"
  | "messages"
  | "media"
  | "operations"
  | "audit"
  | "settings";
export const names: Record<View, string> = {
  overview: "Огляд",
  owners: "Власники",
  participants: "Співрозмовники",
  chats: "Чати",
  messages: "Повідомлення",
  media: "Медіатека",
  operations: "Операції",
  audit: "Журнал дій",
  settings: "Налаштування",
};
export function locationState() {
  const [path, query = ""] = window.location.hash.slice(1).split("?");
  const view = path?.replace(/^\//, "") as View;
  return {
    view: view in names ? view : ("overview" as View),
    params: new URLSearchParams(query),
  };
}
export function navigate(
  view: View,
  params: Record<string, string> | URLSearchParams = {},
) {
  const query = new URLSearchParams(params);
  window.location.hash = `/${view}${query.size ? `?${query}` : ""}`;
}
