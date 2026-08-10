import { useEffect, useRef, useState, type ReactNode } from 'react';

interface DeferredProps {
  children: ReactNode;
  /**
   * Extra distance (px) outside the viewport at which the section starts
   * mounting. Larger = mounts earlier (safer, but less of a saving).
   */
  rootMargin?: string;
  /** Force-render immediately (used by nav scroll-to links). */
  forceMount?: boolean;
}

/**
 * Defers rendering — and therefore the network fetch of lazy chunks — until
 * the section approaches the viewport. This keeps below-the-fold JS (e.g.
 * framer-motion and the section bundles) off the critical path so FCP/LCP
 * stay fast on mobile.
 */
export function Deferred({ children, rootMargin = '600px 0px', forceMount = false }: DeferredProps) {
  const [visible, setVisible] = useState(forceMount);
  const ref = useRef<HTMLDivElement>(null);

  // React to forceMount changing after initial mount (nav scroll-to).
  useEffect(() => {
    if (forceMount) {
      setVisible(true);
      return;
    }
    if (visible) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [forceMount, visible, rootMargin]);

  return <div ref={ref}>{visible ? children : null}</div>;
}
