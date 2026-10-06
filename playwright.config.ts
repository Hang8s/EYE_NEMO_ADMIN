import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: "http://127.0.0.1:5178/EYE_NEMO_ADMIN/",
    headless: true,
    viewport: { width: 1440, height: 1000 },
    screenshot: "only-on-failure",
  },
  webServer: [
    {
      command:
        "uv run --project ../backend --directory ../backend python -m scripts.preview_admin",
      url: "http://127.0.0.1:8018/health",
      reuseExistingServer: false,
      timeout: 60000,
    },
    {
      command: "npm run dev -- --host 127.0.0.1 --port 5178",
      url: "http://127.0.0.1:5178/EYE_NEMO_ADMIN/",
      reuseExistingServer: false,
      env: { VITE_API_BASE_URL: "http://127.0.0.1:8018" },
    },
  ],
});
