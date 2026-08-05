import { useState, useEffect } from 'react';
import { Phone, ShieldCheck, Tag, Clock, MessageSquare, Star } from 'lucide-react';
import { PHONE_NUMBER } from '../types';

interface HeroCarouselProps {
  images: Array<{ src: string; alt: string }>;
  onBookNow?: () => void;
  autoRotateInterval?: number;
}

export function HeroCarousel({ images, onBookNow, autoRotateInterval = 5000 }: HeroCarouselProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => setActive((p) => (p + 1) % images.length), autoRotateInterval);
    return () => clearInterval(timer);
  }, [images.length, autoRotateInterval]);

  const waLink = `https://wa.me/91${PHONE_NUMBER}?text=${encodeURIComponent('Hi Narayan Plumbing Services, I want to book an expert plumber.')}`;

  return (
    <section className="hero-section-wrapper">
      <div className="hero-main-container">
        
        {/* Left Side — Text Content */}
        <div className="hero-content-col">
          <div className="hero-service-badge">
            <span className="live-dot" />
            <span>24/7 SERVICE AVAILABLE</span>
          </div>
          
          <h1 className="hero-headline">
            Expert Plumbers. <br />
            <span className="hero-subline-highlight">On Time. Every Time.</span>
          </h1>
          
          <p className="hero-description-text">
            Professional plumbing solutions for your home &amp; business. Fast, reliable &amp; affordable services.
          </p>
          
          {/* Trust icons — 3 in a row like reference */}
          <div className="hero-trust-badges">
            <div className="hero-trust-badge-item">
              <div className="hero-badge-icon-box"><ShieldCheck size={18} /></div>
              <span>Verified<br/>Experts</span>
            </div>
            <div className="hero-trust-badge-item">
              <div className="hero-badge-icon-box"><Tag size={18} /></div>
              <span>Upfront<br/>Pricing</span>
            </div>
            <div className="hero-trust-badge-item">
              <div className="hero-badge-icon-box"><Clock size={18} /></div>
              <span>On-Time<br/>Service</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hero-actions-container">
            <a href={`tel:${PHONE_NUMBER}`} className="hero-btn-call">
              <Phone size={18} />
              <span>Call Now</span>
            </a>
            <a href={waLink} target="_blank" rel="noreferrer" className="hero-btn-whatsapp">
              <MessageSquare size={18} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Right Side — Image with rating badge */}
        <div className="hero-graphic-col">
          <div className="hero-image-frame-container">
            <div className="hero-carousel-track-inner">
              {images.map((image, index) => (
                <div
                  key={image.src}
                  className={`hero-carousel-frame-slide ${index === active ? 'active' : ''}`}
                  aria-hidden={index !== active}
                >
                  <img src={image.src} alt={image.alt} loading={index === 0 ? 'eager' : 'lazy'} />
                </div>
              ))}
            </div>

            {/* Rating badge — small white card over image */}
            <div className="hero-rating-badge">
              <div className="hero-rating-star-icon">
                <Star size={10} fill="#fbbf24" color="#fbbf24" />
              </div>
              <div className="hero-rating-info">
                <strong>4.9/5</strong>
                <div className="hero-rating-stars">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={7} fill="#fbbf24" color="#fbbf24" />
                  ))}
                </div>
                <span>10,000+ Happy Customers</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
