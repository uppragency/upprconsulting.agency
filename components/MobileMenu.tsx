'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

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

      <div className={`mobile-menu-overlay${open ? ' open' : ''}`} onClick={() => setOpen(false)} />

      <div className={`mobile-menu-panel${open ? ' open' : ''}`}>
        <Link href="/blog" className="mobile-menu-link" onClick={() => setOpen(false)}>
          Blog
        </Link>
        <Link href="/account" className="mobile-menu-link" onClick={() => setOpen(false)}>
          My Audits
        </Link>
        <Link href="/order" className="mobile-menu-link mobile-menu-link-cta" onClick={() => setOpen(false)}>
          Order audit →
        </Link>
      </div>
    </>
  );
}
