import { ChevronRight } from 'lucide-react';
import type { Service } from '../types';

interface ServicesGridProps {
  services: Service[];
  onBookNow: (serviceName: string) => void;
}

function splitServiceName(name: string): { main: string; sub: string } {
  const trimmed = name.trim();
  const lastSpace = trimmed.lastIndexOf(' ');
  if (lastSpace === -1) return { main: trimmed, sub: '' };
  return { main: trimmed.slice(0, lastSpace), sub: trimmed.slice(lastSpace + 1) };
}

export function ServicesGrid({ services, onBookNow }: ServicesGridProps) {
  return (
    <section className="services-grid-section" id="services">
      <div className="services-section-header">
        <h2 className="services-main-title">Our Services</h2>
        <button
          className="view-all-services-link"
          onClick={() => onBookNow('All Services')}
          type="button"
        >
          View All Services <ChevronRight size={14} />
        </button>
      </div>

      <div className="services-framed-container">
        {services.map((service) => {
          const { main, sub } = splitServiceName(service.name);
          return (
            <div
              key={service.id}
              className={`service-framed-card card-${service.id}`}
              onClick={() => onBookNow(service.name)}
            >
              <div className="service-framed-image-box">
                <img
                  src={service.icon}
                  width={900}
                  height={900}
                  alt={service.name}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (service.id === 'plumbing') target.src = '/service-icons/plumbing.webp';
                    else if (service.id === 'bathroom') target.src = '/service-icons/bathroom.webp';
                    else if (service.id === 'painting') target.src = '/service-icons/painting.webp';
                    else if (service.id === 'tiles') target.src = '/service-icons/tiles.webp';
                    else if (service.id === 'civil') target.src = '/service-icons/civil.webp';
                    else if (service.id === 'cleaning') target.src = '/service-icons/civil.webp';
                    else if (service.id === 'home-renovation') target.src = '/work-interior-living.webp';
                    else if (service.id === 'home-maintenance') target.src = '/hero/banner-1.webp';
                    else target.src = '/service-icons/construction.webp';
                  }}
                />
              </div>
              <div className="service-framed-label-banner">
                <span className="service-framed-title">
                  {main.toUpperCase()}
                  {(sub || service.desc) && (
                    <em className="service-framed-sub">{(sub || service.desc).toUpperCase()}</em>
                  )}
                </span>
                <button
                  className="service-book-btn"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookNow(service.name);
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
