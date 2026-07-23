'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getSessionId } from '@/lib/session-id';

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Skip tracking inside the app (account/admin), only public marketing pages matter here
    if (pathname.startsWith('/account') || pathname.startsWith('/admin')) return;

    fetch('/api/track/page-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: pathname, sessionId: getSessionId() }),
    }).catch(() => {});
  }, [pathname]);

  return null;
}
