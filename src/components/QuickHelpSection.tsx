import { Droplets, Filter, Pipette, Flame, Wrench } from 'lucide-react';
import { PHONE_NUMBER } from '../types';

const QUICK_SERVICES = [
  { id: 'leak',    label: 'Leak Repair',     icon: <Droplets size={28} strokeWidth={1.5} /> },
  { id: 'drain',   label: 'Drain Cleaning',  icon: <Filter size={28} strokeWidth={1.5} /> },
  { id: 'pipe',    label: 'Pipe Repair',     icon: <Pipette size={28} strokeWidth={1.5} /> },
  { id: 'geyser',  label: 'Water Heater',    icon: <Flame size={28} strokeWidth={1.5} /> },
  { id: 'tap',     label: 'Tap Installation',icon: <Wrench size={28} strokeWidth={1.5} /> },
];

export function QuickHelpSection() {
  const openCall = (label: string) => {
    const msg = encodeURIComponent(`Hi Narayan Plumbing Services, I need help with: ${label}`);
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
            className="quick-help-card"
            onClick={() => openCall(s.label)}
            type="button"
            aria-label={`Get help with ${s.label}`}
          >
            <div className="quick-help-icon">{s.icon}</div>
            <span className="quick-help-label">{s.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
