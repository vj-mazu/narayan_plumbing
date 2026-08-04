import { useState, type FormEvent } from 'react';
import { MessageCircle, MapPin, Mail, Phone } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_NUMBER } from '../types';

interface HeroBookingSectionProps {
  onOpenBooking?: (service?: string) => void;
}

export function HeroBookingSection({ onOpenBooking }: HeroBookingSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('Bangalore');
  const [timing, setTiming] = useState('');

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
      area.trim() ? `Area/Locality: ${area.trim()}` : '',
      `City: ${city}`,
      timing.trim() ? `Preferred Timing: ${timing.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const waUrl = `https://wa.me/91${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.location.href = waUrl;
  };

  return (
    <section className="hero-booking-section" aria-label="Book plumbing service" id="book-visit">
      <div className="hero-booking-grid">
        <div className="hero-booking-info">
          <h2>
            Your Trusted Plumbing Partner in Bengaluru
          </h2>
          <p>
            With over a decade of experience, Narayan Plumbing Services is the most trusted name 
            in residential and commercial plumbing across Bengaluru. We deliver exceptional service 
            quality using genuine parts from leading brands.
          </p>
          <ul className="hero-contact-list">
            <li>
              <span className="hero-contact-icon" aria-hidden="true">
                <Phone size={18} />
              </span>
              <span className="hero-contact-text">
                <small>Call Now</small>
                <a href={`tel:${PHONE_NUMBER}`}>{PHONE_DISPLAY}</a>
              </span>
            </li>
            <li>
              <span className="hero-contact-icon" aria-hidden="true">
                <MapPin size={18} />
              </span>
              <span className="hero-contact-text">Bengaluru, Karnataka — all areas covered</span>
            </li>
            <li>
              <span className="hero-contact-icon" aria-hidden="true">
                <Mail size={18} />
              </span>
              <span className="hero-contact-text">narayanplumbingservices@gmail.com</span>
            </li>
          </ul>
        </div>

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

          <div className="hero-input-group">
            <input
              type="text"
              placeholder="Preferred Timing (e.g. Morning 10 AM, Evening 5 PM)"
              value={timing}
              onChange={(e) => setTiming(e.target.value)}
            />
          </div>

          <button type="submit" className="hero-form-submit">
            BOOK SITE INSPECTION
          </button>
        </form>
      </div>
    </section>
  );
}
