import {
  CalendarDays,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Timer,
  Wrench,
} from 'lucide-react';
import { PHONE_DISPLAY, PHONE_NUMBER } from '../types';

interface SiteFooterProps {
  onScrollTo: (id: string) => void;
  onBook: () => void;
  onLegal: (page: 'privacy' | 'terms' | 'refund') => void;
}

export function SiteFooter({ onScrollTo, onBook, onLegal }: SiteFooterProps) {
  const waLink = `https://wa.me/91${PHONE_NUMBER}?text=${encodeURIComponent('Hi Narayan Plumbing Services, I need plumbing service.')}`;

  return (
    <footer className="site-footer-pro">
      <div className="footer-cta-band">
        <div className="footer-cta-inner">
          <div>
            <span className="footer-cta-kicker">Need a plumber now?</span>
            <strong>We reach your doorstep in 30 minutes</strong>
            <p>Book online or call — upfront pricing, verified plumbers, 30-day warranty.</p>
          </div>
          <div className="footer-cta-buttons">
            <button type="button" className="footer-btn-book" onClick={onBook}>
              <CalendarDays size={20} />
              Book Service
            </button>
            <a className="footer-btn-call" href={`tel:${PHONE_NUMBER}`}>
              <Phone size={20} />
              {PHONE_DISPLAY}
            </a>
            <a className="footer-btn-wa" href={waLink} target="_blank" rel="noreferrer">
              <MessageCircle size={20} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-brand-col">
          <div className="footer-brand-lockup">
            <span className="footer-avatar" aria-hidden="true">👨‍🔧</span>
            <div>
              <strong>NARAYAN</strong>
              <b>PLUMBING SERVICES</b>
            </div>
          </div>
          <p>
            Expert plumbers for homes, apartments, shops and offices across Bengaluru.
            On-time service, transparent pricing, and quality work every time.
          </p>
          <div className="footer-trust-pills">
            <span><Timer size={14} /> 30 Min Service</span>
            <span><ShieldCheck size={14} /> Verified Plumbers</span>
            <span><Wrench size={14} /> 30-Day Warranty</span>
          </div>
        </div>

        <div className="footer-links-col">
          <b>Quick Links</b>
          <button type="button" onClick={() => onScrollTo('services')}>Our Services</button>
          <button type="button" onClick={() => onScrollTo('trending')}>Trending Services</button>
          <button type="button" onClick={() => onScrollTo('why-us')}>Why Choose Us</button>
          <button type="button" onClick={() => onScrollTo('packages')}>Service Packages</button>
          <button type="button" onClick={() => onScrollTo('reviews')}>Customer Reviews</button>
        </div>

        <div className="footer-links-col">
          <b>Popular Services</b>
          <button type="button" onClick={() => onScrollTo('services')}>Tap &amp; Mixer Repair</button>
          <button type="button" onClick={() => onScrollTo('services')}>Toilet &amp; WC Repair</button>
          <button type="button" onClick={() => onScrollTo('services')}>Drain Cleaning</button>
          <button type="button" onClick={() => onScrollTo('trending')}>Geyser Installation</button>
          <button type="button" onClick={() => onScrollTo('trending')}>Water Tank Cleaning</button>
        </div>

        <div className="footer-contact-col">
          <b>Contact Us</b>
          <a href={`tel:${PHONE_NUMBER}`} className="footer-phone">{PHONE_DISPLAY}</a>
          <a href={waLink} target="_blank" rel="noreferrer" className="footer-wa-link">Chat on WhatsApp</a>
          <span className="footer-email">narayanplumbingservices@gmail.com</span>
          <a
            className="footer-map"
            href="https://maps.app.goo.gl/HRGVvm5RDNo7Vs448"
            target="_blank"
            rel="noreferrer"
          >
            <MapPin size={16} />
            Bengaluru, Karnataka — All areas
          </a>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <span>© {new Date().getFullYear()} Narayan Plumbing Services. All rights reserved.</span>
        <div className="footer-legal">
          <button type="button" onClick={() => onLegal('privacy')}>Privacy</button>
          <button type="button" onClick={() => onLegal('terms')}>Terms</button>
          <button type="button" onClick={() => onLegal('refund')}>Refund Policy</button>
        </div>
      </div>
    </footer>
  );
}
