import { useState, type FormEvent } from 'react';
import { Phone, CalendarCheck } from 'lucide-react';
import { PHONE_NUMBER } from '../types';

interface HeroBookingSectionProps {
  onOpenBooking?: (service?: string) => void;
}

export function HeroBookingSection({ onOpenBooking }: HeroBookingSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [locality, setLocality] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      onOpenBooking?.('Site Visit / Consultation');
      return;
    }
    const message = [
      'Hi Narayan Plumbing Services, I want to book a Site Visit.',
      '',
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      locality.trim() ? `Locality: ${locality.trim()}` : '',
      `City: Bangalore`,
    ]
      .filter(Boolean)
      .join('\n');

    const waUrl = `https://wa.me/91${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.location.href = waUrl;
  };

  const handleCallNow = () => {
    window.location.href = `tel:${PHONE_NUMBER}`;
  };

  return (
    <section className="hero-booking-section" aria-label="Book site visit" id="book-visit">
      <div className="hero-booking-section-header">
        <h2 className="hero-booking-main-heading">Book Site Visit</h2>
        <p className="hero-booking-main-subtitle">Expert consultation & fair quotation at your doorstep</p>
      </div>
      <div className="hero-booking-grid-form-only">
        <form className="hero-booking-form" onSubmit={handleSubmit} noValidate>
          <h2>BOOK SITE VISIT</h2>
          <p className="hero-form-sub">
            Fastest door-step plumbing inspections by top-rated professionals
          </p>
          
          <div className="hero-input-group">
            <input
              type="text"
              name="name"
              id="book-visit-name"
              placeholder="Your Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </div>

          <div className="hero-input-group">
            <input
              type="tel"
              name="phone"
              id="book-visit-phone"
              placeholder="Phone Number *"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              inputMode="numeric"
              autoComplete="tel"
              minLength={10}
              maxLength={10}
              required
            />
          </div>

          <div className="hero-input-group">
            <input
              type="text"
              name="locality"
              id="book-visit-locality"
              placeholder="Area / Locality (e.g. Indiranagar, HSR Layout) *"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="hero-form-submit">
            <CalendarCheck size={18} /> BOOK SITE VISIT
          </button>
          
          <button type="button" className="hero-form-call" onClick={handleCallNow}>
            <Phone size={18} /> CALL NOW FOR INSTANT BOOKING
          </button>
        </form>
      </div>
    </section>
  );
}
