import React, { useState, useEffect } from 'react';
import { ShieldCheck, Clock, MessageSquare, Star, Home, Paintbrush, Bath, Wrench, ChevronLeft, ChevronRight, Sparkles, Building, Layers } from 'lucide-react';
import { PHONE_NUMBER } from '../types';

interface HeroSlide {
  id: string;
  badgeTag: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  subFeatures: string;
  description: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  servicesList: Array<{ icon: React.ComponentType<any>; title: string }>;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'bathroom',
    badgeTag: '12 Days Completion',
    titlePrefix: 'Bathroom',
    titleHighlight: 'Renovation',
    titleSuffix: 'Experts',
    subFeatures: 'Luxury Design • Premium Materials • On-Time Delivery',
    description: 'Complete bathroom makeover with premium tiles, modern fixtures & luxury designs.',
    image: '/hero-bathroom.webp',
    imageWidth: 900,
    imageHeight: 1350,
    imageAlt: 'Bathroom Renovation Experts - Narayan Services',
    servicesList: [
      { icon: Bath, title: 'Bathroom Renovation' },
      { icon: Layers, title: 'Tiles & Installation' },
      { icon: Wrench, title: 'Plumbing Solutions' },
      { icon: Home, title: 'Vanity & Fittings' },
      { icon: Sparkles, title: 'Glass Partition' },
    ],
  },
  {
    id: 'painting',
    badgeTag: '12 Days Completion',
    titlePrefix: 'Painting',
    titleHighlight: 'Services',
    titleSuffix: 'Experts',
    subFeatures: 'Beautiful Colours • Premium Paints • On-Time Delivery',
    description: 'Interior & exterior painting with top brands, smooth finish & wall texture treatments.',
    image: '/hero-painting.webp',
    imageWidth: 900,
    imageHeight: 1599,
    imageAlt: 'Painting Services Experts - Narayan Painting',
    servicesList: [
      { icon: Paintbrush, title: 'Interior Painting' },
      { icon: Building, title: 'Exterior Painting' },
      { icon: Sparkles, title: 'Texture Painting' },
      { icon: Layers, title: 'Wall Putty' },
      { icon: ShieldCheck, title: 'Waterproof Coating' },
    ],
  },
  {
    id: 'plumbing',
    badgeTag: '30 Mins Arrival',
    titlePrefix: 'Professional',
    titleHighlight: 'Plumbing',
    titleSuffix: 'Services',
    subFeatures: '24/7 Emergency • Certified Plumbers • Transparent Rates',
    description: 'Reliable plumbing solutions for your home & business. Pipe leaks, taps & drainage.',
    image: '/hero-plumbing.webp',
    imageWidth: 900,
    imageHeight: 1599,
    imageAlt: 'Professional Plumbing Services - Narayan Plumbing',
    servicesList: [
      { icon: Wrench, title: 'Leakage Repair' },
      { icon: Bath, title: 'Tap & Mixers' },
      { icon: Sparkles, title: 'Drainage Work' },
      { icon: Layers, title: 'Pipe Fitting' },
      { icon: ShieldCheck, title: 'Water Tank' },
    ],
  },
  {
    id: 'cleaning',
    badgeTag: 'Deep Clean Special',
    titlePrefix: 'Complete',
    titleHighlight: 'Home Cleaning',
    titleSuffix: 'Services',
    subFeatures: 'Eco Products • Sanitized Finish • Trained Staff',
    description: 'Spotless spaces and deep cleaning for living rooms, kitchens and full homes.',
    image: '/hero-cleaning.webp',
    imageWidth: 900,
    imageHeight: 1658,
    imageAlt: 'Complete Home Cleaning Services - Narayan Services',
    servicesList: [
      { icon: Sparkles, title: 'Deep Cleaning' },
      { icon: Bath, title: 'Bathroom Scrub' },
      { icon: Home, title: 'Kitchen Sanitizing' },
      { icon: Layers, title: 'Sofa Cleaning' },
      { icon: ShieldCheck, title: 'Disinfection' },
    ],
  },
  {
    id: 'interior',
    badgeTag: 'Modern Living',
    titlePrefix: 'Luxury',
    titleHighlight: 'Interior Design',
    titleSuffix: 'Works',
    subFeatures: 'Custom Woodwork • Ambient Lights • Full Execution',
    description: 'Premium interior spaces with custom furniture, false ceilings & architectural lighting.',
    image: '/hero-interior.webp',
    imageWidth: 900,
    imageHeight: 1352,
    imageAlt: 'Luxury Interior Design - Narayan Services',
    servicesList: [
      { icon: Home, title: 'Living Room' },
      { icon: Building, title: 'Woodwork' },
      { icon: Sparkles, title: 'Lighting' },
      { icon: Layers, title: 'False Ceiling' },
      { icon: ShieldCheck, title: 'Turnkey Work' },
    ],
  },
];

