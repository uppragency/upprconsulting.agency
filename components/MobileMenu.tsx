'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    setMounted(true);

    let cancelled = false;
    async function check() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { count } = await supabase
        .from('deliverables')
        .select('id, clients!inner(user_id)', { count: 'exact', head: true })
        .eq('status', 'delivered')
        .eq('read_by_client', false)
        .eq('clients.user_id', user.id);

      if (!cancelled) setHasUnread(!!count && count > 0);
    }
    check();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const links = [
    { href: '/#advantages', label: 'Advantages', internal: false },
    { href: '/#audits', label: 'Audits', internal: false },
    { href: '/blog', label: 'Blog', internal: true },
    { href: '/#pricing', label: 'Pricing', internal: false },
    { href: '/account', label: 'My Audits', internal: true },
  ];

  return (
    <>
      <button
        type="button"
        className={`hamburger-btn${open ? ' open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        <span />
        <span />
        <span />
      </button>

      {mounted &&
        createPortal(
          <>
            <div className={`mobile-menu-overlay${open ? ' open' : ''}`} onClick={() => setOpen(false)} />
            <div className={`mobile-menu-panel${open ? ' open' : ''}`}>
              {links.map((l) =>
                l.internal ? (
                  <Link key={l.href} href={l.href} className="mobile-menu-link" onClick={() => setOpen(false)} style={{ position: 'relative' }}>
                    {l.label}
                    {l.href === '/account' && hasUnread && (
                      <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#e2fa5c', marginLeft: 8, verticalAlign: 'middle' }} />
                    )}
                  </Link>
                ) : (
                  <a key={l.href} href={l.href} className="mobile-menu-link" onClick={() => setOpen(false)}>
                    {l.label}
                  </a>
                )
              )}
              <Link href="/order" className="mobile-menu-link mobile-menu-link-cta" onClick={() => setOpen(false)}>
                Order audit →
              </Link>
            </div>
          </>,
          document.body
        )}
    </>
  );
}
