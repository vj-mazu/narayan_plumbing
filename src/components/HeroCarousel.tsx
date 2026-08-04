import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Phone } from 'lucide-react';
import { PHONE_NUMBER } from '../types';

interface HeroCarouselProps {
  images: Array<{ src: string; alt: string }>;
  onBookNow?: () => void;
  autoRotateInterval?: number;
}

export function HeroCarousel({ images, onBookNow, autoRotateInterval = 5000 }: HeroCarouselProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || images.length <= 1) return;
    const timer = setInterval(() => setActive((p) => (p + 1) % images.length), autoRotateInterval);
    return () => clearInterval(timer);
  }, [images.length, autoRotateInterval, paused]);

  const goTo = (index: number) => {
    setActive(index);
    setPaused(true);
    setTimeout(() => setPaused(false), 10000);
  };

  return (
    <section className="hero-fullscreen" aria-label="Narayan Plumbing Services">
      <div className="hero-fullscreen-track">
        {images.map((image, index) => (
          <div
            key={image.src}
            className={`hero-fullscreen-slide ${index === active ? 'active' : ''}`}
            aria-hidden={index !== active}
          >
            <img src={image.src} alt={image.alt} loading={index === 0 ? 'eager' : 'lazy'} />
          </div>
        ))}
      </div>

      <div className="hero-fullscreen-overlay" aria-hidden="true" />

      <div className="hero-fullscreen-controls">
        <button type="button" className="hero-fs-arrow prev" onClick={() => goTo(active === 0 ? images.length - 1 : active - 1)} aria-label="Previous slide">
          <ChevronLeft size={28} />
        </button>
        <button type="button" className="hero-fs-arrow next" onClick={() => goTo((active + 1) % images.length)} aria-label="Next slide">
          <ChevronRight size={28} />
        </button>
      </div>

      <div className="hero-fullscreen-bottom">
        <div className="hero-fs-dots" role="tablist" aria-label="Hero slides">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === active}
              className={index === active ? 'active' : ''}
              onClick={() => goTo(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="hero-fs-actions">
          <button type="button" className="hero-fs-book" onClick={onBookNow}>
            BOOK NOW — Free Estimate
          </button>
          <a className="hero-fs-call" href={`tel:${PHONE_NUMBER}`}>
            <Phone size={18} />
            Call Now
          </a>
        </div>
      </div>
    </section>
  );
}
