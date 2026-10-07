import { expect, it } from "vitest";
import { locationState, navigate } from "./navigation";
it("keeps filter values in hash routes for Pages and browser reloads", () => {
  navigate("media", {
    owner_id: "100",
    q: "архів з фото",
    content_type: "photo",
  });
  expect(locationState().view).toBe("media");
  expect(locationState().params.get("q")).toBe("архів з фото");
  expect(locationState().params.get("owner_id")).toBe("100");
});
it("uses the overview for unknown routes", () => {
  window.location.hash = "#/missing";
  expect(locationState().view).toBe("overview");
});
