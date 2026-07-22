'use client';

import { useState } from 'react';

export default function TestimonialPrompt({ clientId }: { clientId: string }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [quote, setQuote] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function handleSubmit() {
    if (!rating || !quote.trim()) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId, rating, quote }),
      });
      if (!res.ok) throw new Error();
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 24, textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Thanks for the feedback! 🙌</p>
      </div>
    );
  }

  return (
    <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 24 }}>
      <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700 }}>How did we do?</h3>
      <p style={{ margin: '0 0 16px', fontSize: 13.5, color: '#55565e' }}>All your audits are ready. Mind leaving a quick review?</p>

      <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setRating(n)}
            onMouseEnter={() => setHoverRating(n)}
            onMouseLeave={() => setHoverRating(0)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 24, padding: 0, color: (hoverRating || rating) >= n ? '#e2fa5c' : 'rgba(35,35,38,0.15)' }}
            aria-label={`${n} stars`}
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
        placeholder="What was most useful about the audit?"
        rows={3}
        style={{ width: '100%', border: '1px solid rgba(35,35,38,0.12)', borderRadius: 10, padding: '10px 14px', fontSize: 14, fontFamily: 'var(--font-body)', marginBottom: 12 }}
      />

      {status === 'error' && <p style={{ color: '#c0533f', fontSize: 13, margin: '0 0 10px' }}>Something went wrong, please try again.</p>}

      <button
        onClick={handleSubmit}
        disabled={status === 'loading' || !rating || !quote.trim()}
        className="btn-dark"
        style={{ background: '#232326', color: '#fff', border: 'none', padding: '10px 22px', borderRadius: 99, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}
      >
        {status === 'loading' ? 'Sending...' : 'Send review'}
      </button>
    </div>
  );
}
