'use client';

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="btn-dark"
      style={{ background: '#232326', color: '#fff', border: 'none', padding: '11px 22px', borderRadius: 99, fontSize: 14, cursor: 'pointer' }}
    >
      Print / Save as PDF
    </button>
  );
}
