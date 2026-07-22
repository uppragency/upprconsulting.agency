import Link from 'next/link';

export default function Pagination({
  currentPage,
  totalPages,
  activeTag,
}: {
  currentPage: number;
  totalPages: number;
  activeTag?: string;
}) {
  if (totalPages <= 1) return null;

  const hrefFor = (page: number) => {
    const params = new URLSearchParams();
    if (activeTag) params.set('tag', activeTag);
    if (page > 1) params.set('page', String(page));
    const qs = params.toString();
    return `/blog${qs ? `?${qs}` : ''}`;
  };

  const pageStyle = (active: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 36,
    height: 36,
    borderRadius: 10,
    fontSize: 13.5,
    fontWeight: 600,
    background: active ? '#232326' : '#fff',
    color: active ? '#fff' : '#55565e',
    border: active ? 'none' : '1px solid rgba(35,35,38,0.1)',
  });

  return (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 40, flexWrap: 'wrap' }}>
      {currentPage > 1 && (
        <Link href={hrefFor(currentPage - 1)} style={pageStyle(false)}>
          ←
        </Link>
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <Link key={p} href={hrefFor(p)} style={pageStyle(p === currentPage)}>
          {p}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link href={hrefFor(currentPage + 1)} style={pageStyle(false)}>
          →
        </Link>
      )}
    </div>
  );
}
