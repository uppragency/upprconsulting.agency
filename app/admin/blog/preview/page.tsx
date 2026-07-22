'use client';

import { useEffect, useState } from 'react';
import { linkifyGlossaryTerms } from '@/lib/glossary-linkify';

export default function PreviewPage() {
  const [data, setData] = useState<{ title: string; content: string; tags: string[] } | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('article-preview');
    if (raw) setData(JSON.parse(raw));
  }, []);

  if (!data) {
    return (
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 32px', textAlign: 'center', color: '#55565e' }}>
        Nothing to preview. Open this from the article editor.
      </div>
    );
  }

  const contentHtml = linkifyGlossaryTerms(data.content);

  return (
    <article style={{ maxWidth: 720, margin: '0 auto', padding: '40px 32px 100px' }}>
      <span
        style={{
          display: 'inline-block',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          background: '#232326',
          color: '#e2fa5c',
          padding: '6px 14px',
          borderRadius: 99,
          marginBottom: 24,
        }}
      >
        PREVIEW — unsaved
      </span>

      {data.tags?.length > 0 && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
          {data.tags.map((t) => (
            <span key={t} className="tag-pill">{t}</span>
          ))}
        </div>
      )}

      <h1 style={{ margin: '0 0 32px', fontSize: 40, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1 }}>{data.title}</h1>

      <div className="article-prose" dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}
