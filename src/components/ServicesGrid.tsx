import {
  ShowerHead,
  Bath,
  Paintbrush,
  Hammer,
  Grid,
  HardHat,
  Wrench,
  Plug,
  Lightbulb,
  Sofa,
  ChevronRight,
} from 'lucide-react';
import type { ReactNode } from 'react';
import type { Service } from '../types';

interface ServicesGridProps {
  services: Service[];
  onBookNow: (serviceName: string) => void;
}

const SERVICE_META: Record<string, { icon: ReactNode; bg: string; color: string; shortDesc: string }> = {
  plumbing:     { icon: <Wrench size={22} />,                                             bg: '#e8f0fe', color: '#1a73e8', shortDesc: 'Expert plumbing solutions' },
  bathroom:     { icon: <Bath size={22} />,                                               bg: '#fce8e6', color: '#d93025', shortDesc: 'Modern bathroom makeovers' },
  painting:     { icon: <Paintbrush size={22} />,                                         bg: '#f3e8ff', color: '#6a1b9a', shortDesc: 'Professional & neat painting' },
  construction: { icon: <Hammer size={22} />,                                             bg: '#fff7e6', color: '#b06000', shortDesc: 'Building your dreams' },
  tiles:        { icon: <Grid size={22} />,                                               bg: '#e6f4ea', color: '#137333', shortDesc: 'Premium tiles & granite' },
  civil:        { icon: <HardHat size={22} />,                                            bg: '#e6fcff', color: '#007a87', shortDesc: 'Complete civil solutions' },
  carpenter:    { icon: <Hammer size={22} style={{ transform: 'rotate(90deg)' }} />,      bg: '#fce8ff', color: '#a100c7', shortDesc: 'Custom wood work' },
  electrical:   { icon: <Plug size={22} />,                                               bg: '#fffbeb', color: '#b25e00', shortDesc: 'Safe & reliable electrical work' },
  ceiling:      { icon: <Lightbulb size={22} />,                                          bg: '#fff0f0', color: '#c70039', shortDesc: 'Modern false ceiling designs' },
  interior:     { icon: <Sofa size={22} />,                                               bg: '#f3f4f6', color: '#374151', shortDesc: 'Complete interior solutions' },
};

export function ServicesGrid({ services, onBookNow }: ServicesGridProps) {
  return (
    <section className="services-grid-section" id="services">
      <div className="services-section-header">
        <h2 className="services-main-title">Our Services</h2>
        <button
          className="view-all-services-link"
          onClick={() => onBookNow('All Services')}
        >
          View All Services <ChevronRight size={14} />
        </button>
      </div>

      <div className="services-list-container">
        {services.map((service) => {
          const meta = SERVICE_META[service.id] ?? SERVICE_META['plumbing'];
          return (
            <button
              key={service.id}
              className="service-list-card"
              onClick={() => onBookNow(service.name)}
              type="button"
            >
              <div className="service-list-card-left">
                <div
                  className="service-list-icon-wrapper"
                  style={{ backgroundColor: meta.bg, color: meta.color }}
                >
                  {meta.icon}
                </div>
                <div className="service-list-card-info">
                  <h3 className="service-list-card-title">{service.name}</h3>
                  <p className="service-list-card-desc">{meta.shortDesc}</p>
                </div>
              </div>
              <div className="service-list-card-cta" style={{ backgroundColor: meta.bg, color: meta.color }}>
                <ChevronRight size={14} />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
