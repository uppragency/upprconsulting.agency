'use client';

import { useEffect, useRef } from 'react';

export default function Reveal({
  children,
  as = 'div',
  className,
  id,
}: {
  children: React.ReactNode;
  as?: 'div' | 'section';
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as;

  return (
    <Tag ref={ref} data-reveal="" className={className} id={id}>
      {children}
    </Tag>
  );
}
