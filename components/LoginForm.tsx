'use client';

import { useState } from 'react';

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requiresCaptcha, setRequiresCaptcha] = useState(false);
  const [captcha] = useState(() => ({ a: Math.floor(Math.random() * 8) + 1, b: Math.floor(Math.random() * 8) + 1 }));
  const [captchaAnswer, setCaptchaAnswer] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          ...(requiresCaptcha ? { captchaA: captcha.a, captchaB: captcha.b, captchaAnswer } : {}),
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Incorrect email or password.');
        if (data.requiresCaptcha) setRequiresCaptcha(true);
        setLoading(false);
        return;
      }

      // A full page navigation (not router.push) avoids a race where the
      // middleware's session check runs before the auth cookie has fully
      // propagated, which was causing a redirect loop back to /login.
      window.location.href = '/account';
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

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

  const labelStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: '#55565e' };

  return (
    <section style={{ display: 'flex', justifyContent: 'center', padding: '64px 24px 110px' }}>
      <div style={{ width: '100%', maxWidth: 440, background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 24, padding: 44, boxShadow: '0 24px 48px -24px rgba(35,35,38,0.18)' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e', margin: '0 0 12px' }}>Your account</p>
        <h2 style={{ margin: 0, fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em' }}>Sign in</h2>
        <p style={{ margin: '10px 0 32px', fontSize: 15, lineHeight: 1.55, color: '#55565e' }}>
          Sign in with the email and password you set when you ordered.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <label style={labelStyle}>
            Email
            <input name="email" type="email" required style={inputStyle} />
          </label>
          <label style={labelStyle}>
            Password
            <input name="password" type="password" required style={inputStyle} />
          </label>

          {requiresCaptcha && (
            <label style={labelStyle}>
              Quick check: what is {captcha.a} + {captcha.b}?
              <input
                type="number"
                required
                value={captchaAnswer}
                onChange={(e) => setCaptchaAnswer(e.target.value)}
                style={inputStyle}
                placeholder="Your answer"
              />
            </label>
          )}

          {error && <p style={{ color: '#c0533f', fontSize: 14 }}>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-dark"
            style={{ marginTop: 8, width: '100%', background: '#232326', color: '#fff', border: 'none', padding: '15px 28px', borderRadius: 99, fontSize: 15, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-body)' }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14 }}>
          Haven't ordered yet? <a href="/order">Order the audit</a>
        </p>
      </div>
    </section>
  );
}
