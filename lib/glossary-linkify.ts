import { GLOSSARY_TERMS } from './glossary-terms';

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function linkifyGlossaryTerms(html: string): string {
  const linkedAlready = new Set<string>();
  const terms = [...GLOSSARY_TERMS].sort((a, b) => b.term.length - a.term.length);
  const segments = html.split(/(<[^>]+>)/g);
  let insideAnchor = false;

  return segments
    .map((segment) => {
      if (segment.startsWith('<')) {
        if (/^<a[\s>]/i.test(segment)) insideAnchor = true;
        if (/^<\/a>/i.test(segment)) insideAnchor = false;
        return segment;
      }
      if (insideAnchor || !segment.trim()) return segment;

      let text = segment;
      for (const t of terms) {
        if (linkedAlready.has(t.slug)) continue;
        const pattern = new RegExp(`\\b(${escapeRegExp(t.term)})\\b`, 'i');
        if (pattern.test(text)) {
          text = text.replace(pattern, `<a href="/glossary#${t.slug}" class="glossary-link">$1</a>`);
          linkedAlready.add(t.slug);
        }
      }
      return text;
    })
    .join('');
}
