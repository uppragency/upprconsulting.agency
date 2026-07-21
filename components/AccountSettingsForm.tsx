'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function AccountSettingsForm({ currentEmail, referralLink }: { currentEmail: string; referralLink: string }) {
  const [email, setEmail] = useState(currentEmail);
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#fbfaf8',
    border: '1px solid rgba(35,35,38,0.12)',
    borderRadius: 10,
    padding: '12px 14px',
    fontSize: 15,
    fontFamily: 'var(--font-body)',
    color: '#232326',
  };

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setError(null);
    try {
      const supabase = createClient();
      const updates: { email?: string; password?: string } = {};
      if (email !== currentEmail) updates.email = email;
      if (password) updates.password = password;

      if (Object.keys(updates).length === 0) {
        setStatus('idle');
        return;
      }

      const { error } = await supabase.auth.updateUser(updates);
      if (error) throw error;

      setPassword('');
      setStatus('done');
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong.');
      setStatus('error');
    }
  }

  function copyReferral() {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <form onSubmit={handleSave} style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Login details</h2>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: '#55565e' }}>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: '#55565e' }}>
          New password (leave empty to keep current)
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} style={inputStyle} />
        </label>

        {status === 'done' && <p style={{ color: '#3a7a3a', fontSize: 13.5, margin: 0 }}>Saved. If you changed your email, use the new one next time you sign in.</p>}
        {error && <p style={{ color: '#c0533f', fontSize: 13.5, margin: 0 }}>{error}</p>}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-dark"
          style={{ alignSelf: 'flex-start', background: '#232326', color: '#fff', border: 'none', padding: '11px 22px', borderRadius: 99, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}
        >
          {status === 'loading' ? 'Saving...' : 'Save changes'}
        </button>
      </form>

      <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 28 }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 600 }}>Refer a friend</h2>
        <p style={{ margin: '0 0 16px', fontSize: 14, color: '#55565e', lineHeight: 1.55 }}>
          Share your link. Anyone who orders through it gets 15% off, and you get the same discount on your next audit.
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <input readOnly value={referralLink} style={{ ...inputStyle, flex: '1 1 260px', color: '#55565e' }} />
          <button
            type="button"
            onClick={copyReferral}
            className="btn-dark"
            style={{ background: '#232326', color: '#fff', border: 'none', borderRadius: 10, padding: '0 18px', fontSize: 14, cursor: 'pointer' }}
          >
            {copied ? 'Copied!' : 'Copy link'}
          </button>
        </div>
      </div>
    </div>
  );
}
