import { lazy, Suspense, useEffect, useState, type MouseEvent } from 'react';
import {
  BadgeCheck,
  CalendarDays,
  ChevronRight,
  Clock3,
  Droplets,
  Gift,
  Home,
  Image,
  IndianRupee,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  ShowerHead,
  Siren,
  Sparkles,
  Star,
  Tag,
  ThumbsUp,
  Timer,
  Wrench,
  X,
} from 'lucide-react';
import BookingModal from './BookingModal';
import { CORE_SERVICES, TRENDING_SERVICES, WHY_CHOOSE } from './data';
import { PHONE_DISPLAY, PHONE_NUMBER } from './types';
import { TapIcon, ShowerIcon, ToiletIcon, WashBasinIcon, KitchenSinkIcon, PipeLeakIcon, PipeInstallIcon, DrainIcon, WaterTankIcon, GeyserIcon, BathroomIcon, EmergencyIcon } from './PlumbingIcons';

const AdminPanel = lazy(() => import('./AdminPanel'));

const trustItems = [
  { label: '30 Min Doorstep Service', icon: Timer },
  { label: 'Verified & Experienced Plumbers', icon: ShieldCheck },
  { label: 'Upfront Pricing', icon: BadgeCheck },
  { label: 'No Hidden Charges', icon: Sparkles },
];

const serviceIcons = [TapIcon, ShowerIcon, ToiletIcon, WashBasinIcon, KitchenSinkIcon, PipeLeakIcon, PipeInstallIcon, DrainIcon, WaterTankIcon, GeyserIcon, BathroomIcon, EmergencyIcon];
const proofStats = [
  { title: '4.8', subtitle: 'Google Rating (1200+ Reviews)', icon: Star },
  { title: '10K+', subtitle: 'Happy Customers', icon: ThumbsUp },
  { title: 'Verified', subtitle: 'Professionals', icon: ShieldCheck },
  { title: '24/7', subtitle: 'Service Available', icon: Clock3 },
];

const processSteps = [
  { title: 'Book Online', text: 'Choose the plumbing problem and preferred time slot.', icon: CalendarDays },
  { title: 'Quick Call Back', text: 'Our desk confirms location, price range and technician.', icon: Phone },
  { title: 'Expert Visit', text: 'Verified plumber reaches with tools and required fittings.', icon: Wrench },
  { title: 'Warranty Support', text: 'Every completed repair includes clear after-service support.', icon: ShieldCheck },
];

const packageCards = [
  { title: 'Bathroom Repair Pack', price: 'From Rs. 499', text: 'Tap, shower, flush tank and drain inspection for one bathroom.' },
  { title: 'Kitchen Plumbing Pack', price: 'From Rs. 699', text: 'Sink line, bottle trap, leakage, waste pipe and mixer checkup.' },
  { title: 'Full Home Audit', price: 'From Rs. 999', text: 'Complete home inspection with visible leak and pressure testing.' },
];

const galleryImages = [
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=500&q=78',
  'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=500&q=78',
  'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=500&q=78',
  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=500&q=78',
];

