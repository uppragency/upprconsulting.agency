'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSessionId } from '@/lib/session-id';
import { getVariant, CTA_VARIANTS } from '@/lib/ab-test';

export default function ABCTAButton({ style, className }: { style?: React.CSSProperties; className?: string }) {
  const [text, setText] = useState(CTA_VARIANTS.a);

  useEffect(() => {
    const sessionId = getSessionId();
    const variant = getVariant(sessionId, 'cta');
    setText(CTA_VARIANTS[variant]);
    fetch('/api/track/ab-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ testKey: 'cta', variant, sessionId }),
    }).catch(() => {});
  }, []);

  return (
    <Link href="/order" className={className} style={style}>
      {text}
    </Link>
  );
}
