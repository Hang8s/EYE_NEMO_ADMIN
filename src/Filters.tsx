import { type FormEvent, useState } from "react";
import { typeNames } from "./api";
import { navigate, type View } from "./navigation";
export default function Filters({
  view,
  params,
}: {
  view: View;
  params: URLSearchParams;
}) {
  const [expanded, setExpanded] = useState(false);
  const people = view === "owners" || view === "participants";
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = new URLSearchParams();
    for (const [key, raw] of new FormData(event.currentTarget)) {
      const value = String(raw).trim();
      if (value)
        next.set(
          key,
          key === "date_from" || key === "date_to"
            ? new Date(value).toISOString()
            : value,
        );
    }
    if (params.get("layout")) next.set("layout", params.get("layout")!);
    navigate(view, next);
  }
  const input = (key: string, label: string, type = "text") => (
    <label>
      {label}
      <input
        name={key}
        type={type}
        min={type === "number" ? 0 : undefined}
        defaultValue={params.get(key) || ""}
      />
    </label>
  );
  const choice = (
    key: string,
    label: string,
    values: Record<string, string>,
  ) => (
    <label>
      {label}
      <select name={key} defaultValue={params.get(key) || ""}>
        <option value="">Усі</option>
        {Object.entries(values).map(([value, text]) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
  const dateInput = (key: string, label: string) => (
    <label>
      {label}
      <input
        name={key}
        type="datetime-local"
        defaultValue={
          params.get(key) && !Number.isNaN(new Date(params.get(key)!).getTime())
            ? new Date(
                new Date(params.get(key)!).getTime() -
                  new Date(params.get(key)!).getTimezoneOffset() * 60000,
              )
                .toISOString()
                .slice(0, 16)
            : ""
        }
      />
    </label>
  );
  return (
    <form className="filters panel" onSubmit={submit} key={`${view}:${params}`}>
      <div className="filter-main">
        <label className="search">
          Пошук
          <input
            name="q"
            defaultValue={params.get("q") || ""}
            placeholder={
              people
                ? "Ім’я, username або Telegram ID"
                : "Текст, підпис або назва чату"
            }
          />
        </label>
        {!people && choice("content_type", "Тип контенту", typeNames)}
        <button className="primary" type="submit">
          Знайти
        </button>
        {!people && (
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded(!expanded)}
          >
            Фільтри {params.size ? `(${params.size})` : ""}
          </button>
        )}
        <button type="button" className="quiet" onClick={() => navigate(view)}>
          Скинути
        </button>
      </div>
      {!people && (
        <div className="filter-extra" hidden={!expanded}>
          {input("owner_id", "Telegram ID власника", "number")}
          {input("participant_id", "Telegram ID відправника", "number")}
          {input("chat_id", "ID чату")}
          {dateInput("date_from", "Від дати")}
          {dateInput("date_to", "До дати")}
          {choice("direction", "Напрямок", {
            incoming: "Вхідні",
            outgoing: "Вихідні",
          })}
          {choice("edited", "Редаговані", { true: "Так", false: "Ні" })}
          {choice("deleted", "Видалені в Telegram", {
            true: "Так",
            false: "Ні",
          })}
          {choice("saved_by_reply", "Збережено reply", {
            true: "Так",
            false: "Ні",
          })}
          {input("filename", "Назва файла")}
          {input("mime", "MIME-тип")}
          {input("min_size", "Мінімальний розмір, байти", "number")}
          {input("max_size", "Максимальний розмір, байти", "number")}
          {choice("availability", "Доступність файла", {
            stored: "Збережений",
            pending: "Очікує",
            failed: "Помилка",
            expired: "Прострочений",
            deleted: "Стертий",
          })}
        </div>
      )}
    </form>
  );
}
