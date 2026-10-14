import { date, type Chat } from "../api";
import { navigate, type View } from "../navigation";

export default function ChatTable({
  items,
  selected,
  toggle,
  params,
}: {
  items: Chat[];
  selected: Set<string>;
  toggle: (id: string) => void;
  params: URLSearchParams;
}) {
  const open = (view: View, chat: Chat) => {
    const next = new URLSearchParams(params);
    next.delete("q");
    next.delete("participant_id");
    next.set("chat_id", chat.id);
    navigate(view, next);
  };
  return (
    <div className="table-wrap panel">
      <table>
        <thead>
          <tr>
            <th aria-label="Вибір" />
            <th>Чат</th>
            <th>Власник архіву</th>
            <th>Повідомлення</th>
            <th>Останнє оновлення</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {items.map((chat) => (
            <tr key={chat.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.has(chat.id)}
                  onChange={() => toggle(chat.id)}
                  aria-label={`Вибрати чат ${chat.title}`}
                />
              </td>
              <td>
                <button className="link" onClick={() => open("messages", chat)}>
                  {chat.title}
                </button>
                <small>{chat.telegram_chat_id}</small>
              </td>
              <td>
                {chat.owner_name}
                <small>{chat.owner_id}</small>
              </td>
              <td>{chat.messages}</td>
              <td>{date(chat.updated_at)}</td>
              <td>
                <button onClick={() => open("messages", chat)}>
                  Повідомлення
                </button>
                <button onClick={() => open("media", chat)}>Медіа</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
