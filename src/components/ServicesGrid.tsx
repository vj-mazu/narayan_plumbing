import { ChevronRight } from 'lucide-react';
import type { Service } from '../types';

interface ServicesGridProps {
  services: Service[];
  onBookNow: (serviceName: string) => void;
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
        {services.map((service) => (
          <div
            key={service.id}
            className={`service-framed-card card-${service.id}`}
            onClick={() => onBookNow(service.name)}
          >
            <div className="service-framed-image-box">
              <img
                src={service.icon}
                srcSet={`${service.icon.replace('.webp', '-240.webp')} 240w, ${service.icon.replace('.webp', '-480.webp')} 480w, ${service.icon} 700w`}
                sizes="(max-width: 640px) 33vw, 380px"
                width={700}
                height={997}
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
                  else target.src = '/service-icons/construction.webp';
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
