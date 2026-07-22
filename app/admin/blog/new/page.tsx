import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ArticleForm from '@/components/ArticleForm';

export default async function NewArticlePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (profile?.role !== 'admin') redirect('/account');

  return (
    <>
      <Nav />
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '64px 32px 96px' }}>
        <Link href="/admin/blog" style={{ fontSize: 13, color: '#55565e' }}>← Blog posts</Link>
        <h1 style={{ margin: '10px 0 32px', fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em' }}>New post</h1>
        <ArticleForm />
      </section>
      <Footer />
    </>
  );
}
