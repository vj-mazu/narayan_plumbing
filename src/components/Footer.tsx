import { Phone, Mail, MapPin, Clock, Wrench, Droplets, Flame, Sparkles, ChevronRight, ShieldCheck, Heart } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_NUMBER } from '../types';

interface FooterProps {
  onScrollTo: (id: string) => void;
  onBook: (service?: string) => void;
  onLegal: (page: 'privacy' | 'terms' | 'refund') => void;
}

const FOOTER_SERVICES = [
  { name: 'Plumbing Services', icon: Wrench, serviceKey: 'Plumbing Services' },
  { name: 'Tap & Mixer Repair', icon: Droplets, serviceKey: 'Tap Installation & Repair' },
  { name: 'Toilet & WC Repair', icon: ShieldCheck, serviceKey: 'Toilet & WC Repair' },
  { name: 'Geyser Installation', icon: Flame, serviceKey: 'Geyser Installation & Repair' },
  { name: 'Leak Detection', icon: Sparkles, serviceKey: 'Pipe Leakage Detection' },
  { name: 'Drain Cleaning', icon: Wrench, serviceKey: 'Drain Cleaning & Unclogging' },
];

export function Footer({ onScrollTo, onBook, onLegal }: FooterProps) {
  const waLink = `https://wa.me/91${PHONE_NUMBER}?text=${encodeURIComponent('Hi Narayan Plumbing Services, I need plumbing service.')}`;

  return (
    <>
      {/* Premium CTA Banner */}
      <div className="footer-cta-banner">
        <div className="footer-cta-content">
          <div className="footer-cta-text">
            <h2>Fast &amp; Reliable Doorstep Service</h2>
            <p>Certified master plumbers at your doorstep in 30 minutes across Bengaluru</p>
          </div>
          <button 
            type="button" 
            className="footer-cta-button" 
            onClick={() => {
              onScrollTo('book-visit');
              onBook('Free Site Visit');
            }}
          >
            FREE SITE VISIT
          </button>
        </div>
      </div>

      {/* Main Professional Footer */}
      <footer className="new-site-footer">
        <div className="footer-content">
          {/* Brand & About Column */}
          <div className="footer-column footer-brand-col">
            <div className="footer-brand-header">
              <div className="footer-logo-icon">
                <Wrench size={22} color="#FFFFFF" />
              </div>
              <div>
                <h3 className="footer-brand-title">NARAYAN <span>PLUMBING</span></h3>
                <span className="footer-brand-sub">Expert Plumbers. On Time. Every Time.</span>
              </div>
            </div>
            <p className="footer-brand-desc">
              Bengaluru's premier residential &amp; commercial plumbing experts. We deliver upfront 
              pricing, verified technicians, genuine spare parts, and an unconditional 30-day warranty.
            </p>
            <div className="footer-live-badge">
              <span className="live-dot" />
              <span>24/7 Emergency Service Active</span>
            </div>
          </div>

          {/* Contact Info Column */}
          <div className="footer-column">
            <h3 className="footer-heading">CONTACT INFO</h3>
            <div className="footer-contact-items">
              <a href={`tel:${PHONE_NUMBER}`} className="footer-contact-item">
                <div className="footer-icon-box"><Phone size={16} /></div>
                <span>{PHONE_DISPLAY}</span>
              </a>
              <a href="mailto:narayanplumbingservices@gmail.com" className="footer-contact-item">
                <div className="footer-icon-box"><Mail size={16} /></div>
                <span>narayanplumbingservices@gmail.com</span>
              </a>
              <a 
                href="https://maps.app.goo.gl/HRGVvm5RDNo7Vs448" 
                target="_blank" 
                rel="noreferrer"
                className="footer-contact-item"
              >
                <div className="footer-icon-box"><MapPin size={16} /></div>
                <span>Bengaluru, Karnataka — All areas</span>
              </a>
              <div className="footer-contact-item">
                <div className="footer-icon-box"><Clock size={16} /></div>
                <span>24/7 Emergency Response</span>
              </div>
            </div>
          </div>

          {/* Our Services Column */}
          <div className="footer-column">
            <h3 className="footer-heading">OUR SERVICES</h3>
            <ul className="footer-services-list">
              {FOOTER_SERVICES.map((item) => {
                const IconComponent = item.icon;
                return (
                  <li key={item.name}>
                    <button 
                      type="button" 
                      onClick={() => onBook(item.serviceKey)}
                      className="footer-service-btn"
                    >
                      <span className="footer-svc-icon-badge">
                        <IconComponent size={14} />
                      </span>
                      <span>{item.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="footer-column">
            <h3 className="footer-heading">QUICK LINKS</h3>
            <ul className="footer-links">
              <li>
                <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <ChevronRight size={14} className="link-arrow" /> Home
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onScrollTo('why-us')}>
                  <ChevronRight size={14} className="link-arrow" /> About Us
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onScrollTo('services')}>
                  <ChevronRight size={14} className="link-arrow" /> Services
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onScrollTo('packages')}>
                  <ChevronRight size={14} className="link-arrow" /> Packages
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onScrollTo('reviews')}>
                  <ChevronRight size={14} className="link-arrow" /> Reviews
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onBook()}>
                  <ChevronRight size={14} className="link-arrow" /> Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Support Bar */}
        <div className="footer-social">
          <div className="footer-social-header">
            <h4>Connect With Us</h4>
            <div className="footer-divider-line" />
          </div>
          <div className="footer-social-icons">
            <a 
              href="https://www.instagram.com/narayanplumbingservices" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Instagram" 
              className="social-instagram"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a 
              href="https://www.facebook.com/narayanplumbingservices" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Facebook" 
              className="social-facebook"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a 
              href={waLink} 
              target="_blank" 
              rel="noreferrer" 
              aria-label="WhatsApp" 
              className="social-whatsapp"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <a 
              href={`tel:${PHONE_NUMBER}`} 
              aria-label="Call Now" 
              className="social-call"
            >
              <Phone size={20} />
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Narayan Plumbing Services. All rights reserved.</span>
          <div className="footer-legal-links">
            <button type="button" onClick={() => onLegal('privacy')}>Privacy Policy</button>
            <span className="legal-dot">•</span>
            <button type="button" onClick={() => onLegal('terms')}>Terms &amp; Conditions</button>
            <span className="legal-dot">•</span>
            <button type="button" onClick={() => onLegal('refund')}>Refund Policy</button>
          </div>
        </div>
      </footer>
    </>
  );
}
