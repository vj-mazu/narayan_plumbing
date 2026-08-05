import { useState, type FormEvent } from 'react';
import { Phone } from 'lucide-react';
import { PHONE_NUMBER } from '../types';
import { CORE_SERVICES } from '../data';

interface HeroBookingSectionProps {
  onOpenBooking?: (service?: string) => void;
}

export function HeroBookingSection({ onOpenBooking }: HeroBookingSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('Bangalore');
  const [service, setService] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      onOpenBooking?.('Site Inspection');
      return;
    }
    const message = [
      'Hi Narayan Plumbing Services, I want to book a Site Inspection.',
      '',
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      service ? `Service: ${service}` : '',
      area.trim() ? `Area/Locality: ${area.trim()}` : '',
      `City: ${city}`,
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
    <section className="hero-booking-section" aria-label="Book plumbing service" id="book-visit">
      <div className="hero-booking-section-header">
        <h2 className="hero-booking-main-heading">Schedule Your Site Inspection</h2>
        <p className="hero-booking-main-subtitle">Expert plumbing consultation at your doorstep</p>
      </div>
      <div className="hero-booking-grid-form-only">
        <form className="hero-booking-form" onSubmit={handleSubmit} noValidate>
          <h2>BOOK SITE VISIT</h2>
          <p className="hero-form-sub">
            Get a thorough Site Inspection and Colour Consultation from Our Experts
          </p>
          
          <div className="hero-input-group">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>

          <div className="hero-input-group">
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              inputMode="numeric"
              autoComplete="tel"
              minLength={10}
              maxLength={10}
            />
          </div>

          <div className="hero-input-group">
            <select 
              value={service} 
              onChange={(e) => setService(e.target.value)}
            >
              <option value="">Select Service</option>
              {CORE_SERVICES.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="hero-input-group">
            <input
              type="text"
              placeholder="Area / Locality (e.g. Indiranagar, HSR Layout)"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
          </div>

          <div className="hero-input-group">
            <select 
              value={city} 
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="Bangalore">Bangalore</option>
            </select>
          </div>

          <button type="submit" className="hero-form-submit">
            BOOK SITE INSPECTION
          </button>
          
          <button type="button" className="hero-form-call" onClick={handleCallNow}>
            <Phone size={20} />
            CALL NOW FOR INSTANT SERVICE
          </button>
        </form>
      </div>
    </section>
  );
}
