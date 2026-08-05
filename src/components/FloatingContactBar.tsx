import { Phone, MessageCircle } from 'lucide-react';
import { PHONE_NUMBER } from '../types';

export function FloatingContactBar() {
  const waLink = `https://wa.me/91${PHONE_NUMBER}?text=${encodeURIComponent('Hi Narayan Plumbing Services, I need plumbing service.')}`;

  return (
    <section className="floating-contact-bar" aria-label="Contact us">
      <div className="floating-contact-pill">
        <a href={`tel:${PHONE_NUMBER}`} className="contact-pill-side contact-pill-call">
          <span className="contact-pill-icon">
            <Phone size={20} />
          </span>
          <span className="contact-pill-text">
            <strong>Call Us Now</strong>
            <small>Speak to our expert</small>
          </span>
        </a>
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="contact-pill-side contact-pill-whatsapp"
        >
          <span className="contact-pill-icon">
            <MessageCircle size={20} />
          </span>
          <span className="contact-pill-text">
            <strong>Chat on WhatsApp</strong>
            <small>Quick response</small>
          </span>
        </a>
      </div>
    </section>
  );
}
