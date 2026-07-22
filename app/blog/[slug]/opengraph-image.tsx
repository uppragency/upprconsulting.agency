import { ImageResponse } from 'next/og';
import { createServiceRoleClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage({ params }: { params: { slug: string } }) {
  const supabase = createServiceRoleClient();
  const { data: article } = await supabase.from('articles').select('title').eq('slug', params.slug).single();
  const title = article?.title ?? 'UPPR Consulting';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#232326',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 34, height: 34, background: '#e2fa5c', borderRadius: '50%' }} />
          <div style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>UPPR Consulting</div>
        </div>
        <div style={{ fontSize: 56, fontWeight: 700, color: '#fff', lineHeight: 1.15, maxWidth: 1000 }}>{title}</div>
        <div style={{ fontSize: 20, color: '#e2fa5c' }}>uppr-consulting.agency/blog</div>
      </div>
    ),
    size
  );
}
