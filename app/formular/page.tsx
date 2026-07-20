'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function FormularPage() {
  const [loading, setLoading] = useState(false);
  const [eroare, setEroare] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEroare(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get('email'));
    const parola = String(formData.get('parola'));
    const businessName = String(formData.get('business_name'));
    const contactName = String(formData.get('contact_name'));
    const phone = String(formData.get('phone'));
    const descriere = String(formData.get('descriere'));

    try {
      const supabase = createClient();

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password: parola,
      });

      if (signUpError) throw signUpError;
      if (!signUpData.user) throw new Error('Nu s-a putut crea contul.');

      // Sign in imediat, în caz că sesiunea nu e activă automat.
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password: parola });
      if (signInError) throw signInError;

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName,
          contactName,
          email,
          phone,
          descriere,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Eroare la inițierea plății.');

      window.location.href = data.url;
    } catch (err: any) {
      setEroare(err.message ?? 'A apărut o eroare. Încearcă din nou.');
      setLoading(false);
    }
  }

  return (
    <main className="container" style={{ maxWidth: 560, paddingTop: '4rem', paddingBottom: '4rem' }}>
      <p className="label">Comandă audit</p>
      <h1 style={{ fontSize: '2rem', marginTop: '0.75rem' }}>Datele tale</h1>
      <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
        După plată, primești acces instant în cont. Livrare în maximum 48 de ore.
      </p>

      <form onSubmit={handleSubmit} style={{ marginTop: '2rem', display: 'grid', gap: '1.25rem' }}>
        <div>
          <label htmlFor="business_name">Numele businessului</label>
          <input id="business_name" name="business_name" type="text" required />
        </div>

        <div>
          <label htmlFor="contact_name">Numele tău</label>
          <input id="contact_name" name="contact_name" type="text" required />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>

        <div>
          <label htmlFor="phone">Telefon</label>
          <input id="phone" name="phone" type="tel" required />
        </div>

        <div>
          <label htmlFor="descriere">Spune-ne pe scurt despre proiectul tău</label>
          <textarea id="descriere" name="descriere" rows={4} required />
        </div>

        <div>
          <label htmlFor="parola">Parolă pentru cont</label>
          <input id="parola" name="parola" type="password" minLength={8} required />
        </div>

        {eroare && (
          <p style={{ color: '#f87171', fontSize: '0.9rem' }}>{eroare}</p>
        )}

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Se procesează...' : 'Continuă spre plată — 50 EUR'}
        </button>
      </form>
    </main>
  );
}
