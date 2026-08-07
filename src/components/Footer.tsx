import { Phone, Mail, MapPin, Clock, ChevronRight, ShieldCheck, Award, CheckCircle } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_NUMBER } from '../types';

interface FooterProps {
  onScrollTo: (id: string) => void;
  onBook: (service?: string) => void;
  onLegal: (page: 'privacy' | 'terms' | 'refund') => void;
}

const FOOTER_SERVICES = [
  { name: 'Plumbing Services', serviceKey: 'Plumbing Services' },
  { name: 'Civil Work', serviceKey: 'Civil Work' },
  { name: 'Bathroom Renovation', serviceKey: 'Bathroom Renovation' },
  { name: 'Cleaning Services', serviceKey: 'Cleaning Services' },
  { name: 'Painting Services', serviceKey: 'Painting Services' },
  { name: 'Tiles & Granite Works', serviceKey: 'Tiles & Granite Works' },
  { name: 'Electrical Work', serviceKey: 'Electrical Work' },
  { name: 'False Ceiling Work', serviceKey: 'False Ceiling Work' },
  { name: 'Construction Work', serviceKey: 'Construction Work' },
  { name: 'Interior Design', serviceKey: 'Interior Design' },
  { name: 'Home Renovation', serviceKey: 'Home Renovation' },
  { name: 'Carpenter Work', serviceKey: 'Carpenter Work' },
  { name: 'Home Maintenance', serviceKey: 'Home Maintenance' },
];

const SERVICE_AREAS = [
  'Whitefield',
  'Electronic City',
  'HSR Layout',
  'Koramangala',
  'Marathahalli',
  'Indiranagar',
  'JP Nagar',
  'Yelahanka',
  'Hebbal',
  'Manyata Tech Park',
  'RT Nagar',
];

