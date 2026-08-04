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
          <h1>
            Your Trusted Plumbing Partner in Bengaluru
          </h1>
          <p>
            With over a decade of experience, Narayan Plumbing Services is the most trusted name 
            in residential and commercial plumbing across Bengaluru. We deliver exceptional service 
            quality using genuine parts from leading brands.
          </p>
          <ul className="hero-contact-list">
            <li>
              <span className="hero-contact-icon" aria-hidden="true">
                <Phone size={20} />
              </span>
              <span>
                <small>Call Now</small>
                <a href={`tel:${PHONE_NUMBER}`}>{PHONE_DISPLAY}</a>
              </span>
            </li>
            <li>
              <span className="hero-contact-icon" aria-hidden="true">
                <MapPin size={20} />
              </span>
              <span>Bengaluru, Karnataka — all areas covered</span>
            </li>
            <li>
              <span className="hero-contact-icon" aria-hidden="true">
                <Mail size={20} />
              </span>
              <span>narayanplumbingservices@gmail.com</span>
            </li>
          </ul>
        </div>

        <form className="hero-booking-form" onSubmit={handleSubmit} noValidate style={{ background: 'rgba(235, 237, 240, 0.95)', borderRadius: 24, padding: 30, border: '1px solid #dcdcdc', boxShadow: '0 12px 30px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#000', fontSize: '1.45rem', fontWeight: 800, textAlign: 'center', margin: '0 0 10px 0' }}>BOOK SITE VISIT</h2>
          <p className="hero-form-sub" style={{ color: '#4a4a4a', fontSize: '0.85rem', textAlign: 'center', marginBottom: 20, lineHeight: 1.4 }}>
            Get a thorough Site Inspection and Colour Consultation from Our Experts
          </p>
          
          <div style={{ marginBottom: 14 }}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '2px solid #ccc', fontSize: '0.95rem', outline: 'none', background: '#fff' }}
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              inputMode="numeric"
              autoComplete="tel"
              style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '2px solid #ccc', fontSize: '0.95rem', outline: 'none', background: '#fff' }}
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <input
              type="text"
              placeholder="Area / Locality (e.g. Indiranagar, HSR Layout)"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '2px solid #ccc', fontSize: '0.95rem', outline: 'none', background: '#fff' }}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <select 
              value={city} 
              onChange={(e) => setCity(e.target.value)}
              style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '2px solid #ccc', fontSize: '0.95rem', outline: 'none', background: '#fff', appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%23333\' d=\'M10.23 3.43L6 7.66L1.77 3.43L0.35 4.85L6 10.5L11.65 4.85z\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
            >
              <option value="Bangalore">Bangalore</option>
            </select>
          </div>

          <button type="submit" className="hero-form-submit" style={{ width: '100%', background: '#f05a4f', color: '#fff', border: 'none', padding: '14px', borderRadius: 12, fontSize: '1rem', fontWeight: 800, cursor: 'pointer', transition: 'background 0.2s', textTransform: 'uppercase' }}>
            BOOK SITE INSPECTION
          </button>
        </form>
      </div>
    </section>
  );
}
