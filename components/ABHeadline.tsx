'use client';

import { useEffect, useState } from 'react';
import { getSessionId } from '@/lib/session-id';
import { getVariant, HEADLINE_VARIANTS } from '@/lib/ab-test';

export default function ABHeadline() {
  const [text, setText] = useState(HEADLINE_VARIANTS.a);

  useEffect(() => {
    const sessionId = getSessionId();
    const variant = getVariant(sessionId, 'headline');
    setText(HEADLINE_VARIANTS[variant]);
    fetch('/api/track/ab-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ testKey: 'headline', variant, sessionId }),
    }).catch(() => {});
  }, []);

  return (
    <h1 style={{ margin: 0, fontSize: 60, lineHeight: 1.04, letterSpacing: '-0.035em', fontWeight: 600 }}>{text}</h1>
  );
}
