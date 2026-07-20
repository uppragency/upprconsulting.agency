# UPPR Consulting

Site de consultanță identitate vizuală + website. Formular → cont → plată Stripe (50 EUR) → 6 livrabile (4 audituri + 2 video-uri) în dashboard, livrate manual din panoul admin (de construit în etapa următoare).

## Stack

Next.js 14 (App Router) + Supabase (auth, DB, RLS) + Stripe Checkout + Vercel.

## Setup local

```bash
npm install
cp .env.example .env.local
# completează variabilele din .env.local
npm run dev
```

## Variabile de mediu (Vercel → Settings → Environment Variables)

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` — din Supabase → Project Settings → API
- `STRIPE_SECRET_KEY` — din Stripe → Developers → API keys
- `STRIPE_WEBHOOK_SECRET` — din Stripe → Developers → Webhooks, endpoint `/api/webhook`, eveniment `checkout.session.completed`

## Setare obligatorie în Supabase înainte de test

Authentication → Providers → Email → dezactivează **Confirm email**. Fără asta, `signUp` nu loghează automat clientul și fluxul de checkout se blochează.

## Ce lipsește (etapa următoare)

- Panou admin pentru încărcarea livrabilelor (text/PDF pentru audituri, link Loom/Vimeo pentru video-uri)
- Pagini publice: Cum funcționează, Legal (termeni, confidențialitate, rambursare)
- Emailuri automate (confirmare comandă, notificare livrabil nou)
