import { TapIcon, ShowerIcon, ToiletIcon, WashBasinIcon, KitchenSinkIcon, PipeLeakIcon, PipeInstallIcon, DrainIcon, WaterTankIcon, GeyserIcon, BathroomIcon, EmergencyIcon } from '../PlumbingIcons';

interface ServiceDisplay {
  id: string;
  shortName: string;
  subtitle: string;
  emergency?: boolean;
}

interface ServicesGridProps {
  services: ServiceDisplay[];
  onBookNow: (serviceName: string) => void;
}

const serviceIcons = [TapIcon, ShowerIcon, ToiletIcon, WashBasinIcon, KitchenSinkIcon, PipeLeakIcon, PipeInstallIcon, DrainIcon, WaterTankIcon, GeyserIcon, BathroomIcon, EmergencyIcon];

export function ServicesGrid({ services, onBookNow }: ServicesGridProps) {
  return (
    <section className="services-grid-section" id="services">
      <div className="section-heading">
        <span className="section-line" aria-hidden="true" />
        <h2>OUR SERVICES</h2>
        <span className="section-line" aria-hidden="true" />
      </div>
      <div className="services-grid-container">
        {services.map((service, index) => {
          const Icon = serviceIcons[index] || TapIcon;
          return (
            <div
              key={service.id}
              className={`service-grid-card ${service.emergency ? 'emergency' : ''}`}
            >
              <div className="service-grid-icon">
                <Icon size={44} />
              </div>
              <h3 className="service-grid-title">{service.shortName}</h3>
              <p className="service-grid-desc">{service.subtitle}</p>
              <button
                className="btn-book-now"
                onClick={() => onBookNow(service.shortName)}
                type="button"
              >
                BOOK NOW
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
