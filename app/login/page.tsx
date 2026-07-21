'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      router.push('/cont');
      router.refresh();
    } catch (err: any) {
      setError('Incorrect email or password.');
      setLoading(false);
    }
  }

  return (
    <>
      <div className="gradient-bar" />
      <Nav />
      <section style={{ display: 'flex', justifyContent: 'center', padding: '60px 24px 110px', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ top: -60, left: '20%', width: 280, height: 280, background: 'oklch(0.6 0.18 300 / 0.09)', animation: 'uppr-float-b 18s ease-in-out infinite' }} />

        <div className="form-card" style={{ maxWidth: 440 }}>
          <p className="form-eyebrow">Your account</p>
          <h2>Sign in</h2>
          <p>Sign in with the email and password you set when you ordered.</p>

          <form onSubmit={handleSubmit} className="form-fields">
            <label>
              Email
              <input name="email" type="email" required />
            </label>
            <label>
              Password
              <input name="password" type="password" required />
            </label>

            {error && <p style={{ color: '#dc2626', fontSize: '0.9rem' }}>{error}</p>}

            <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: 8, width: '100%' }}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14 }}>
            Haven't ordered yet? <a href="/formular">Order the audit</a>
          </p>
        </div>
      </section>
      <Footer />
      <div className="gradient-bar" />
    </>
  );
}
