'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLLAPSED_COUNT = 6;

export default function TagFilter({ tags, activeTag }: { tags: string[]; activeTag?: string }) {
  const [expanded, setExpanded] = useState(false);

  // If the active tag is hidden in the collapsed set, show everything by default
  // so the current filter is never invisible.
  const activeHidden = activeTag ? !tags.slice(0, COLLAPSED_COUNT).includes(activeTag) : false;
  const showAll = expanded || activeHidden;
  const visibleTags = showAll ? tags : tags.slice(0, COLLAPSED_COUNT);

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32, alignItems: 'center' }}>
      <Link href="/blog" className={`tag-pill${!activeTag ? ' active' : ''}`}>
        All
      </Link>
      {visibleTags.map((tag) => (
        <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} className={`tag-pill${activeTag === tag ? ' active' : ''}`}>
          {tag}
        </Link>
      ))}
      {tags.length > COLLAPSED_COUNT && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="tag-pill"
          style={{ border: '1px dashed rgba(35,35,38,0.2)', background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
        >
          {showAll ? 'Show less' : `+${tags.length - COLLAPSED_COUNT} more`}
        </button>
      )}
    </div>
  );
}
