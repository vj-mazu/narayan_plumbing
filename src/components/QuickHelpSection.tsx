import { PHONE_NUMBER } from '../types';

const QUICK_SERVICES = [
  {
    id: 'plumbing',
    label: 'Plumbing Services',
    image: '/hero-plumbing.webp',
    width: 900,
    height: 1599,
    fallbackImg: '/hero/banner-2.webp',
  },
  {
    id: 'civil',
    label: 'Civil Work',
    image: '/service-card-civil.webp',
    width: 900,
    height: 900,
    fallbackImg: '/service-icons/civil.webp',
  },
  {
    id: 'bathroom',
    label: 'Bathroom Renovation',
    image: '/hero-bathroom.webp',
    width: 900,
    height: 1350,
    fallbackImg: '/hero/banner-1.webp',
  },
  {
    id: 'cleaning',
    label: 'Cleaning Services',
    image: '/hero-cleaning.webp',
    width: 900,
    height: 1658,
    fallbackImg: '/hero/banner-3.webp',
  },
  {
    id: 'painting',
    label: 'Painting Services',
    image: '/hero-painting.webp',
    width: 900,
    height: 1599,
    fallbackImg: '/hero/banner-1.webp',
  },
];

export function QuickHelpSection() {
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
      <div className="quick-help-grid">
        {QUICK_SERVICES.map((s) => (
          <button
            key={s.id}
            className="quick-help-photo-card"
            onClick={() => openCall(s.label)}
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
                onError={(e) => {
                  e.currentTarget.src = s.fallbackImg;
                }}
              />
            </div>
            <span className="quick-help-card-label">{s.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
