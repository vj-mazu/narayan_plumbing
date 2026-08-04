import { Wrench, Droplets, Zap, Wind, Hammer, Shield } from 'lucide-react';

const TRENDING_SERVICES_BAR = [
  { icon: Wrench, label: 'Tap Repair' },
  { icon: Droplets, label: 'Leak Fixing' },
  { icon: Zap, label: 'Geyser Service' },
  { icon: Wind, label: 'Drain Cleaning' },
  { icon: Hammer, label: 'Renovation' },
  { icon: Shield, label: 'Waterproofing' },
];

export function TrendingServicesBar() {
  return (
    <div className="trending-services-bar">
      <div className="trending-services-bar-container">
        <div className="trending-services-bar-title">
          <span className="scooter-icon">🛵</span>
          <strong>TRENDING SERVICES</strong>
        </div>
        <div className="trending-services-bar-items">
          {TRENDING_SERVICES_BAR.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.label} className="trending-bar-item">
                <Icon size={20} />
                <span>{service.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
