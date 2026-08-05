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
  Sofa 
} from 'lucide-react';
import type { Service } from '../types';

interface ServicesGridProps {
  services: Service[];
  onBookNow: (serviceName: string) => void;
}

const getServiceIcon = (id: string) => {
  switch (id) {
    case 'bathroom':
      return <ShowerHead size={32} />;
    case 'painting':
      return <Paintbrush size={32} />;
    case 'construction':
      return <Hammer size={32} />;
    case 'tiles':
      return <Grid size={32} />;
    case 'civil':
      return <HardHat size={32} />;
    case 'carpenter':
      return <Hammer size={32} style={{ transform: 'rotate(90deg)' }} />;
    case 'electrical':
      return <Plug size={32} />;
    case 'ceiling':
      return <Lightbulb size={32} />;
    case 'interior':
      return <Sofa size={32} />;
    case 'plumbing':
    default:
      return <Wrench size={32} />;
  }
};

export function ServicesGrid({ services, onBookNow }: ServicesGridProps) {
  return (
    <section className="services-grid-section" id="services">
      <div className="section-heading">
        <span className="section-line" aria-hidden="true" />
        <h2>OUR SERVICES</h2>
        <span className="section-line" aria-hidden="true" />
      </div>
      <div className="services-grid-container">
        {services.map((service) => {
          return (
            <button
              key={service.id}
              className="service-grid-card"
              onClick={() => onBookNow(service.name)}
              type="button"
            >
              <div className="service-card-top-content">
                <div className="service-grid-icon-emoji">
                  {getServiceIcon(service.id)}
                </div>
                <h3 className="service-grid-title">{service.name}</h3>
              </div>
              {service.bgImage && (
                <div className="service-card-bg-image">
                  <img src={service.bgImage} alt="" loading="lazy" />
                  <div className="service-card-bg-overlay" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

