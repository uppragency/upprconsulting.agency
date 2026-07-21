'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function FormularPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));
    const businessName = String(formData.get('business_name'));
    const contactName = String(formData.get('contact_name'));
    const phone = String(formData.get('phone'));
    const description = String(formData.get('description'));

    try {
      const supabase = createClient();

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;
      if (!signUpData.user) throw new Error('Could not create your account.');

      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName, contactName, email, phone, description }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error starting payment.');

      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <>
      <div className="gradient-bar" />
      <Nav />
      <section style={{ display: 'flex', justifyContent: 'center', padding: '60px 24px 110px', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ top: -60, right: '20%', width: 280, height: 280, background: 'oklch(0.6 0.18 300 / 0.09)', animation: 'uppr-float-a 18s ease-in-out infinite' }} />

        <div className="form-card">
          <p className="form-eyebrow">Order audit</p>
          <h2>Your details</h2>
          <p>After payment, you get instant access to your account. Delivery within 48 hours.</p>

          <form onSubmit={handleSubmit} className="form-fields">
            <label>
              Business name
              <input name="business_name" type="text" required />
            </label>
            <label>
              Your name
              <input name="contact_name" type="text" required />
            </label>
            <label>
              Email
              <input name="email" type="email" required />
            </label>
            <label>
              Phone
              <input name="phone" type="tel" required />
            </label>
            <label>
              Tell us briefly about your project
              <textarea name="description" rows={4} required />
            </label>
            <label>
              Account password
              <input name="password" type="password" minLength={8} required />
            </label>

            {error && <p style={{ color: '#dc2626', fontSize: '0.9rem' }}>{error}</p>}

            <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: 8, width: '100%' }}>
              {loading ? 'Processing...' : 'Continue to payment — 50 EUR'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14 }}>
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </div>
      </section>
      <Footer />
      <div className="gradient-bar" />
    </>
  );
}
