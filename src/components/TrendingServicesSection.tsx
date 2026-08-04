import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Flame, Sparkles } from 'lucide-react';

const TRENDING_SLIDES = [
  {
    id: 'bathroom-renovation',
    src: '/trending/trending-1.png',
    alt: 'Bathroom Renovation & Sanitaryware Plumbing',
    badge: '🚽 Bathroom Renovation',
    title: 'Complete Bathroom Makeover & Plumbing',
    desc: 'Modern fittings, tiles, and fixtures installation',
  },
  {
    id: 'kitchen-sink',
    src: '/trending/trending-2.png',
    alt: 'Kitchen Sink Installation & Repair Services',
    badge: '🥣 Kitchen Sink Services',
    title: 'Kitchen Sink Installation & Repair',
    desc: 'Professional sink fitting and drainage solutions',
  },
  {
    id: 'tank-installation',
    src: '/tank.webp',
    alt: 'Water Tank Installation & Cleaning Service',
    badge: '🛢️ Water Tank Service',
    title: 'Overhead Tank Installation & Cleaning',
    desc: 'Expert tank fitting and maintenance services',
  },
  {
    id: 'geyser-service',
    src: '/geyser-trending.png',
    alt: 'Geyser Installation & Repair Service',
    badge: '🔥 Geyser Service',
    title: 'Geyser Installation & Repair',
    desc: 'Professional water heater service for all brands',
  },
];

export function TrendingServicesSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % TRENDING_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused]);

  const goTo = (index: number) => {
    setActive(index);
    setPaused(true);
    setTimeout(() => setPaused(false), 10000);
  };

  const slide = TRENDING_SLIDES[active];

  return (
    <section className="trending-section" id="trending">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 20, padding: '0 16px' }}>
        <span className="trending-kicker">
          <Flame size={14} /> Most In Demand
        </span>
        <h2 className="trending-title">TRENDING SERVICES</h2>
        <p className="trending-sub">Explore our most requested plumbing solutions in Bengaluru</p>
      </div>

      {/* Carousel */}
      <div className="trending-carousel-box">
        <div className="trending-carousel-track">
          {TRENDING_SLIDES.map((s, index) => (
            <div
              key={s.id}
              className={`trending-carousel-slide ${index === active ? 'active' : ''}`}
              aria-hidden={index !== active}
            >
              <img 
                src={s.src} 
                alt={s.alt} 
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>

        {/* Badge top-right */}
        <span className="trending-badge-overlay">
          <Sparkles size={12} /> {slide.badge}
        </span>

        {/* Title bottom overlay */}
        <div className="trending-title-overlay">
          <h3>{slide.title}</h3>
        </div>

        {/* Arrow buttons */}
        <button
          className="trending-nav-arrow trending-nav-prev"
          onClick={() => goTo(active === 0 ? TRENDING_SLIDES.length - 1 : active - 1)}
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          className="trending-nav-arrow trending-nav-next"
          onClick={() => goTo((active + 1) % TRENDING_SLIDES.length)}
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots */}
        <div className="trending-nav-dots">
          {TRENDING_SLIDES.map((_, index) => (
            <button
              key={index}
              className={index === active ? 'active' : ''}
              onClick={() => goTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
