import { 
  ChevronLeft, 
  ChevronRight,
  Wrench,
  HardHat,
  Bath,
  Sparkles,
  Paintbrush,
  Layers,
  Zap,
  Compass,
  Building,
  Home,
  Hammer
} from 'lucide-react';
import { PHONE_NUMBER } from '../types';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';

const QUICK_SERVICES = [
  {
    id: 'plumbing',
    label: 'Plumbing Services',
    image: '/hero-plumbing.webp',
    width: 900,
    height: 1599,
    fallbackImg: '/hero/banner-2.webp',
    icon: Wrench
  },
  {
    id: 'civil',
    label: 'Civil Work',
    image: '/service-card-civil.webp',
    width: 900,
    height: 900,
    fallbackImg: '/service-icons/civil.webp',
    icon: HardHat
  },
  {
    id: 'bathroom',
    label: 'Bathroom Renovation',
    image: '/hero-bathroom.webp',
    width: 900,
    height: 1350,
    fallbackImg: '/hero/banner-1.webp',
    icon: Bath
  },
  {
    id: 'cleaning',
    label: 'Cleaning Services',
    image: '/service-card-cleaning.webp',
    width: 900,
    height: 900,
    fallbackImg: '/service-card-cleaning.webp',
    icon: Sparkles
  },
  {
    id: 'painting',
    label: 'Painting Services',
    image: '/hero-painting.webp',
    width: 900,
    height: 1599,
    fallbackImg: '/hero/banner-1.webp',
    icon: Paintbrush
  },
  {
    id: 'tiles',
    label: 'Tiles & Granite Works',
    image: '/service-card-tiles.webp',
    width: 900,
    height: 900,
    fallbackImg: '/service-icons/tiles.webp',
    icon: Layers
  },
  {
    id: 'electrical',
    label: 'Electrical Work',
    image: '/service-card-electrical.webp',
    width: 900,
    height: 900,
    fallbackImg: '/service-icons/construction.webp',
    icon: Zap
  },
  {
    id: 'ceiling',
    label: 'False Ceiling Work',
    image: '/service-card-ceiling.webp',
    width: 900,
    height: 900,
    fallbackImg: '/service-icons/construction.webp',
    icon: Compass
  },
  {
    id: 'construction',
    label: 'Construction Work',
    image: '/service-card-construction.webp',
    width: 900,
    height: 900,
    fallbackImg: '/service-icons/construction.webp',
    icon: Building
  },
  {
    id: 'interior',
    label: 'Interior Design',
    image: '/hero-interior.webp',
    width: 900,
    height: 1352,
    fallbackImg: '/hero/banner-1.webp',
    icon: Home
  },
  {
    id: 'home-renovation',
    label: 'Home Renovation',
    image: '/service-card-home-renovation.webp',
    width: 900,
    height: 900,
    fallbackImg: '/work-interior-living.webp',
    icon: Sparkles
  },
  {
    id: 'carpenter',
    label: 'Carpenter Work',
    image: '/service-card-carpenter.webp',
    width: 900,
    height: 900,
    fallbackImg: '/work-ceiling-cove.webp',
    icon: Hammer
  },
];

export function QuickHelpSection() {
  const { trackRef, scrollBy, onPointerDown, onPointerMove, endDrag, wasDragged } = useHorizontalScroll();

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
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
        >
          {QUICK_SERVICES.map((s) => {
            const IconComponent = s.icon;
            return (
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
                    onError={(e) => {
                      e.currentTarget.src = s.fallbackImg;
                    }}
                  />
                </div>
                <span className="quick-help-card-label">{s.label}</span>
              </button>
            );
          })}
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