interface HeroCarouselProps {
  onBookNow?: () => void;
  autoRotateInterval?: number;
}

export function HeroCarousel({ onBookNow, autoRotateInterval = 7000 }: HeroCarouselProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((p) => (p + 1) % HERO_SLIDES.length);
    }, autoRotateInterval);
    return () => clearInterval(timer);
  }, [autoRotateInterval]);

  const goTo = (index: number) => {
    setActive(index);
  };

  const goPrev = () => {
    setActive((p) => (p === 0 ? HERO_SLIDES.length - 1 : p - 1));
  };

  const goNext = () => {
    setActive((p) => (p + 1) % HERO_SLIDES.length);
  };

  const slide = HERO_SLIDES[active];
  const waLink = `https://wa.me/91${PHONE_NUMBER}?text=${encodeURIComponent('Hi Narayan Services, I would like to get a quote.')}`;

  return (
    <section className="hero-banner-section">
      <div className="hero-banner-card">
        
        {/* Navigation Arrows */}
        <button className="hero-nav-arrow prev" onClick={goPrev} aria-label="Previous Slide">
          <ChevronLeft size={22} />
        </button>
        <button className="hero-nav-arrow next" onClick={goNext} aria-label="Next Slide">
          <ChevronRight size={22} />
        </button>

        <div className="hero-banner-grid">
          
          {/* Left Column: Text & Service Icons */}
          <div className="hero-text-container" key={slide.id}>
            
            {/* Top Tag Badge */}
            <div className="hero-top-badge">
              <Clock size={15} />
              <span>{slide.badgeTag}</span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-banner-headline">
              <span className="line-dark">{slide.titlePrefix}</span><br />
              <span className="line-orange">{slide.titleHighlight}</span><br />
              <span className="line-dark script-font">{slide.titleSuffix}</span>
            </h1>

            {/* Sub features bullet text */}
            <p className="hero-banner-subfeatures">
              {slide.subFeatures}
            </p>

            {/* Service Icons Row */}
            <div className="hero-services-icon-row">
              {slide.servicesList.map((svc) => {
                const IconComp = svc.icon;
                return (
                  <button key={svc.title} className="hero-service-icon-item" type="button" onClick={() => onBookNow?.()}>
                    <div className="hero-icon-box">
                      <IconComp size={22} />
                    </div>
                    <span>{svc.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Action CTAs */}
            <div className="hero-banner-cta-group">
              <button className="hero-btn-orange" onClick={() => onBookNow?.()}>
                <Sparkles size={18} />
                <span>GET FREE QUOTE</span>
              </button>
              <a href={waLink} target="_blank" rel="noreferrer" className="hero-btn-whatsapp-outline">
                <MessageSquare size={18} />
                <span>WHATSAPP US</span>
              </a>
            </div>

            {/* Bottom Floating Stats Box */}
            <div className="hero-bottom-ratings-card">
              <div className="rating-stat-box">
                <div className="orange-stat-circle">
                  <Star size={18} fill="#ffffff" color="#ffffff" />
                </div>
                <div className="stat-text">
                  <strong>4.9/5</strong>
                  <small>Google Rating</small>
                  <div className="stars-row">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} size={10} fill="#f97316" color="#f97316" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="rating-stat-divider" />

              <div className="rating-stat-box">
                <div className="orange-stat-circle">
                  <Home size={18} color="#ffffff" />
                </div>
                <div className="stat-text">
                  <strong>10,000+</strong>
                  <small>Projects Completed</small>
                </div>
              </div>

              <div className="rating-stat-divider" />

              <div className="rating-stat-box">
                <div className="orange-stat-circle">
                  <ShieldCheck size={18} color="#ffffff" />
                </div>
                <div className="stat-text">
                  <strong>12+</strong>
                  <small>Years Experience</small>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Image (Clean layout, non-overlapping) */}
          <div className="hero-image-container">
            {HERO_SLIDES.map((s, idx) => (
              <img
                key={s.id}
                src={s.image}
                width={s.imageWidth}
                height={s.imageHeight}
                alt={s.imageAlt}
                className={`hero-slide-img ${idx === active ? 'active' : ''}`}
                loading={idx === 0 ? 'eager' : 'lazy'}
                fetchPriority={idx === 0 ? 'high' : 'low'}
                decoding="async"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.includes('banner-')) return;
                  if (s.id === 'plumbing') target.src = '/hero/banner-2.webp';
                  else if (s.id === 'cleaning') target.src = '/hero/banner-3.webp';
                  else target.src = '/hero/banner-1.webp';
                }}
              />
            ))}
          </div>

        </div>

        {/* Carousel Indicators / Dots */}
        <div className="hero-carousel-indicators">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.id}
              className={`indicator-dot ${i === active ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
