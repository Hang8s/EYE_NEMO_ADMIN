import { Fragment } from 'react';

/** Word diff with a linear fallback for unusually large archived texts. */
export function VersionDiff({ before, after }: { before?: string; after: string }) {
  if (before == null || before === after) return <>{after}</>;
  const oldWords = before.split(/(\s+)/).filter(Boolean), newWords = after.split(/(\s+)/).filter(Boolean);
  if (oldWords.length * newWords.length <= 100_000) {
    const table = Array.from({ length: oldWords.length + 1 }, () => new Uint32Array(newWords.length + 1));
    for (let i = oldWords.length - 1; i >= 0; i--)
      for (let j = newWords.length - 1; j >= 0; j--)
        table[i][j] = oldWords[i] === newWords[j] ? table[i + 1][j + 1] + 1 : Math.max(table[i + 1][j], table[i][j + 1]);
    const chunks: { kind: 'same' | 'removed' | 'added'; text: string }[] = [];
    function append(kind: 'same' | 'removed' | 'added', text: string) {
      const last = chunks[chunks.length - 1];
      if (last?.kind === kind) last.text += text; else chunks.push({ kind, text });
    }
    let i = 0, j = 0;
    while (i < oldWords.length || j < newWords.length) {
      if (i < oldWords.length && j < newWords.length && oldWords[i] === newWords[j]) { append('same', oldWords[i++]); j++; }
      else if (i < oldWords.length && (j === newWords.length || table[i + 1][j] >= table[i][j + 1])) append('removed', oldWords[i++]);
      else append('added', newWords[j++]);
    }
    return <>{chunks.map((chunk, index) => chunk.kind === 'removed' ? <del key={index} aria-label={`Вилучено: ${chunk.text}`}>{chunk.text}</del> : chunk.kind === 'added' ? <ins key={index} aria-label={`Додано: ${chunk.text}`}>{chunk.text}</ins> : <Fragment key={index}>{chunk.text}</Fragment>)}</>;
  }
  const oldText = Array.from(before), newText = Array.from(after);
  let start = 0, end = 0;
  while (start < oldText.length && start < newText.length && oldText[start] === newText[start]) start++;
  while (end < oldText.length - start && end < newText.length - start && oldText[oldText.length - end - 1] === newText[newText.length - end - 1]) end++;
  const removed = oldText.slice(start, oldText.length - end).join('');
  const added = newText.slice(start, newText.length - end).join('');
  return <>{newText.slice(0, start).join('')}{removed && <del aria-label={`Вилучено: ${removed}`}>{removed}</del>}{added && <ins aria-label={`Додано: ${added}`}>{added}</ins>}{newText.slice(newText.length - end).join('')}</>;
}