export function Footer({ onScrollTo, onBook, onLegal }: FooterProps) {
  return (
    <footer className="footer-layout">
      {/* Top 5-Column Navigation Grid */}
      <div className="footer-top-grid">
        {/* Column 1: Contact Information */}
        <div className="footer-nav-col">
          <h3 className="footer-nav-title">CONTACT INFORMATION</h3>
          <div className="footer-contact-list">
            <a href={`tel:${PHONE_NUMBER}`} className="footer-contact-link">
              <div className="contact-icon-box orange">
                <Phone size={16} />
              </div>
              <div className="contact-text-box">
                <strong>{PHONE_DISPLAY}</strong>
                <span>Call or WhatsApp</span>
              </div>
            </a>

            <a href="mailto:narayanplumbingservices@gmail.com" className="footer-contact-link">
              <div className="contact-icon-box orange">
                <Mail size={16} />
              </div>
              <div className="contact-text-box">
                <span>narayanplumbingservices@gmail.com</span>
                <span>Drop us an email</span>
              </div>
            </a>

            <div className="footer-contact-link">
              <div className="contact-icon-box orange">
                <MapPin size={16} />
              </div>
              <div className="contact-text-box">
                <strong>Bengaluru, Karnataka</strong>
                <span>Serving All Areas</span>
              </div>
            </div>

            <div className="footer-contact-link">
              <div className="contact-icon-box orange">
                <Clock size={16} />
              </div>
              <div className="contact-text-box">
                <strong>24x7 Emergency Support</strong>
                <span>Mon - Sun : Open 24 Hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Our Services */}
        <div className="footer-nav-col">
          <h3 className="footer-nav-title">OUR SERVICES</h3>
          <ul className="footer-list-links">
            {FOOTER_SERVICES.map((s) => (
              <li key={s.name}>
                <button type="button" onClick={() => onBook(s.serviceKey)}>
                  <ChevronRight size={14} /> {s.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Quick Links */}
        <div className="footer-nav-col">
          <h3 className="footer-nav-title">QUICK LINKS</h3>
          <ul className="footer-list-links">
            <li>
              <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <ChevronRight size={14} /> Home
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onScrollTo('why-us')}>
                <ChevronRight size={14} /> About Us
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onScrollTo('services')}>
                <ChevronRight size={14} /> Services
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onScrollTo('gallery')}>
                <ChevronRight size={14} /> Gallery
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onScrollTo('blog')}>
                <ChevronRight size={14} /> Blog
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onBook()}>
                <ChevronRight size={14} /> Book Service
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onScrollTo('reviews')}>
                <ChevronRight size={14} /> Contact Us
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onLegal('privacy')}>
                <ChevronRight size={14} /> Privacy Policy
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onLegal('terms')}>
                <ChevronRight size={14} /> Terms & Conditions
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Why Choose Us */}
        <div className="footer-nav-col">
          <h3 className="footer-nav-title">WHY CHOOSE US?</h3>
          <ul className="footer-choose-list">
            <li>
              <Award size={16} />
              <span>10+ Years of Experience</span>
            </li>
            <li>
              <CheckCircle size={16} />
              <span>1000+ Happy Customers</span>
            </li>
            <li>
              <ShieldCheck size={16} />
              <span>Verified & Skilled Professionals</span>
            </li>
            <li>
              <CheckCircle size={16} />
              <span>Transparent Pricing</span>
            </li>
            <li>
              <Award size={16} />
              <span>Premium Quality Materials</span>
            </li>
            <li>
              <Clock size={16} />
              <span>On-Time Project Delivery</span>
            </li>
            <li>
              <CheckCircle size={16} />
              <span>24x7 Customer Support</span>
            </li>
            <li>
              <ShieldCheck size={16} />
              <span>100% Satisfaction Guarantee</span>
            </li>
          </ul>
        </div>

        {/* Column 5: Service Areas */}
        <div className="footer-nav-col">
          <h3 className="footer-nav-title">SERVICE AREAS</h3>
          <div className="footer-areas-box">
            <div className="areas-header">
              <MapPin size={18} />
              <div>
                <strong>We Serve All Areas in</strong>
                <span>Bangalore</span>
              </div>
            </div>
            <ul className="areas-list">
              {SERVICE_AREAS.map((area) => (
                <li key={area}>
                  <CheckCircle size={12} /> {area}
                </li>
              ))}
              <li>
                <CheckCircle size={12} /> And Many More...
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Middle Brand Block */}
      <div className="footer-middle-block">
        <div className="footer-brand-info">
          <div className="footer-brand-header">
            <img src="/logo.webp" width={900} height={451} alt="Narayan Plumbing Services Logo" className="footer-brand-logo-img" loading="lazy" decoding="async" onError={(e) => {
              e.currentTarget.style.display = 'none';
              const textFallback = e.currentTarget.nextElementSibling as HTMLElement;
              if (textFallback) textFallback.style.display = 'block';
            }} />
            <div className="footer-logo-text-fallback" style={{ display: 'none' }}>
              <h2>NARAYAN</h2>
              <span>PLUMBING SERVICES</span>
            </div>
            <p className="footer-brand-tagline">COMPLETE HOME IMPROVEMENT SOLUTIONS</p>
          </div>
        </div>

        <div className="footer-brand-divider" />

        <div className="footer-brand-description">
          <p>
            Narayan Plumbing Services is a trusted and professional home improvement company in <span className="highlight-orange">Bangalore</span>, specialized in <span className="highlight-white">Plumbing, Civil Work, Bathroom Renovation, Cleaning, Painting, Tiles & Granite Work, Electrical Work, False Ceiling Work, Construction Work, Interior Design, Home Renovation, Carpenter Work</span> & <span className="highlight-white">Home Maintenance</span>. We deliver quality workmanship, premium materials, transparent pricing and on-time completion with 100% customer satisfaction.
          </p>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom-bar">
        {/* Trust Badges */}
        <div className="footer-bottom-badges">
          <div className="bottom-badge-item">
            <ShieldCheck size={16} />
            <span>LICENSED & INSURED<br /><small>100% Safe & Secure Work</small></span>
          </div>
          <div className="bottom-badge-item">
            <Award size={16} />
            <span>EXPERT TEAM<br /><small>Skilled & Verified Professionals</small></span>
          </div>
          <div className="bottom-badge-item">
            <CheckCircle size={16} />
            <span>QUALITY MATERIALS<br /><small>Branded & Long Lasting</small></span>
          </div>
          <div className="bottom-badge-item">
            <Clock size={16} />
            <span>ON-TIME DELIVERY<br /><small>We Value Your Time</small></span>
          </div>
          <div className="bottom-badge-item">
            <ShieldCheck size={16} />
            <span>AFTER SERVICE SUPPORT<br /><small>Always Here for You</small></span>
          </div>
        </div>

        <div className="footer-last-row">
          <div className="footer-copyright">
            <ShieldCheck size={14} />
            <span>Your Satisfaction is Our Priority</span>
            <span className="copyright-text">© {new Date().getFullYear()} Narayan Plumbing Services. All Rights Reserved.<br /><small>Best Plumbing & Bathroom Renovation Company in Bangalore</small></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
