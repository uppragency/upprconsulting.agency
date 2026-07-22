'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import LogoutButton from './LogoutButton';

export default function FooterAccountSection() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setLoggedIn(!!data.user);
    });
  }, []);

  return (
    <div className="footer-my-account" style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
      <span style={{ fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92' }}>My Account</span>
      {loggedIn === null ? (
        <span style={{ color: '#8a8b92', fontSize: 13 }}>...</span>
      ) : loggedIn ? (
        <>
          <Link href="/account" className="footer-link" style={{ color: '#55565e' }}>View orders</Link>
          <Link href="/account/settings" className="footer-link" style={{ color: '#55565e' }}>Settings &amp; password</Link>
          <Link href="/order" className="footer-link" style={{ color: '#55565e' }}>Order another audit</Link>
          <div style={{ marginTop: 4 }}>
            <LogoutButton variant="light" />
          </div>
        </>
      ) : (
        <>
          <Link href="/login" className="footer-link" style={{ color: '#55565e' }}>Sign in</Link>
          <Link href="/order" className="footer-link" style={{ color: '#55565e' }}>Order &amp; create account</Link>
        </>
      )}
    </div>
  );
}
