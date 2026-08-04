import { Star, ThumbsUp, ShieldCheck, Clock3 } from 'lucide-react';

interface Stat {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size: number }>;
}

const STATS: Stat[] = [
  { title: '4.8', subtitle: 'Google Rating (1200+ Reviews)', icon: Star },
  { title: '10K+', subtitle: 'Happy Customers', icon: ThumbsUp },
  { title: 'Verified', subtitle: 'Professionals', icon: ShieldCheck },
  { title: '24/7', subtitle: 'Service Available', icon: Clock3 },
];

export function StatsBar() {
  return (
    <section className="stats-bar">
      <div className="stats-container">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.subtitle} className="stat-item">
              <Icon size={34} />
              <div className="stat-content">
                <strong className="stat-title">{stat.title}</strong>
                <span className="stat-subtitle">{stat.subtitle}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
