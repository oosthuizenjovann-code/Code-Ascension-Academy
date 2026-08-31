export const $ = id => document.getElementById(id);

export function escapeHtml(value) {
  return String(value).replace(/[&<>]/g, ch => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
  }[ch]));
}

export function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

export function clamp(value, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

export function average(values) {
  const numbers = values.map(Number).filter(value => Number.isFinite(value));
  if (!numbers.length) return 0;
  return numbers.reduce((sum, value) => sum + value, 0) / numbers.length;
}

export function stripTagsSummary(code) {
  return String(code)
    .replace(/<script[\s\S]*?<\/script>/gi, '[script]')
    .replace(/<style[\s\S]*?<\/style>/gi, '[style]')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 300);
}
