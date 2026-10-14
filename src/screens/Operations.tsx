import { date, request, statusNames, type Operation } from "../api";

export default function Operations({
  items,
  refresh,
  error,
}: {
  items: Operation[];
  refresh: () => void;
  error: (s: string) => void;
}) {
  async function retry(id: string) {
    try {
      await request(`/operations/${id}/retry`, {});
      refresh();
    } catch (e) {
      error((e as Error).message);
    }
  }
  return (
    <div className="table-wrap panel">
      <table>
        <thead>
          <tr>
            <th>Операція</th>
            <th>Створено</th>
            <th>Стан</th>
            <th>Прогрес</th>
            <th>Помилка / дії</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                Стирання: {String(item.selection.kind)}
                <small>{item.id}</small>
              </td>
              <td>{date(item.created_at)}</td>
              <td>
                <span
                  className={`badge ${item.status === "failed" ? "warn" : ""}`}
                >
                  {statusNames[item.status] || item.status}
                </span>
              </td>
              <td>
                {item.processed} / {item.total}
                <progress
                  max={Math.max(item.total, 1)}
                  value={item.processed}
                />
              </td>
              <td>
                {item.last_error || "—"}
                {item.status === "failed" && (
                  <button onClick={() => retry(item.id)}>Повторити</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
