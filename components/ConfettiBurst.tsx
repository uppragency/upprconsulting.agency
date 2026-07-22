'use client';

import { useEffect, useState } from 'react';

const COLORS = ['#e2fa5c', '#232326', '#a8c8ff', '#ffb3c6', '#c4f7d0'];

export default function ConfettiBurst({ storageKey }: { storageKey: string }) {
  const [pieces, setPieces] = useState<{ id: number; left: number; delay: number; color: string; rotate: number }[]>([]);

  useEffect(() => {
    const shown = localStorage.getItem(storageKey);
    if (shown) return;
    localStorage.setItem(storageKey, '1');

    const newPieces = Array.from({ length: 46 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.4,
      color: COLORS[i % COLORS.length],
      rotate: Math.random() * 360,
    }));
    setPieces(newPieces);

    const timeout = setTimeout(() => setPieces([]), 3200);
    return () => clearTimeout(timeout);
  }, [storageKey]);

  if (!pieces.length) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 200, overflow: 'hidden' }}>
      {pieces.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            top: -20,
            left: `${p.left}%`,
            width: 8,
            height: 8,
            background: p.color,
            borderRadius: p.id % 3 === 0 ? '50%' : 2,
            animation: `confetti-fall 2.6s ease-in ${p.delay}s forwards`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
