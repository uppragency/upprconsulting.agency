'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus('done');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return <span style={{ fontSize: 12, color: '#8a8b92', lineHeight: 1.5 }}>You're subscribed. Thanks!</span>;
  }

  return (
    <>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
        <input
          type="email"
          placeholder="Email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            flex: 1,
            minWidth: 0,
            border: '1px solid rgba(35,35,38,0.12)',
            borderRadius: 99,
            padding: '10px 16px',
            fontSize: 14,
            fontFamily: 'var(--font-body)',
            background: '#fff',
            color: '#232326',
          }}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-dark"
          style={{ border: 'none', background: '#232326', color: '#fff', padding: '10px 18px', borderRadius: 99, fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-body)' }}
        >
          {status === 'loading' ? '...' : 'Subscribe'}
        </button>
      </form>
      {status === 'error' && <span style={{ fontSize: 12, color: '#c0533f' }}>Something went wrong.</span>}
      <span style={{ fontSize: 12, color: '#8a8b92', lineHeight: 1.5 }}>Occasional emails about audits and website tips. No spam.</span>
    </>
  );
}
