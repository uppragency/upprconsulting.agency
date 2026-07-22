'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Article = {
  id: string;
  title: string;
  content: string;
  meta_title: string | null;
  meta_description: string | null;
  og_image: string | null;
  tags: string[];
  status: 'draft' | 'published';
};

export default function ArticleForm({ article }: { article?: Article }) {
  const [title, setTitle] = useState(article?.title ?? '');
  const [content, setContent] = useState(article?.content ?? '');
  const [metaTitle, setMetaTitle] = useState(article?.meta_title ?? '');
  const [metaDescription, setMetaDescription] = useState(article?.meta_description ?? '');
  const [ogImage, setOgImage] = useState(article?.og_image ?? '');
  const [tagsInput, setTagsInput] = useState((article?.tags ?? []).join(', '));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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

  function getTags() {
    return tagsInput.split(',').map((t) => t.trim()).filter(Boolean);
  }

  async function save(status: 'draft' | 'published') {
    setLoading(true);
    setError(null);
    try {
      const body = { title, content, metaTitle, metaDescription, ogImage, tags: getTags(), status };
      const res = await fetch(article ? `/api/admin/blog/${article.id}` : '/api/admin/blog', {
        method: article ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.push('/admin/blog');
      router.refresh();
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong.');
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!article || !confirm('Delete this article?')) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/blog/${article.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      router.push('/admin/blog');
      router.refresh();
    } catch {
      setError('Could not delete the article.');
      setLoading(false);
    }
  }

  function handlePreview() {
    sessionStorage.setItem(
      'article-preview',
      JSON.stringify({ title, content, tags: getTags() })
    );
    window.open('/admin/blog/preview', '_blank');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <label style={labelStyle}>
        Title
        <input style={inputStyle} value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>

      <label style={labelStyle}>
        Content (raw HTML — paragraphs, &lt;h2&gt;, &lt;ul&gt; etc.)
        <textarea style={{ ...inputStyle, minHeight: 360, resize: 'vertical', fontFamily: 'var(--font-mono)', fontSize: 13.5 }} value={content} onChange={(e) => setContent(e.target.value)} />
      </label>

      <label style={labelStyle}>
        Tags (comma-separated)
        <input style={inputStyle} value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="website, branding, case study" />
      </label>

      <div style={{ background: '#fbfaf8', border: '1px solid rgba(35,35,38,0.08)', borderRadius: 12, padding: 18, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#55565e' }}>SEO (optional — defaults to the title/first paragraph if left blank)</span>
        <label style={labelStyle}>
          Meta title
          <input style={inputStyle} value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
        </label>
        <label style={labelStyle}>
          Meta description
          <input style={inputStyle} value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} />
        </label>
        <label style={labelStyle}>
          Custom OG image URL (leave blank to auto-generate one)
          <input style={inputStyle} value={ogImage} onChange={(e) => setOgImage(e.target.value)} placeholder="https://..." />
        </label>
      </div>

      {error && <p style={{ color: '#c0533f', fontSize: 14 }}>{error}</p>}

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button
          onClick={() => save('draft')}
          disabled={loading || !title || !content}
          style={{ border: '1px solid rgba(35,35,38,0.15)', background: '#fff', padding: '13px 24px', borderRadius: 99, fontSize: 14.5, fontWeight: 500, cursor: 'pointer' }}
        >
          Save draft
        </button>
        <button
          onClick={() => save('published')}
          disabled={loading || !title || !content}
          className="btn-dark"
          style={{ background: '#232326', color: '#fff', border: 'none', padding: '13px 24px', borderRadius: 99, fontSize: 14.5, fontWeight: 500, cursor: 'pointer' }}
        >
          Publish
        </button>
        <button
          onClick={handlePreview}
          type="button"
          disabled={!title || !content}
          style={{ border: '1px solid rgba(35,35,38,0.15)', background: '#fff', padding: '13px 24px', borderRadius: 99, fontSize: 14.5, fontWeight: 500, cursor: 'pointer' }}
        >
          Preview
        </button>
        {article && (
          <button
            onClick={handleDelete}
            disabled={loading}
            style={{ background: 'transparent', border: '1px solid rgba(192,83,63,0.4)', color: '#c0533f', padding: '13px 24px', borderRadius: 99, fontSize: 14.5, fontWeight: 500, cursor: 'pointer' }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
