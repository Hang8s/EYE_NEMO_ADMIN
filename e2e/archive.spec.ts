import { test, expect } from "@playwright/test";
test("browser → API → database: login, chat, media, scoped block, purge, audit", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("");
  await page.getByLabel("Логін").fill("preview");
  await page
    .getByLabel("Пароль", { exact: true })
    .fill("preview-password-only");
  await page.getByRole("button", { name: "Увійти →" }).click();
  await expect(page.getByText("Активність архіву")).toBeVisible();
  await expect(page.getByText("Медіа в черзі", { exact: true })).toBeVisible();
  await expect(page.getByText("Найстаріше медіазавдання", { exact: true })).toBeVisible();
  await expect(page.getByText("Час відповіді API, p95 ≲", { exact: true })).toHaveCount(0);
  await page.screenshot({ path: "test-results/overview.png", fullPage: true });
  await page.getByRole("link", { name: "Власники", exact: false }).click();
  await expect(
    page.getByRole("button", { name: "Юрій", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Відкрити →" }).click();
  await page.getByRole("button", { name: "Чати користувача" }).click();
  await page.getByRole("button", { name: "Повідомлення", exact: true }).click();
  await expect(
    page.getByText("Привіт! Надсилаю матеріали для проєкту."),
  ).toBeVisible();
  await expect(page.getByText("Перша редакція матеріалів", { exact: true })).toHaveCount(0);
  const versionResponse = page.waitForResponse(response => response.url().includes("/versions?") && response.status() === 200);
  await page.getByText("Історія: 2 версій", { exact: true }).click();
  await versionResponse;
  await expect(page.getByText("Перша редакція матеріалів", { exact: true })).toBeVisible();
  await page.screenshot({ path: "test-results/chat.png", fullPage: true });
  await page.getByRole("button", { name: "Медіа цієї вибірки →" }).click();
  await page.getByRole("button", { name: "Відкрити project.txt" }).click();
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Завантажити", exact: true }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("project.txt");
  await page.getByRole("button", { name: "Закрити", exact: true }).click();
  await page
    .getByRole("link", { name: "Співрозмовники", exact: false })
    .click();
  await page.getByRole("button", { name: "Відкрити →" }).click();
  await page.getByLabel("Обсяг дії: Telegram ID власника").fill("100");
  await page.getByRole("button", { name: "Заблокувати архівування" }).click();
  await expect(page.getByText("Архівування заблоковано")).toBeVisible();
  await page.getByRole("button", { name: "Відкрити →" }).click();
  await page.getByLabel("Обсяг дії: Telegram ID власника").fill("100");
  await expect(
    page.getByRole("button", { name: "Розблокувати", exact: true }),
  ).toBeEnabled();
  await page.getByRole("button", { name: "Розблокувати", exact: true }).click();
  await page.getByRole("link", { name: "Медіатека", exact: false }).click();
  await page
    .getByRole("checkbox", { name: "Вибрати файл project.txt" })
    .check();
  await page.getByRole("button", { name: "Стерти вибрані…" }).click();
  await expect(
    page.getByRole("button", { name: "Стерти дані", exact: true }),
  ).toBeDisabled();
  await page.getByLabel("Введіть СТЕРТИ для підтвердження").fill("СТЕРТИ");
  await page.getByRole("button", { name: "Стерти дані", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Операції", exact: true }),
  ).toBeVisible();
  await expect(async () => {
    await page.getByRole("button", { name: "↻ Оновити" }).click();
    await expect(page.getByText("Завершено", { exact: true })).toBeVisible();
  }).toPass({ timeout: 20000 });
  await page.getByRole("link", { name: "Журнал дій", exact: false }).click();
  await expect(
    page.getByText("Стирання завершено", { exact: true }),
  ).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(
    page.getByRole("button", { name: "Відкрити меню" }),
  ).toBeVisible();
  await page.screenshot({ path: "test-results/mobile.png", fullPage: true });
  expect(errors).toEqual([]);
});
