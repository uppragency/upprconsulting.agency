export function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const WORDS_PER_MINUTE = 200;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
