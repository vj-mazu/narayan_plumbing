import { useCallback, useEffect, useRef, useState } from 'react';
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

// How fast the carousel glides on mobile (px per second). Deliberately slow and
// smooth so it feels like the reviews marquee, not a quick jump.
const MARQUEE_SPEED = 26;

export function QuickHelpSection() {
  const { trackRef, scrollBy, onPointerDown, onPointerMove, endDrag, wasDragged } = useHorizontalScroll();
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 768px)').matches);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const isVisibleRef = useRef(true);

  // Keep the duplicated-list / marquee mode in sync with the viewport.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Cached track measurements. Reading scrollWidth/clientWidth on every
  // animation frame forces a layout reflow — cache them and refresh only on
  // mount / resize so the marquee loop stays reflow-free.
  const dimsRef = useRef({ maxScroll: 0, oneCopy: 0 });

  const measureTrack = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    dimsRef.current = {
      maxScroll: track.scrollWidth - track.clientWidth,
      oneCopy: track.scrollWidth / 2,
    };
  }, []);

  const stopAutoScroll = useCallback(() => {
    if (rafRef.current != null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  // Continuous marquee on mobile: the service cards are rendered twice, so the
  // track can glide forever and wrap back to the start seamlessly — same feel
  // as the reviews section. Uses manual scrollLeft (rAF) so it works on every
  // mobile browser (native smooth scrollBy is unreliable inside scroll-snap).
  // Layout properties are read from the cached dimsRef (see measureTrack) so
  // no forced reflow happens inside the animation loop.
  const startAutoScroll = useCallback(() => {
    if (rafRef.current != null) return;
    lastTimeRef.current = performance.now();
    const tick = (now: number) => {
      const track = trackRef.current;
      if (!track || !window.matchMedia('(max-width: 768px)').matches) {
        stopAutoScroll();
        return;
      }
      // Pure time-based movement (no dt cap): total distance = speed × elapsed
      // time, so the marquee covers the same ground even when the frame rate is
      // throttled (background tab, low-power mode, headless).
      const dt = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;
      const { maxScroll, oneCopy } = dimsRef.current;
      if (maxScroll > 0) {
        track.scrollLeft += MARQUEE_SPEED * dt;
        // We are at the end of the FIRST copy of the list — jump back by one
        // full copy width. Because the content is duplicated identically, this
        // looks like a seamless infinite loop.
        if (track.scrollLeft >= oneCopy) {
          track.scrollLeft -= oneCopy;
        }
      }
      rafRef.current = window.requestAnimationFrame(tick);
    };
    rafRef.current = window.requestAnimationFrame(tick);
  }, [stopAutoScroll]);

  // Start the marquee only on mobile, and (re)start it whenever the viewport
  // switches to mobile (initial phone load, device rotation, or resizing). This
  // also fixes the case where the page first renders at desktop width and is
  // then resized to mobile — the loop would otherwise stop forever.
  useEffect(() => {
    measureTrack();
    if (isMobile) {
      startAutoScroll();
    } else {
      stopAutoScroll();
    }
    return () => stopAutoScroll();
  }, [isMobile, measureTrack, startAutoScroll, stopAutoScroll]);

  // Keep the cached measurements fresh when the viewport size changes.
  useEffect(() => {
    const onResize = () => measureTrack();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [measureTrack]);

  // Pause the rAF marquee when the section is off-screen: keeps the main
  // thread idle for long tasks (better TBT) and saves battery on mobile.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver((entries) => {
      isVisibleRef.current = entries[0]?.isIntersecting ?? true;
      if (!isVisibleRef.current) {
        stopAutoScroll();
      } else if (isMobile) {
        startAutoScroll();
      }
    }, { rootMargin: '100px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile, startAutoScroll, stopAutoScroll]);

  const openCall = (label: string) => {
    const msg = encodeURIComponent(`Hi Narayan Services, I need help with: ${label}`);
    window.open(`https://wa.me/91${PHONE_NUMBER}?text=${msg}`, '_blank');
  };

  // On mobile render the list twice so the marquee loops seamlessly.
  const displayServices = isMobile ? [...QUICK_SERVICES, ...QUICK_SERVICES] : QUICK_SERVICES;

  return (
    <section ref={sectionRef} className="quick-help-section">
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
          {displayServices.map((s, idx) => (
            <button
              key={`${s.id}-${idx}`}
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
                  srcSet={`${s.image.replace('.webp', '-160.webp')} 160w, ${s.image.replace('.webp', '-240.webp')} 240w, ${s.image} 480w`}
                  sizes="(max-width: 768px) 68px, 195px"
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
