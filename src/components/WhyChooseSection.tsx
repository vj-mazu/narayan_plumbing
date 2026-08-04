import { useState, useEffect } from 'react';
import { Timer, ShieldCheck, IndianRupee, Wrench, CalendarDays, Ban, ChevronLeft, ChevronRight } from 'lucide-react';

interface WhyChoose {
  title: string;
  subtitle: string;
  icon?: string;
}

interface WhyChooseImage {
  src: string;
  alt: string;
}

interface WhyChooseSectionProps {
  readonly benefits: WhyChoose[];
}

const WHY_CHOOSE_IMAGES: WhyChooseImage[] = [
  { src: '/whychoose/why-1.png', alt: 'Why choose Narayan Plumbing - Quality service' },
  { src: '/whychoose/why-2.png', alt: 'Why choose Narayan Plumbing - Expert team' },
];

const icons = [Timer, ShieldCheck, IndianRupee, Wrench, CalendarDays, Ban];

export function WhyChooseSection({ benefits }: WhyChooseSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % WHY_CHOOSE_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % WHY_CHOOSE_IMAGES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + WHY_CHOOSE_IMAGES.length) % WHY_CHOOSE_IMAGES.length);
  };

  return (
    <section className="why-choose-section" id="why-us">
      <div className="why-choose-container">
        <h2>WHY CHOOSE NARAYAN PLUMBING SERVICES?</h2>
        <div className="why-choose-grid">
          {benefits.slice(0, 6).map((benefit) => {
            const iconIndex = benefits.indexOf(benefit);
            const Icon = icons[iconIndex] || ShieldCheck;
            return (
              <div key={`${benefit.title}-${benefit.subtitle}`} className="why-choose-card">
                <Icon size={36} />
                <strong>{benefit.title}</strong>
                <span>{benefit.subtitle}</span>
              </div>
            );
          })}
        </div>

        <div className="why-choose-carousel">
          <div className="why-choose-carousel-track">
            {WHY_CHOOSE_IMAGES.map((image, index) => (
              <div
                key={`why-slide-${image.src}`}
                className={`why-choose-carousel-slide ${index === currentSlide ? 'active' : ''}`}
              >
                <img src={image.src} alt={image.alt} width={1536} height={1024} loading="lazy" />
              </div>
            ))}
          </div>

          <button
            type="button"
            className="why-carousel-arrow why-prev"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            className="why-carousel-arrow why-next"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          <div className="why-carousel-dots">
            {WHY_CHOOSE_IMAGES.map((image, index) => (
              <button
                key={`why-dot-${image.src}`}
                type="button"
                className={index === currentSlide ? 'active' : ''}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
