import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { type Message, type Person, request, saveToken } from "../api";
import { locationState, type View } from "../navigation";
import { useAdminList } from "./useAdminList";

vi.mock("../api", async (original) => ({
  ...(await original<object>()),
  request: vi.fn(),
}));

const requestMock = vi.mocked(request);
const report = vi.fn();
const people = Array.from(
  { length: 120 },
  (_, index): Person => ({
    telegram_id: index + 1,
    name: `Person ${index + 1}`,
    username: null,
    connections: 0,
    chats: 0,
    messages: 0,
    media: 0,
    blocked: false,
  }),
);
const messages = Array.from(
  { length: 550 },
  (_, index) =>
    ({
      id: `message-${index}`,
    }) as Message,
);

function route(view: View, query = "") {
  window.location.hash = `#/${view}${query ? `?${query}` : ""}`;
  return locationState();
}

beforeEach(() => {
  requestMock.mockReset();
  report.mockReset();
  saveToken("test-session");
});
afterEach(() => {
  cleanup();
  sessionStorage.clear();
  vi.useRealTimers();
});

describe("admin list state", () => {
  it("limits selection to 100 and clears it when filters change", async () => {
    requestMock.mockResolvedValue({ items: people, next_cursor: null });
    const { result, rerender } = renderHook(
      (currentRoute) => useAdminList("test-session", currentRoute, report),
      { initialProps: route("participants") },
    );
    await waitFor(() => expect(result.current.items).toHaveLength(120));
    act(() => result.current.toggleAll());
    expect(result.current.selected.size).toBe(100);
    act(() => result.current.toggle("101"));
    expect(result.current.selected.has("101")).toBe(false);
    act(() => result.current.toggleAll());
    expect(result.current.selected.size).toBe(0);
    act(() => result.current.toggle("1"));
    rerender(route("participants", "q=Person"));
    await waitFor(() => expect(result.current.busy).toBe(false));
    expect(result.current.selected.size).toBe(0);
  });

  it("deduplicates pages, retains 500 messages and prunes discarded selections", async () => {
    requestMock.mockResolvedValueOnce({
      items: messages.slice(0, 400),
      next_cursor: "next",
    });
    requestMock.mockResolvedValueOnce({
      items: messages.slice(399),
      next_cursor: null,
    });
    const { result } = renderHook(() =>
      useAdminList("test-session", route("messages"), report),
    );
    await waitFor(() => expect(result.current.items).toHaveLength(400));
    act(() => {
      result.current.toggle("message-0");
      result.current.toggle("message-100");
    });
    await act(() => result.current.more());
    expect(result.current.items).toHaveLength(500);
    expect(result.current.items[0]).toEqual(messages[50]);
    expect(result.current.selected).toEqual(new Set(["message-100"]));
    expect(result.current.trimmedMessages).toBe(true);
    expect(result.current.cursor).toBeNull();
    expect(requestMock).toHaveBeenLastCalledWith("/messages?cursor=next");
  });

  it("ignores a first-page response after the route changes", async () => {
    let resolveOld!: (page: unknown) => void;
    requestMock.mockReturnValueOnce(
      new Promise((resolve) => {
        resolveOld = resolve;
      }),
    );
    requestMock.mockResolvedValueOnce({
      items: [people[1]],
      next_cursor: null,
    });
    const { result, rerender } = renderHook(
      (currentRoute) => useAdminList("test-session", currentRoute, report),
      { initialProps: route("participants") },
    );
    rerender(route("owners"));
    await waitFor(() => expect(result.current.items).toEqual([people[1]]));
    await act(async () =>
      resolveOld({ items: [people[0]], next_cursor: "old" }),
    );
    expect(result.current.items).toEqual([people[1]]);
    expect(result.current.cursor).toBeNull();
  });

  it.each([false, true])(
    "ignores stale pagination after navigation (failure: %s)",
    async (fail) => {
      let resolveOld!: (page: unknown) => void;
      let rejectOld!: (error: Error) => void;
      requestMock.mockResolvedValueOnce({
        items: [people[0]],
        next_cursor: "next",
      });
      requestMock.mockReturnValueOnce(
        new Promise((resolve, reject) => {
          resolveOld = resolve;
          rejectOld = reject;
        }),
      );
      requestMock.mockResolvedValueOnce({
        items: [people[1]],
        next_cursor: null,
      });
      const { result, rerender } = renderHook(
        (currentRoute) => useAdminList("test-session", currentRoute, report),
        { initialProps: route("participants") },
      );
      await waitFor(() => expect(result.current.cursor).toBe("next"));
      let pending!: Promise<void>;
      act(() => {
        pending = result.current.more();
      });
      rerender(route("owners"));
      await waitFor(() => expect(result.current.items).toEqual([people[1]]));
      await act(async () => {
        if (fail) rejectOld(new Error("Old page failed"));
        else resolveOld({ items: [people[2]], next_cursor: "old" });
        await pending;
      });
      expect(result.current.items).toEqual([people[1]]);
      expect(result.current.error).toBe("");
      expect(result.current.busy).toBe(false);
    },
  );

  it("applies bulk actions only to selected people", async () => {
    requestMock.mockResolvedValue({ items: people, next_cursor: null });
    const { result } = renderHook(() =>
      useAdminList("test-session", route("participants"), report),
    );
    await waitFor(() => expect(result.current.items).toHaveLength(120));
    act(() => {
      result.current.toggle("1");
      result.current.toggle("3");
    });
    await act(() => result.current.bulkBlock(true));
    const mutations = requestMock.mock.calls.filter(
      ([path]) => path === "/blocks",
    );
    expect(mutations).toEqual([
      ["/blocks", { kind: "participant", telegram_id: 1, blocked: true }],
      ["/blocks", { kind: "participant", telegram_id: 3, blocked: true }],
    ]);
    expect(report).toHaveBeenCalledOnce();
    expect(result.current.selected.size).toBe(0);
  });

  it("polls operations every 15 seconds and stops after leaving the screen", async () => {
    vi.useFakeTimers();
    requestMock.mockResolvedValue({ items: [], next_cursor: null });
    const { result, rerender, unmount } = renderHook(
      (currentRoute) => useAdminList("test-session", currentRoute, report),
      { initialProps: route("operations") },
    );
    await act(async () => {});
    expect(result.current.busy).toBe(false);
    await act(async () => {
      vi.advanceTimersByTime(15000);
    });
    expect(requestMock).toHaveBeenCalledTimes(2);
    await act(async () => rerender(route("audit")));
    expect(requestMock).toHaveBeenCalledTimes(3);
    await act(async () => {
      vi.advanceTimersByTime(30000);
    });
    expect(requestMock).toHaveBeenCalledTimes(3);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
