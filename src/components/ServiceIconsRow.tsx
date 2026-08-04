import { TapIcon, ShowerIcon, ToiletIcon, WashBasinIcon, KitchenSinkIcon, PipeLeakIcon, PipeInstallIcon, DrainIcon } from '../PlumbingIcons';

interface ServiceCategory {
  id: string;
  name: string;
  icon: React.ComponentType<{ size: number }>;
  label: string;
}

interface ServiceIconsRowProps {
  onServiceClick: (serviceName: string) => void;
}

const SERVICE_CATEGORIES: ServiceCategory[] = [
  { id: 'bathroom', name: 'Bathroom Plumbing', icon: TapIcon, label: 'Bathroom Plumbing' },
  { id: 'kitchen', name: 'Kitchen Plumbing', icon: KitchenSinkIcon, label: 'Kitchen Plumbing' },
  { id: 'leak', name: 'Leak Repair', icon: PipeLeakIcon, label: 'Leak Repair' },
  { id: 'pipe-inst', name: 'Pipe Installation', icon: PipeInstallIcon, label: 'Pipe Installation' },
  { id: 'drain', name: 'Drain Cleaning', icon: DrainIcon, label: 'Drain Cleaning' },
  { id: 'toilet', name: 'Toilet Repair', icon: ToiletIcon, label: 'Toilet Repair' },
  { id: 'geyser', name: 'Water Heater Repair', icon: ShowerIcon, label: 'Water Heater Repair' },
  { id: 'maintenance', name: 'Maintenance & Repair', icon: WashBasinIcon, label: 'Maintenance & Repair' },
];

export function ServiceIconsRow({ onServiceClick }: ServiceIconsRowProps) {
  return (
    <section className="service-icons-row">
      <div className="service-icons-container">
        {SERVICE_CATEGORIES.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              className="service-icon-item"
              onClick={() => onServiceClick(category.name)}
              type="button"
            >
              <div className="service-icon-circle">
                <Icon size={40} />
              </div>
              <span className="service-icon-label">{category.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
