'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  /** Stagger in milliseconds */
  delay?: number;
  as?: ElementType;
  className?: string;
  id?: string;
  /** Extra data-* attributes forwarded to the element */
  dataAttrs?: Record<string, string | boolean | undefined>;
};

/**
 * Lightweight scroll reveal built on IntersectionObserver.
 * No animation library; respects prefers-reduced-motion via CSS.
 */
export default function Reveal({
  children,
  delay = 0,
  as,
  className,
  id,
  dataAttrs,
}: RevealProps) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      {...dataAttrs}
      data-reveal={shown ? 'shown' : ''}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
