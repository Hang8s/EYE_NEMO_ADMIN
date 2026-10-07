import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import App from "./App";
import { saveToken } from "./api";

vi.mock("./api", async (original) => ({
  ...(await original<object>()),
  API_BASE: "http://api.test",
}));
const dashboard = {
  owners: 2,
  participants: 3,
  chats: 4,
  messages: 10,
  media: 5,
  stored_bytes: 1024,
  last_24h: 2,
  last_7d: 8,
  failed_downloads: 1,
  pending_operations: 0,
};
const person = {
  telegram_id: 300,
  name: "Alice",
  username: "alice",
  connections: 0,
  chats: 2,
  messages: 4,
  media: 2,
  blocked: false,
};
const media = {
  id: "file-one",
  type: "document",
  file_name: "report.pdf",
  mime_type: "application/pdf",
  available: false,
  saved_by_reply: false,
  file_size: 1024,
  message_id: "message-one",
  chat_id: "chat-one",
  chat_title: "Розмова",
  owner_id: 100,
  sender_name: "Alice",
  sender_telegram_id: 300,
  sent_at: "2026-10-01T12:00:00Z",
  status: "expired",
  download_status: "stored",
  caption: null,
};
let fetchMock: ReturnType<typeof vi.fn>;
beforeEach(() => {
  sessionStorage.clear();
  window.location.hash = "#/overview";
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      disconnect() {}
    },
  );
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
  };
  fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
    const path = url.split("/admin-api")[1];
    if (path === "/auth/login")
      return new Response(
        JSON.stringify({ token: "test-session", expires_at: "2026-10-10" }),
      );
    if (path === "/stats") return new Response(JSON.stringify(dashboard));
    if (path === "/blocks")
      return new Response(
        JSON.stringify(init?.method === "POST" ? { ok: true } : []),
      );
    if (path === "/purges/preview")
      return new Response(
        JSON.stringify({
          messages: 0,
          attachments: 1,
          chats: 0,
          stored_bytes: 1024,
        }),
      );
    if (path === "/purges")
      return new Response(JSON.stringify({ id: "operation-one" }), {
        status: 202,
      });
    if (path.startsWith("/participants"))
      return new Response(
        JSON.stringify({ items: [person], next_cursor: null }),
      );
    if (path.startsWith("/media?"))
      return new Response(
        JSON.stringify({ items: [media], next_cursor: null }),
      );
    return new Response(JSON.stringify({ items: [], next_cursor: null }));
  });
  vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  sessionStorage.clear();
});

describe("administration browser flows", () => {
  it("handles an invalid date in the URL without crashing the filters", async () => {
    saveToken("test-session");
    window.location.hash = "#/media?date_from=invalid-date";
    render(<App />);
    await screen.findByText("report.pdf");
    fireEvent.click(screen.getByRole("button", { name: /Фільтри/ }));
    expect((screen.getByLabelText("Від дати") as HTMLInputElement).value).toBe(
      "",
    );
  });
  it("signs in and stores only a session token", async () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText("Логін"), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByLabelText("Пароль"), {
      target: { value: "my-private-password" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Увійти →" }));
    await screen.findByText("Активність архіву");
    expect(sessionStorage.length).toBe(1);
    expect(sessionStorage.getItem("eye-nemo-admin.session.v1")).toBe(
      "test-session",
    );
    expect(JSON.stringify([...Object.values(sessionStorage)])).not.toContain(
      "my-private-password",
    );
  });
  it("opens a participant with an owner scope and blocks only that scope", async () => {
    saveToken("test-session");
    window.location.hash = "#/participants";
    render(<App />);
    fireEvent.click(await screen.findByRole("button", { name: "Відкрити →" }));
    fireEvent.change(screen.getByLabelText("Обсяг дії: Telegram ID власника"), {
      target: { value: "100" },
    });
    const button = screen.getByRole("button", {
      name: "Заблокувати архівування",
    });
    await waitFor(() =>
      expect((button as HTMLButtonElement).disabled).toBe(false),
    );
    fireEvent.click(button);
    await waitFor(() =>
      expect(
        fetchMock.mock.calls.some(
          ([, init]) =>
            init?.body ===
            JSON.stringify({
              kind: "participant",
              telegram_id: 300,
              owner_id: 100,
              blocked: true,
            }),
        ),
      ).toBe(true),
    );
  });
  it("requires typed confirmation and purges only selected loaded files", async () => {
    saveToken("test-session");
    window.location.hash = "#/media?availability=expired";
    render(<App />);
    fireEvent.click(
      await screen.findByRole("checkbox", { name: "Вибрати файл report.pdf" }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Стерти вибрані…" }));
    await screen.findByText("Введіть СТЕРТИ для підтвердження");
    const confirm = screen.getByRole("button", { name: "Стерти дані" });
    expect((confirm as HTMLButtonElement).disabled).toBe(true);
    fireEvent.change(
      screen.getByLabelText("Введіть СТЕРТИ для підтвердження"),
      { target: { value: "СТЕРТИ" } },
    );
    await waitFor(() =>
      expect((confirm as HTMLButtonElement).disabled).toBe(false),
    );
    fireEvent.click(confirm);
    await waitFor(() => expect(window.location.hash).toBe("#/operations"));
    const post = fetchMock.mock.calls.find(([url]) => url.endsWith("/purges"));
    expect(JSON.parse(post![1]!.body as string)).toEqual({
      kind: "attachment",
      ids: ["file-one"],
      confirmation: "СТЕРТИ",
    });
  });
  it("restores URL filters and submits combined filters", async () => {
    saveToken("test-session");
    window.location.hash =
      "#/media?owner_id=100&content_type=photo&availability=stored";
    render(<App />);
    await screen.findByText("report.pdf");
    fireEvent.click(screen.getByRole("button", { name: /Фільтри/ }));
    expect(
      (screen.getByLabelText("Telegram ID власника") as HTMLInputElement).value,
    ).toBe("100");
    expect(
      (screen.getByLabelText("Доступність файла") as HTMLSelectElement).value,
    ).toBe("stored");
    fireEvent.change(screen.getByLabelText("MIME-тип"), {
      target: { value: "image/jpeg" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Знайти" }));
    await waitFor(() =>
      expect(window.location.hash).toContain("mime=image%2Fjpeg"),
    );
    expect(window.location.hash).toContain("owner_id=100");
    expect(window.location.hash).toContain("availability=stored");
  });
  it("clears expired sessions and closes private views", async () => {
    saveToken("expired");
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ detail: "Expired" }), { status: 401 }),
    );
    render(<App />);
    await screen.findByRole("heading", { name: "Вхід до адмінки" });
    expect(sessionStorage.length).toBe(0);
    expect(screen.queryByText("Активність архіву")).toBeNull();
  });
});
