export const HEADLINE_VARIANTS: Record<'a' | 'b', string> = {
  a: "AI makes your website cheap. It's slowly killing your business.",
  b: "Your AI-built website looks fine. It's quietly losing you customers.",
};

export const CTA_VARIANTS: Record<'a' | 'b', string> = {
  a: 'Order the audit',
  b: "See what's wrong",
};

export function getVariant(sessionId: string, testKey: string): 'a' | 'b' {
  const str = sessionId + testKey;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % 2 === 0 ? 'a' : 'b';
}
