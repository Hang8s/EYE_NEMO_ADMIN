import { date, type Audit } from "../api";

const actions: Record<string, string> = {
  login: "Вхід",
  login_failed: "Невдалий вхід",
  logout: "Вихід",
  password_changed: "Зміна пароля",
  sessions_revoked: "Завершено всі сесії",
  blocked: "Блокування",
  unblocked: "Розблокування",
  purge_requested: "Створено стирання",
  purge_completed: "Стирання завершено",
  purge_retry: "Повторення стирання",
  purge_failed: "Помилка стирання",
  purge_manual_retry: "Ручний повтор стирання",
};
export default function AuditTable({ items }: { items: Audit[] }) {
  return (
    <div className="table-wrap panel">
      <table>
        <thead>
          <tr>
            <th>Час</th>
            <th>Дія</th>
            <th>Об’єкт</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{date(item.created_at)}</td>
              <td>{actions[item.action] || item.action}</td>
              <td className="mono">{item.target || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
