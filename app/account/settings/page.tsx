import { createClient, createServiceRoleClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import AccountSettingsForm from '@/components/AccountSettingsForm';

function generateReferralCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export default async function SettingsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase.from('profiles').select('referral_code').eq('id', user.id).single();

  let referralCode = profile?.referral_code;
  if (!referralCode) {
    referralCode = generateReferralCode();
    const service = createServiceRoleClient();
    await service.from('profiles').update({ referral_code: referralCode }).eq('id', user.id);
  }

  const referralLink = `https://upprconsulting-agency.vercel.app/order?ref=${referralCode}`;

  return (
    <>
      <Nav />
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '64px 32px 96px' }}>
        <Link href="/account" style={{ fontSize: 13, color: '#55565e' }}>← Back to your audits</Link>
        <h1 style={{ margin: '10px 0 32px', fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em' }}>Settings</h1>
        <AccountSettingsForm currentEmail={user.email ?? ''} referralLink={referralLink} />
      </section>
      <Footer />
    </>
  );
}
