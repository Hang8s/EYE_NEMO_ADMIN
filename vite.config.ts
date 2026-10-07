import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
export default defineConfig({
  base: "/EYE_NEMO_ADMIN/",
  plugins: [react()],
  test: {
    environment: "jsdom",
    restoreMocks: true,
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
});
