'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import OrderSummary from '@/components/OrderSummary';

function OrderForm() {
  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref');
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [payerType, setPayerType] = useState<'individual' | 'company'>('individual');
  const [discountCode, setDiscountCode] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/track/order-view', { method: 'POST' }).catch(() => {});
  }, []);

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
    const contactName = String(formData.get('contact_name'));
    const businessName = String(formData.get('business_name'));
    const websiteUrl = String(formData.get('website_url') || '');
    const instagramHandle = String(formData.get('instagram_handle') || '');
    const tiktokHandle = String(formData.get('tiktok_handle') || '');
    const description = String(formData.get('description') || '');

    const companyLegalName = String(formData.get('company_legal_name') || '');
    const companyTaxId = String(formData.get('company_tax_id') || '');
    const companyRegNumber = String(formData.get('company_reg_number') || '');
    const companyAddress = String(formData.get('company_address') || '');

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
        body: JSON.stringify({
          contactName,
          email,
          businessName,
          websiteUrl,
          instagramHandle,
          tiktokHandle,
          description,
          referralCode: discountCode ?? refCode,
          payerType,
          companyLegalName,
          companyTaxId,
          companyRegNumber,
          companyAddress,
        }),
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
      <section style={{ display: 'flex', justifyContent: 'center', padding: '64px 24px 110px' }}>
        <div
          className="grid-2-responsive"
          style={{
            width: '100%',
            maxWidth: 900,
            background: '#fff',
            border: '1px solid rgba(35,35,38,0.1)',
            borderRadius: 24,
            boxShadow: '0 24px 48px -24px rgba(35,35,38,0.18)',
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
          }}
        >
          <div style={{ padding: 44 }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e', margin: '0 0 12px' }}>Order audit</p>
            <h2 style={{ margin: 0, fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em' }}>
              {loggedIn ? 'A new order' : 'Your details'}
            </h2>
            <p style={{ margin: '10px 0 32px', fontSize: 15, lineHeight: 1.55, color: '#55565e' }}>
              {loggedIn
                ? `Ordering as ${userEmail}. This will appear as a new order in your account.`
                : 'After payment, you get instant access to your account. Delivery within 48 hours.'}
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              <label style={labelStyle}>
                Your name
                <input name="contact_name" type="text" required style={inputStyle} placeholder="Jane Doe" />
              </label>

              {!loggedIn && (
                <>
                  <label style={labelStyle}>
                    Email
                    <input name="email" type="email" required style={inputStyle} placeholder="jane@yourbusiness.com" />
                  </label>
                  <label style={labelStyle}>
                    Account password
                    <input name="password" type="password" minLength={8} required style={inputStyle} placeholder="At least 8 characters" />
                  </label>
                </>
              )}

              <div style={{ height: 1, background: 'rgba(35,35,38,0.08)', margin: '4px 0' }} />

              <label style={labelStyle}>
                Business name
                <input name="business_name" type="text" required style={inputStyle} placeholder="e.g. Uppr Agency" />
              </label>
              <label style={labelStyle}>
                Website link
                <input name="website_url" type="text" style={inputStyle} placeholder="e.g. www.uppr.agency" />
              </label>
              <label style={labelStyle}>
                Instagram handle
                <input name="instagram_handle" type="text" style={inputStyle} placeholder="e.g. @uppr.agency" />
              </label>
              <label style={labelStyle}>
                Tiktok handle
                <input name="tiktok_handle" type="text" style={inputStyle} placeholder="e.g. @uppr.agency" />
              </label>
              <label style={labelStyle}>
                Tell us briefly about your business — optional
                <textarea name="description" rows={4} style={inputStyle} />
              </label>

              <div style={{ height: 1, background: 'rgba(35,35,38,0.08)', margin: '4px 0' }} />

              <div style={labelStyle}>
                Billing as
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    type="button"
                    onClick={() => setPayerType('individual')}
                    style={{
                      flex: 1,
                      padding: '11px 0',
                      borderRadius: 10,
                      border: payerType === 'individual' ? '1.5px solid #232326' : '1px solid rgba(35,35,38,0.12)',
                      background: payerType === 'individual' ? '#fbfaf8' : '#fff',
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#232326',
                      cursor: 'pointer',
                    }}
                  >
                    Individual
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayerType('company')}
                    style={{
                      flex: 1,
                      padding: '11px 0',
                      borderRadius: 10,
                      border: payerType === 'company' ? '1.5px solid #232326' : '1px solid rgba(35,35,38,0.12)',
                      background: payerType === 'company' ? '#fbfaf8' : '#fff',
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#232326',
                      cursor: 'pointer',
                    }}
                  >
                    Company (invoice)
                  </button>
                </div>
              </div>

              {payerType === 'company' && (
                <div style={{ background: '#fbfaf8', border: '1px solid rgba(35,35,38,0.08)', borderRadius: 12, padding: 18, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <span style={{ fontSize: 13, color: '#55565e' }}>Invoicing details</span>
                  <label style={labelStyle}>
                    Legal company name
                    <input name="company_legal_name" type="text" required={payerType === 'company'} style={inputStyle} placeholder="e.g. Uppr Marketing S.R.L." />
                  </label>
                  <label style={labelStyle}>
                    Tax ID / CUI
                    <input name="company_tax_id" type="text" required={payerType === 'company'} style={inputStyle} placeholder="e.g. RO12345678" />
                  </label>
                  <label style={labelStyle}>
                    Registration number (Reg. Com.)
                    <input name="company_reg_number" type="text" style={inputStyle} placeholder="e.g. J40/1234/2024" />
                  </label>
                  <label style={labelStyle}>
                    Registered address
                    <input name="company_address" type="text" required={payerType === 'company'} style={inputStyle} placeholder="Street, number, city, country" />
                  </label>
                </div>
              )}

              {error && <p style={{ color: '#c0533f', fontSize: 14 }}>{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="btn-dark"
                style={{ marginTop: 8, width: '100%', background: '#232326', color: '#fff', border: 'none', padding: '15px 28px', borderRadius: 99, fontSize: 15, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-body)' }}
              >
                {loading ? 'Processing...' : 'Continue to payment'}
              </button>
            </form>

            {!loggedIn && (
              <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14 }}>
                Already have an account? <a href="/login">Sign in</a>
              </p>
            )}
          </div>

          <div className="order-summary-panel" style={{ padding: 44, background: '#fbfaf8' }}>
            <OrderSummary initialCode={refCode} onCodeChange={setDiscountCode} />
          </div>
        </div>
      </section>
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
