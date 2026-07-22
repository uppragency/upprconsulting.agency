'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function NavUnreadBadge() {
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
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

  if (!hasUnread) return null;

  return (
    <span
      style={{
        position: 'absolute',
        top: 5,
        right: 5,
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: '#e2fa5c',
        border: '1.5px solid #fff',
      }}
    />
  );
}
