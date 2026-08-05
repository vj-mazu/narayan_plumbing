interface Service {
  id: string;
  name: string;
  icon: string;
  desc: string;
}

interface ServicesGridProps {
  services: Service[];
  onBookNow: (serviceName: string) => void;
}

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
            <div
              key={service.id}
              className={`service-grid-card ${service.id === 'emergency' ? 'emergency' : ''}`}
            >
              <div 
                className="service-grid-icon-emoji"
                style={service.id === 'plumbing' ? { transform: 'scaleX(-1)', display: 'inline-block' } : undefined}
              >
                {service.icon.startsWith('/') ? (
                  <img src={service.icon} alt={service.name} />
                ) : (
                  service.icon
                )}
              </div>
              <h3 className="service-grid-title">{service.name}</h3>
              <p className="service-grid-desc">{service.desc}</p>
              <button
                className="btn-book-now"
                onClick={() => onBookNow(service.name)}
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
