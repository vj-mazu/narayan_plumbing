import { useCallback, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { PHONE_NUMBER } from '../types';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';

// Order MUST match CORE_SERVICES in src/data.ts (same sequence as the “Our Services” grid)
const QUICK_SERVICES = [
  { id: 'plumbing', label: 'Plumbing Services', image: '/quick-help/plumbing.webp', width: 480, height: 480 },
  { id: 'civil', label: 'Civil Work', image: '/quick-help/civil.webp', width: 480, height: 480 },
  { id: 'bathroom', label: 'Bathroom Renovation', image: '/quick-help/bathroom.webp', width: 480, height: 480 },
  { id: 'cleaning', label: 'Cleaning Services', image: '/quick-help/cleaning.webp', width: 480, height: 480 },
  { id: 'painting', label: 'Painting Services', image: '/quick-help/painting.webp', width: 480, height: 480 },
  { id: 'tiles', label: 'Tiles & Granite Works', image: '/quick-help/tiles.webp', width: 480, height: 480 },
  { id: 'electrical', label: 'Electrical Work', image: '/quick-help/electrical.webp', width: 480, height: 480 },
  { id: 'ceiling', label: 'False Ceiling Work', image: '/quick-help/ceiling.webp', width: 480, height: 480 },
  { id: 'construction', label: 'Construction Work', image: '/quick-help/construction.webp', width: 480, height: 480 },
  { id: 'interior', label: 'Interior Design', image: '/quick-help/interior.webp', width: 480, height: 480 },
  { id: 'home-renovation', label: 'Home Renovation', image: '/quick-help/home-renovation.webp', width: 480, height: 480 },
  { id: 'carpenter', label: 'Carpenter Work', image: '/quick-help/carpenter.webp', width: 480, height: 480 },
  { id: 'home-maintenance', label: 'Home Maintenance', image: '/quick-help/home-maintenance.webp', width: 480, height: 480 },
];

export function QuickHelpSection() {
  const { trackRef, scrollBy, onPointerDown, onPointerMove, endDrag, wasDragged } = useHorizontalScroll();
  const autoScrollTimer = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const cancelAnimation = useCallback(() => {
    if (rafRef.current != null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const stopAutoScroll = useCallback(() => {
    cancelAnimation();
    if (autoScrollTimer.current != null) {
      window.clearInterval(autoScrollTimer.current);
      autoScrollTimer.current = null;
    }
  }, [cancelAnimation]);

  // Manually animate scrollLeft with requestAnimationFrame. Native
  // scrollBy({ behavior: 'smooth' }) is unreliable inside a scroll-snap
  // container on real mobile browsers (esp. iOS Safari), so we drive the
  // scroll position ourselves frame-by-frame — works everywhere.
  const animateTo = useCallback((el: HTMLElement, target: number, duration = 600) => {
    cancelAnimation();
    const start = el.scrollLeft;
    const diff = target - start;
    if (Math.abs(diff) < 1) return;
    const t0 = performance.now();
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      el.scrollLeft = start + diff * easeOut(p);
      if (p < 1) {
        rafRef.current = window.requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };
    rafRef.current = window.requestAnimationFrame(tick);
  }, [cancelAnimation]);

  // On mobile the arrow buttons are hidden, so the carousel moves by itself.
  // The viewport check runs on every tick so resizing/rotating also works.
  const startAutoScroll = useCallback(() => {
    if (autoScrollTimer.current != null) return;
    autoScrollTimer.current = window.setInterval(() => {
      const track = trackRef.current;
      if (!track || !window.matchMedia('(max-width: 768px)').matches) {
        stopAutoScroll();
        return;
      }
      const card = track.querySelector<HTMLElement>('.quick-help-photo-card');
      const step = (card?.offsetWidth ?? 68) + 8;
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll <= 0) return;
      if (track.scrollLeft >= maxScroll - 4) {
        animateTo(track, 0);
      } else {
        animateTo(track, Math.min(track.scrollLeft + step, maxScroll));
      }
    }, 2100);
  }, [stopAutoScroll, animateTo]);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [startAutoScroll, stopAutoScroll]);

  const openCall = (label: string) => {
    const msg = encodeURIComponent(`Hi Narayan Services, I need help with: ${label}`);
    window.open(`https://wa.me/91${PHONE_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <section className="quick-help-section">
      <div className="quick-help-header">
        <h2 className="quick-help-title">How can we help you?</h2>
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="quick-help-view-all"
        >
          View All →
        </a>
      </div>
      <div className="quick-help-carousel">
        <button
          className="services-scroll-btn services-scroll-prev quick-help-scroll-prev"
          onClick={() => scrollBy(-1)}
          type="button"
          aria-label="Scroll help options left"
        >
          <ChevronLeft size={22} />
        </button>

        <div
          ref={trackRef}
          className="quick-help-grid quick-help-track"
          onPointerDown={(e) => {
            stopAutoScroll();
            onPointerDown(e);
          }}
          onPointerMove={onPointerMove}
          onPointerUp={(e) => {
            endDrag(e);
            startAutoScroll();
          }}
          onPointerCancel={(e) => {
            endDrag(e);
            startAutoScroll();
          }}
          onPointerLeave={(e) => {
            endDrag(e);
            startAutoScroll();
          }}
        >
          {QUICK_SERVICES.map((s) => (
            <button
              key={s.id}
              className="quick-help-photo-card"
              onClick={() => {
                if (wasDragged()) return;
                openCall(s.label);
              }}
              type="button"
              aria-label={`Get help with ${s.label}`}
            >
              <div className="quick-help-image-wrapper">
                <img
                  src={s.image}
                  width={s.width}
                  height={s.height}
                  alt={s.label}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </div>
              <span className="quick-help-card-label">{s.label}</span>
            </button>
          ))}
        </div>

        <button
          className="services-scroll-btn services-scroll-next quick-help-scroll-next"
          onClick={() => scrollBy(1)}
          type="button"
          aria-label="Scroll help options right"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </section>
  );
}
