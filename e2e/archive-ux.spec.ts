import { createHmac } from 'node:crypto';
import { test, expect } from '@playwright/test';

test('mobile archive: compact header, scoped filters, history and calendar against the API', async ({ page }) => {
  const fields: Record<string, string> = { auth_date: String(Math.floor(Date.now() / 1000)), user: JSON.stringify({ id: 100 }) };
  const secret = createHmac('sha256', 'WebAppData').update('123456:preview-placeholder-token').digest();
  const hash = createHmac('sha256', secret).update(Object.keys(fields).sort().map(key => `${key}=${fields[key]}`).join('\n')).digest('hex');
  const initData = new URLSearchParams({ ...fields, hash }).toString();
  await page.addInitScript(data => {
    Object.assign(window, { Telegram: { WebApp: { initData: data, ready() {}, expand() {} } } });
  }, initData);
  await page.route('https://telegram.org/js/telegram-web-app.js*', route => route.fulfill({ contentType: 'application/javascript', body: '' }));
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:5179/EYE_NEMO_FRONTEND/');
  await page.getByLabel('Назва чату').fill('Олена');
  await expect(page.locator('.chat-card')).toHaveCount(1);
  await page.locator('.chat-card').click();
  await expect(page.getByText('Привіт! Надсилаю матеріали для проєкту.', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'У цьому чаті', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByLabel('Перейти до дати')).toHaveCount(0);
  expect(await page.locator('.topbar').evaluate(node => node.getBoundingClientRect().height)).toBeLessThan(130);
  await expect(page.locator('.archive-badge')).toBeHidden();
  await expect(page.locator('.status')).toHaveCount(0);
  await page.screenshot({ path: 'test-results/mini-mobile-chat.png', fullPage: true });
  await page.getByText('Історія змін · 2', { exact: true }).click();
  await expect(page.getByText('Перша редакція матеріалів', { exact: true })).toBeVisible();
  await expect(page.locator('.message-version ins')).not.toHaveCount(0);
  await page.getByRole('button', { name: 'Відкрити календар' }).click();
  await expect(page.getByLabel('Перейти до дати')).toBeVisible();
  await page.getByRole('button', { name: 'Відкрити календар' }).click();
  const response = page.waitForResponse(response => response.url().includes('/mini-api/search?') && response.status() === 200);
  await page.getByRole('button', { name: 'Файли', exact: true }).click();
  const url = new URL((await response).url());
  expect(url.searchParams.get('chat_id')).toBeTruthy();
  expect(url.searchParams.get('content_type')).toBe('document');
  await page.getByText('Відкрити в розмові →').click();
  await expect(page.getByText('Збережемо цей документ в архіві.', { exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test('admin: select a sender by name and remove their active filter', async ({ page }) => {
  await page.goto('');
  await page.getByLabel('Логін').fill('preview');
  await page.getByLabel('Пароль', { exact: true }).fill('preview-password-only');
  await page.getByRole('button', { name: 'Увійти →' }).click();
  await page.getByRole('link', { name: 'Повідомлення', exact: false }).click();
  await page.getByRole('button', { name: /Фільтри/ }).click();
  await page.getByRole('button', { name: 'Відправник Обрати…' }).click();
  await page.getByLabel('Пошук: Відправник').fill('Олена');
  await page.getByRole('button', { name: /Олена @olena · 300/ }).click();
  await page.getByRole('button', { name: 'Знайти', exact: true }).click();
  await expect(page.getByRole('button', { name: /Відправник: Олена/ })).toBeVisible();
  await page.screenshot({ path: 'test-results/admin-active-filters.png', fullPage: true });
  await page.getByRole('button', { name: /Відправник: Олена/ }).click();
  await expect(page).not.toHaveURL(/participant_id/);
});