export function App() {
  const [isAdmin, setIsAdmin] = useState(() => window.location.hash.startsWith('#/admin'));
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>();
  const [menuOpen, setMenuOpen] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [loading, setLoading] = useState(true);
  const [legalPage, setLegalPage] = useState<'privacy' | 'terms' | 'refund' | null>(null);

  useEffect(() => {
    const onHash = () => setIsAdmin(window.location.hash.startsWith('#/admin'));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700);
    return () => window.clearTimeout(timer);
  }, []);

  const openBooking = (service?: string) => {
    setPreselectedService(service);
    setMenuOpen(false);
    setBookingOpen(true);
  };

  const whatsappBooking = (service?: string) => {
    const text = encodeURIComponent(`Hi Narayan Plumbing Services, I want to book ${service || 'a plumbing service'}. Please call me back.`);
    window.open(`https://wa.me/91${PHONE_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handlePointerClick = (event: MouseEvent<HTMLDivElement>) => {
    const id = Date.now();
    setRipples((items) => [...items.slice(-5), { id, x: event.clientX, y: event.clientY }]);
    window.setTimeout(() => setRipples((items) => items.filter((item) => item.id !== id)), 650);
  };

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (isAdmin) {
    return (
      <Suspense fallback={<div className="admin-loading">Loading admin panel...</div>}>
        <AdminPanel />
      </Suspense>
    );
  }

  if (loading) {
    return (
      <div className="page-loader" role="status" aria-label="Loading Narayan Plumbing Services">
        <div className="loader-mark"><Wrench size={30} /><span>N</span></div>
        <strong>NARAYAN <em>PLUMBING SERVICES</em></strong>
        <div className="loader-line"><span /></div>
      </div>
    );
  }

  return (
    <div className="site-shell" onClick={handlePointerClick}>
      {ripples.map((item) => (
        <span key={item.id} className="click-ripple" style={{ left: item.x, top: item.y }} />
      ))}
      <header className="poster-header">
        <div className="micro-logo-row">
          <span className="micro-logo">NP</span>
          <span className="micro-logo pink">24/7</span>
        </div>
        <div className="trust-strip">
          {trustItems.map(({ label, icon: Icon }) => (
            <div className="trust-item" key={label}>
              <Icon size={18} />
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="brand-bar">
          <button 
            className="menu-button" 
            type="button" 
            onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }} 
            onTouchStart={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
            aria-label="Open menu"
          >
            {menuOpen ? <X size={26} /> : <Menu size={30} />}
          </button>
          <button className="brand-lockup" type="button" onClick={(e) => { e.stopPropagation(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <span className="plumber-avatar" style={{ fontSize: '1.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              👨‍🔧
            </span>
            <span>
              <strong>NARAYAN</strong>
              <b>PLUMBING SERVICES</b>
              <small>Expert Plumbers. On Time. Every Time.</small>
            </span>
          </button>
          <nav className="desktop-site-nav" aria-label="Primary navigation">
            <button type="button" onClick={() => scrollTo('services')}>Services</button>
            <button type="button" onClick={() => scrollTo('trending')}>Trending</button>
            <button type="button" onClick={() => scrollTo('packages')}>Packages</button>
            <button type="button" onClick={() => scrollTo('why-us')}>Why Us</button>
            <button type="button" onClick={() => scrollTo('reviews')}>Reviews</button>
            <button type="button" onClick={() => scrollTo('faqs')}>FAQs</button>
          </nav>
          <a className="call-block" href={`tel:${PHONE_NUMBER}`} onClick={(e) => e.stopPropagation()}>
            <Phone size={28} />
            <span>
              <small>Call Us Now</small>
              <strong>{PHONE_DISPLAY}</strong>
              <em>24/7 Emergency Service</em>
            </span>
          </a>
          <button className="book-top" type="button" onClick={(e) => { e.stopPropagation(); openBooking(); }}>
            <CalendarDays size={28} />
            <span>BOOK SERVICE<small>Schedule Online</small></span>
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-drop" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={(e) => { e.stopPropagation(); scrollTo('services'); }}>Services</button>
            <button type="button" onClick={(e) => { e.stopPropagation(); scrollTo('trending'); }}>Trending</button>
            <button type="button" onClick={(e) => { e.stopPropagation(); scrollTo('packages'); }}>Packages</button>
            <button type="button" onClick={(e) => { e.stopPropagation(); scrollTo('why-us'); }}>Why Choose</button>
            <button type="button" onClick={(e) => { e.stopPropagation(); scrollTo('reviews'); }}>Reviews</button>
            <button type="button" onClick={(e) => { e.stopPropagation(); scrollTo('faqs'); }}>FAQs</button>
            <a href={`tel:${PHONE_NUMBER}`} onClick={(e) => e.stopPropagation()}>Call Now</a>
          </nav>
        )}
      </header>

      <main>
        <section className="hero-poster" style={{ padding: 0, overflow: 'hidden', border: 'none', background: 'transparent' }}>
          <div style={{ width: '100%', position: 'relative', display: 'block' }}>
            <img 
              src="/narayan-hero-art.png" 
              alt="Narayan Plumbing Services complete hero design" 
              style={{ width: '100%', height: 'auto', display: 'block' }} 
            />
            {/* Absolute clickable overlay hotspots matching poster coordinates */}
            {/* Header Call Hotspot (Middle area on logo bar) */}
            <a 
              href={`tel:${PHONE_NUMBER}`}
              onClick={(e) => e.stopPropagation()}
              style={{ position: 'absolute', top: '1%', left: '50%', width: '20%', height: '8%', display: 'block', cursor: 'pointer', zIndex: 10 }}
              aria-label="Call Narayan Plumbing Services"
            />
            {/* Header Book Service Hotspot (Right area on logo bar) */}
            <button 
              type="button"
              onClick={(e) => { e.stopPropagation(); openBooking(); }}
              style={{ position: 'absolute', top: '1%', left: '72%', width: '20%', height: '8%', display: 'block', border: 'none', background: 'transparent', cursor: 'pointer', zIndex: 10 }}
              aria-label="Book service"
            />
            {/* Hero Main Orange Book Now Button Hotspot */}
            <button 
              type="button"
              onClick={(e) => { e.stopPropagation(); openBooking(); }}
              style={{ position: 'absolute', top: '78%', left: '5%', width: '18%', height: '10%', display: 'block', border: 'none', background: 'transparent', cursor: 'pointer', zIndex: 10 }}
              aria-label="Book Now"
            />
            {/* Hero Main Transparent Call Now Button Hotspot */}
            <a 
              href={`tel:${PHONE_NUMBER}`}
              onClick={(e) => e.stopPropagation()}
              style={{ position: 'absolute', top: '78%', left: '25%', width: '16%', height: '10%', display: 'block', cursor: 'pointer', zIndex: 10 }}
              aria-label="Call Now"
            />
          </div>
        </section>

        <section className="intro-panel">
          <div>
            <span className="section-kicker">Professional plumbing service</span>
            <h2>Fast home repairs with a clean service experience</h2>
            <p>Narayan Plumbing Services handles emergency leaks, bathroom fittings, geyser installation, kitchen sink issues, tank work, drainage cleaning and full renovation plumbing with clear pricing before work starts.</p>
          </div>
          <div className="intro-metrics">
            <strong>30 min<span>Rapid response</span></strong>
            <strong>24/7<span>Emergency desk</span></strong>
            <strong>30 days<span>Service warranty</span></strong>
          </div>
        </section>

        <section className="proof-bar">
          {proofStats.map(({ title, subtitle, icon: Icon }, index) => (
            <div key={subtitle}>
              {index === 0 ? <img className="google-logo" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" /> : <Icon size={34} />}
              <strong>{title}</strong>
              <span>{subtitle}</span>
            </div>
          ))}
        </section>

        <section className="process-panel">
          <span className="section-kicker">How it works</span>
          <h2>Simple booking, professional visit, clean finish</h2>
          <div className="process-grid">
            {processSteps.map(({ title, text, icon: Icon }, index) => (
              <div key={title} className="process-card">
                <b>{String(index + 1).padStart(2, '0')}</b>
                <Icon size={34} />
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="services-panel" id="services">
          <h2>OUR SERVICES</h2>
          <div className="service-grid">
            {CORE_SERVICES.map((service, index) => {
              const Icon = serviceIcons[index] || Wrench;
              return (
                <button className="service-card" type="button" key={service.id} onClick={() => openBooking(service.name)}>
                  <span className="icon-disc"><Icon size={76} /></span>
                  <strong>{service.name.replace('Installation & Repair', 'Installation & Repair')}</strong>
                  <em>BOOK NOW</em>
                </button>
              );
            })}
          </div>
          <button className="view-all" type="button" onClick={() => openBooking()}>VIEW ALL SERVICES <ChevronRight size={18} /></button>
        </section>

        <section className="lower-poster" id="trending" aria-label="Trending services and booking call to action">
          <img src="/narayan-lower-art.png" alt="Trending plumbing services and booking call to action" />
          <button className="lower-hotspot lower-services" type="button" onClick={() => scrollTo('services')} aria-label="View all services" />
          {TRENDING_SERVICES.map((item, index) => (
            <button
              key={item.title}
              className={`lower-hotspot lower-trend lower-trend-${index + 1}`}
              type="button"
              onClick={() => openBooking(item.title)}
              aria-label={`Book ${item.title}`}
            />
          ))}
          <a className="lower-hotspot lower-call" href={`tel:${PHONE_NUMBER}`} aria-label="Call Narayan Plumbing Services" />
          <button className="lower-hotspot lower-book" type="button" onClick={() => openBooking()} aria-label="Book service" />
        </section>

        <section className="trending-panel" id="trending">
          <h2>TRENDING SERVICES</h2>
          <div className="trend-strip">
            {TRENDING_SERVICES.map((item) => (
              <button className="trend-card" type="button" key={item.title} onClick={() => openBooking(item.title)}>
                <img src={item.image} alt={item.title} />
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="packages-panel" id="packages">
          <span className="section-kicker">Value packages</span>
          <h2>Popular service bundles for homes and businesses</h2>
          <div className="package-grid">
            {packageCards.map((item) => (
              <button key={item.title} type="button" onClick={() => openBooking(item.title)}>
                <strong>{item.title}</strong>
                <em>{item.price}</em>
                <span>{item.text}</span>
                <b>BOOK PACKAGE</b>
              </button>
            ))}
          </div>
        </section>

        <section className="cta-band">
          <div>
            <h2>COMPLETE PLUMBING SOLUTIONS FOR YOUR <span>HOME & BUSINESS</span></h2>
            <div className="mini-points">
              <span><BadgeCheck /> Skilled Team</span>
              <span><Wrench /> Genuine Parts</span>
              <span><IndianRupee /> Upfront Pricing</span>
              <span><Clock3 /> On Time Service</span>
              <span><ShieldCheck /> 30 Days Warranty</span>
            </div>
          </div>
          <div className="worker-figure">
            <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=520&q=85" alt="Professional plumbing service technician" />
            <span className="worker-badge"><Wrench size={22} /><strong>N</strong></span>
          </div>
          <div className="cta-actions">
            <a href={`tel:${PHONE_NUMBER}`}><Phone size={30} /><span>CALL NOW<strong>{PHONE_DISPLAY}</strong><small>We Are Just One Call Away!</small></span></a>
            <button type="button" onClick={() => whatsappBooking()}><CalendarDays size={34} /><span>BOOK SERVICE NOW<small>Schedule Your Service Instant Confirmation</small></span></button>
          </div>
        </section>

        <section className="reviews-panel" id="reviews">
          <span className="section-kicker">Customer reviews</span>
          <h2>Trusted by local homes and businesses</h2>
          <div className="google-review-summary">
            <img className="google-logo" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
            <div><strong>4.8 <span>★★★★★</span></strong><small>Google Rating · 1200+ Reviews</small></div>
            <a href="https://maps.app.goo.gl/HRGVvm5RDNo7Vs448" target="_blank" rel="noreferrer">View Google reviews</a>
          </div>
          <div className="review-grid">
            {[
              ['Ramesh K.', 'Very fast response and clean tap repair work. Pricing was told before starting.'],
              ['Priya S.', 'Geyser fitting was done neatly with a proper safety check and no mess left behind.'],
              ['Anil M.', 'Kitchen sink leakage fixed quickly. The plumber came with proper tools and parts.'],
              ['Meena R.', 'The team arrived on time, explained the repair clearly and left the bathroom spotless.'],
            ].map(([name, text]) => (
              <article key={name}>
                <div><Star size={16} fill="#ffc400" /><Star size={16} fill="#ffc400" /><Star size={16} fill="#ffc400" /><Star size={16} fill="#ffc400" /><Star size={16} fill="#ffc400" /></div>
                <p>{text}</p>
                <strong>{name}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="why-panel" id="why-us">
          <h2>WHY CHOOSE <span>NARAYAN</span> PLUMBING SERVICES?</h2>
          <div className="why-grid">
            {WHY_CHOOSE.map((item, index) => {
              const icons = [Timer, ShieldCheck, IndianRupee, Gift, BadgeCheck, Tag];
              const Icon = icons[index] || BadgeCheck;
              return (
                <div key={item.title}>
                  <Icon size={42} />
                  <strong>{item.title}</strong>
                </div>
              );
            })}
          </div>
        </section>

        <section className="gallery-panel" id="gallery">
          <div>
            <span className="section-kicker">Work quality</span>
            <h2>Bathroom, kitchen, pipe and drain work handled end to end</h2>
          </div>
          <div className="gallery-grid">
            {galleryImages.map((src, index) => (
              <img key={src} src={src} alt={`Narayan Plumbing work sample ${index + 1}`} />
            ))}
          </div>
        </section>

        <section className="final-booking">
          <h2>Need a plumber today?</h2>
          <p>Book now for leak repair, tap fitting, toilet repair, geyser installation, drain cleaning or complete plumbing service.</p>
          <div>
            <button type="button" onClick={() => whatsappBooking()}>BOOK SERVICE NOW</button>
            <a href={`tel:${PHONE_NUMBER}`}>CALL {PHONE_DISPLAY}</a>
          </div>
        </section>

        <footer className="site-footer">
          <div>
            <strong>NARAYAN <span>PLUMBING SERVICES</span></strong>
            <p>30-minute doorstep plumbing support for homes, apartments, shops and offices.</p>
          </div>
          <div>
            <b>Services</b>
            <button type="button" onClick={() => scrollTo('services')}>Tap, toilet, shower and basin repair</button>
            <button type="button" onClick={() => scrollTo('trending')}>Renovation, waterproofing and drain cleaning</button>
          </div>
          <div>
            <b>Contact</b>
            <a href={`tel:${PHONE_NUMBER}`}>{PHONE_DISPLAY}</a>
            <a className="map-link" href="https://maps.app.goo.gl/HRGVvm5RDNo7Vs448" target="_blank" rel="noreferrer">Open in Google Maps</a>
            <button type="button" onClick={() => whatsappBooking()}>Book emergency service</button>
          </div>
          <div className="legal-links">
            <b>Company</b>
            <button type="button" onClick={() => setLegalPage('privacy')}>Privacy Policy</button>
            <button type="button" onClick={() => setLegalPage('terms')}>Terms & Conditions</button>
            <button type="button" onClick={() => setLegalPage('refund')}>Refund & Cancellation</button>
          </div>
        </footer>
      </main>

      {legalPage && (
        <div className="legal-overlay" role="dialog" aria-modal="true" aria-label="Company policy">
          <article className="legal-dialog">
            <button className="legal-close" type="button" onClick={() => setLegalPage(null)} aria-label="Close policy">×</button>
            <span className="section-kicker">Narayan Plumbing Services</span>
            <h2>{legalPage === 'privacy' ? 'Privacy Policy' : legalPage === 'terms' ? 'Terms & Conditions' : 'Refund & Cancellation'}</h2>
            {legalPage === 'privacy' && <p>We collect only the name, phone number, address, service, date and time needed to arrange your plumbing visit. Booking details are used for service coordination and are shared with the assigned technician when required. We do not sell customer information.</p>}
            {legalPage === 'terms' && <p>Service availability, arrival time and pricing may vary by location and job complexity. Any estimate is confirmed before work begins. Customers must provide safe access to the service location and accurate booking details.</p>}
            {legalPage === 'refund' && <p>To reschedule or cancel, contact us before the technician is dispatched. Any inspection, emergency visit or completed work may be chargeable. Refund decisions are confirmed by the service desk based on the job status.</p>}
          </article>
        </div>
      )}

      <nav className="bottom-nav" aria-label="Mobile navigation" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={(e) => { e.stopPropagation(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><Home size={22} /><span>Home</span></button>
        <button type="button" onClick={(e) => { e.stopPropagation(); scrollTo('services'); }}><Wrench size={22} /><span>Services</span></button>
        <button type="button" onClick={(e) => { e.stopPropagation(); scrollTo('packages'); }}><Tag size={22} /><span>Packages</span></button>
        <button className="book-float" type="button" onClick={(e) => { e.stopPropagation(); openBooking(); }}><CalendarDays size={28} /><span>BOOK NOW</span></button>
        <button type="button" onClick={(e) => { e.stopPropagation(); scrollTo('trending'); }}><Gift size={22} /><span>Offers</span></button>
        <button type="button" onClick={(e) => { e.stopPropagation(); scrollTo('gallery'); }}><Image size={22} /><span>Gallery</span></button>
        <a href={`tel:${PHONE_NUMBER}`} onClick={(e) => e.stopPropagation()}><Phone size={22} /><span>Contact</span></a>
      </nav>

      <a className="whatsapp" href={`https://wa.me/91${PHONE_NUMBER}?text=${encodeURIComponent('Hi Narayan Plumbing Services, I need plumbing service.')}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">
        <MessageCircle size={30} />
      </a>

      <BookingModal open={bookingOpen} preselectedService={preselectedService} onClose={() => setBookingOpen(false)} />
    </div>
  );
}

export default App;
