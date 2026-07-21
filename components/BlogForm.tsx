'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BlogForm({
  post,
}: {
  post?: { id: string; title: string; excerpt: string | null; content: string; published: boolean };
}) {
  const [title, setTitle] = useState(post?.title ?? '');
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? '');
  const [content, setContent] = useState(post?.content ?? '');
  const [published, setPublished] = useState(post?.published ?? true);
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

  async function handleSave() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(post ? `/api/admin/blog/${post.id}` : '/api/admin/blog', {
        method: post ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, excerpt, content, published }),
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
    if (!post || !confirm('Delete this post?')) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/blog/${post.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      router.push('/admin/blog');
      router.refresh();
    } catch {
      setError('Could not delete the post.');
      setLoading(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: '#55565e' }}>
        Title
        <input style={inputStyle} value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: '#55565e' }}>
        Excerpt (short summary shown on the blog list)
        <input style={inputStyle} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: '#55565e' }}>
        Content (separate paragraphs with a blank line)
        <textarea style={{ ...inputStyle, minHeight: 320, resize: 'vertical' }} value={content} onChange={(e) => setContent(e.target.value)} />
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
        <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
        Published
      </label>

      {error && <p style={{ color: '#c0533f', fontSize: 14 }}>{error}</p>}

      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={handleSave}
          disabled={loading || !title || !content}
          className="btn-dark"
          style={{ background: '#232326', color: '#fff', border: 'none', padding: '13px 26px', borderRadius: 99, fontSize: 14.5, fontWeight: 500, cursor: 'pointer' }}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
        {post && (
          <button
            onClick={handleDelete}
            disabled={loading}
            style={{ background: 'transparent', border: '1px solid rgba(192,83,63,0.4)', color: '#c0533f', padding: '13px 26px', borderRadius: 99, fontSize: 14.5, fontWeight: 500, cursor: 'pointer' }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
