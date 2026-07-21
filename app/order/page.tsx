'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

function OrderForm() {
  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref');
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setLoggedIn(true);
        setUserEmail(data.user.email ?? null);
      }
      setCheckingSession(false);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const businessName = String(formData.get('business_name'));
    const contactName = String(formData.get('contact_name'));
    const phone = String(formData.get('phone'));
    const description = String(formData.get('description'));

    try {
      const supabase = createClient();
      let email = userEmail;

      if (!loggedIn) {
        email = String(formData.get('email'));
        const password = String(formData.get('password'));

        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) throw signUpError;
        if (!signUpData.user) throw new Error('Could not create your account.');

        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
      }

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName, contactName, email, phone, description, referralCode: refCode }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error starting payment.');

      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong. Please try again.');
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

  if (checkingSession) return null;

  return (
    <>
      <Nav />
      <section style={{ display: 'flex', justifyContent: 'center', padding: '64px 24px 110px' }}>
        <div style={{ width: '100%', maxWidth: 560, background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 24, padding: 44, boxShadow: '0 24px 48px -24px rgba(35,35,38,0.18)' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e', margin: '0 0 12px' }}>Order audit</p>
          <h2 style={{ margin: 0, fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em' }}>
            {loggedIn ? 'A new order' : 'Your details'}
          </h2>
          <p style={{ margin: '10px 0 32px', fontSize: 15, lineHeight: 1.55, color: '#55565e' }}>
            {loggedIn
              ? `Ordering as ${userEmail}. This will appear as a new order in your account.`
              : 'After payment, you get instant access to your account. Delivery within 48 hours.'}
          </p>

          {refCode && (
            <p style={{ margin: '-16px 0 24px', fontSize: 13.5, color: '#6a7d0a', background: 'rgba(226,250,92,0.2)', padding: '8px 14px', borderRadius: 10 }}>
              Referral code applied — 15% off this order.
            </p>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <label style={labelStyle}>
              Business name
              <input name="business_name" type="text" required style={inputStyle} />
            </label>
            <label style={labelStyle}>
              Your name
              <input name="contact_name" type="text" required style={inputStyle} />
            </label>
            {!loggedIn && (
              <label style={labelStyle}>
                Email
                <input name="email" type="email" required style={inputStyle} />
              </label>
            )}
            <label style={labelStyle}>
              Phone
              <input name="phone" type="tel" required style={inputStyle} />
            </label>
            <label style={labelStyle}>
              Tell us briefly about your project
              <textarea name="description" rows={4} required style={inputStyle} />
            </label>
            {!loggedIn && (
              <label style={labelStyle}>
                Account password
                <input name="password" type="password" minLength={8} required style={inputStyle} />
              </label>
            )}

            {error && <p style={{ color: '#c0533f', fontSize: 14 }}>{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="btn-dark"
              style={{ marginTop: 8, width: '100%', background: '#232326', color: '#fff', border: 'none', padding: '15px 28px', borderRadius: 99, fontSize: 15, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-body)' }}
            >
              {loading ? 'Processing...' : 'Continue to payment — €50'}
            </button>
          </form>

          {!loggedIn && (
            <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14 }}>
              Already have an account? <a href="/login">Sign in</a>
            </p>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={null}>
      <OrderForm />
    </Suspense>
  );
}
