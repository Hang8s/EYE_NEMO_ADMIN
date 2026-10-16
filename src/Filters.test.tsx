import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import Filters from './Filters';
import { entityLabels } from './EntityPicker';

afterEach(() => { cleanup(); vi.unstubAllGlobals(); entityLabels.clear(); });

it('searches for a sender by name, submits their ID, and removes only that chip', async () => {
  const fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ items: [{ telegram_id: 42, name: 'Олена', username: 'olena' }], next_cursor: null }) });
  vi.stubGlobal('fetch', fetch);
  const view = render(<Filters view="messages" params={new URLSearchParams()} />);
  fireEvent.click(screen.getByRole('button', { name: /Фільтри/ }));
  fireEvent.click(screen.getByRole('button', { name: 'Відправник Обрати…' }));
  fireEvent.change(screen.getByLabelText('Пошук: Відправник'), { target: { value: 'Олена' } });
  fireEvent.click(await screen.findByRole('button', { name: /Олена @olena · 42/ }));
  expect(fetch.mock.calls[0][0]).toContain('/participants?q=');
  expect(decodeURIComponent(fetch.mock.calls[0][0])).toContain('Олена');
  fireEvent.click(screen.getByRole('button', { name: 'Знайти' }));
  expect(window.location.hash).toContain('participant_id=42');
  view.rerender(<Filters key="filtered" view="messages" params={new URLSearchParams('participant_id=42&content_type=photo&cursor=old')} />);
  fireEvent.click(screen.getByRole('button', { name: /Відправник: Олена/ }));
  await waitFor(() => expect(window.location.hash).toBe('#/messages?content_type=photo'));
});
