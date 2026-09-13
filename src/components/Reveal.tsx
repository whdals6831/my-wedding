import { useEffect, useRef, type ReactNode } from 'react';
import { cx } from '../lib/cx';

let sharedObserver: IntersectionObserver | null = null;

function getObserver() {
  sharedObserver ??= new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.shown = '';
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0 },
  );
  return sharedObserver;
}

interface RevealProps {
  children: ReactNode;
  /** ms */
  delay?: number;
  className?: string;
}

/** 화면에 들어올 때 한 번 페이드인 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!('IntersectionObserver' in window)) {
      element.dataset.shown = '';
      return;
    }
    const observer = getObserver();
    observer.observe(element);
    return () => observer.unobserve(element);
  }, []);

  return (
    <div ref={ref} className={cx('reveal', className)} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}
