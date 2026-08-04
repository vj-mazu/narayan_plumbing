import { Star } from 'lucide-react';

interface Testimonial {
  id: string;
  customerName: string;
  location: string;
  reviewText: string;
  rating: number;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const validTestimonials = testimonials.filter(
    (t) =>
      t.customerName &&
      t.customerName.length <= 50 &&
      t.location &&
      t.location.length <= 100 &&
      t.reviewText &&
      t.reviewText.length >= 10 &&
      t.reviewText.length <= 500 &&
      t.rating >= 1 &&
      t.rating <= 5
  );

  if (validTestimonials.length === 0) {
    return (
      <section className="testimonials-section">
        <div className="section-header-center">
          <h2>WHAT CUSTOMERS SAY</h2>
        </div>
        <div className="testimonials-empty">
          <p>No reviews available at this time</p>
        </div>
      </section>
    );
  }

  // Duplicate for seamless 360 infinite forward marquee rotation
  const marqueeList = [...validTestimonials, ...validTestimonials, ...validTestimonials];

  return (
    <section className="testimonials-section" id="reviews">
      <div className="section-heading">
        <span className="section-line" aria-hidden="true" />
        <h2>WHAT CUSTOMERS SAY</h2>
        <span className="section-line" aria-hidden="true" />
      </div>
      <p className="section-subtitle">Trusted by thousands of happy customers across Bengaluru.</p>
      
      <div className="testimonials-marquee-wrapper" style={{ overflow: 'hidden', width: '100%' }}>
        <div className="testimonials-scroll">
          {marqueeList.map((testimonial, index) => (
            <div key={`${testimonial.id}-${index}`} className="testimonial-card">
              <div className="testimonial-stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < testimonial.rating ? 'star-filled' : 'star-empty'}
                    fill={i < testimonial.rating ? '#ffc400' : 'none'}
                  />
                ))}
              </div>
              <p className="testimonial-text">{testimonial.reviewText}</p>
              <div className="testimonial-author">
                <strong>{testimonial.customerName}</strong>
                <span>{testimonial.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
