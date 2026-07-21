'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      style={{
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.15)',
        color: '#fff',
        borderRadius: 99,
        padding: '9px 18px',
        fontSize: 14,
        fontFamily: 'var(--font-body)',
        cursor: 'pointer',
      }}
    >
      {loading ? 'Signing out...' : 'Sign out'}
    </button>
  );
}
