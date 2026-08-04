import { useEffect, useState } from 'react';
import {
  BadgeCheck,
  CalendarDays,
  Home,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Timer,
  Wrench,
  X,
} from 'lucide-react';
import BookingModal from './BookingModal';
import {
  SERVICE_DISPLAY,
  WHY_CHOOSE_DISPLAY,
  WHY_CHOOSE_IMAGES,
  TESTIMONIALS,
  HERO_CAROUSEL_IMAGES,
  PACKAGES,
} from './data';
import { PHONE_DISPLAY, PHONE_NUMBER } from './types';
import { HeroCarousel } from './components/HeroCarousel';
import { HeroBookingSection } from './components/HeroBookingSection';
import { StatsBar } from './components/StatsBar';
import { TrendingServicesSection } from './components/TrendingServicesSection';
import { ServicesGrid } from './components/ServicesGrid';
import { WhyChooseSection } from './components/WhyChooseSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PackagesSection } from './components/PackagesSection';
import { BrandLogosSection } from './components/BrandLogosSection';
import { Footer } from './components/Footer';

const trustItems = [
  { label: '30 Min Doorstep Service', icon: Timer },
  { label: 'Verified & Experienced Plumbers', icon: ShieldCheck },
  { label: 'Upfront Pricing', icon: BadgeCheck },
  { label: 'No Hidden Charges', icon: Sparkles },
];

export function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [legalPage, setLegalPage] = useState<'privacy' | 'terms' | 'refund' | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 500);
    return () => window.clearTimeout(timer);
  }, []);

  const openBooking = (service?: string) => {
    setPreselectedService(service);
    setMenuOpen(false);
    setBookingOpen(true);
  };

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
    <div className="site-shell">
      <header className="site-header">
        <div className="trust-strip">
          <div className="trust-strip-scroll">
            {[...trustItems, ...trustItems].map(({ label, icon: Icon }, index) => (
              <div className="trust-item" key={`${label}-${index}`}>
                <Icon size={16} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="brand-bar">
          <button
            className="menu-button"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={26} />}
          </button>
          <button className="brand-lockup" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="plumber-avatar" aria-hidden="true">👨‍🔧</span>
            <span>
              <strong>NARAYAN</strong>
              <b>PLUMBING SERVICES</b>
              <small>Expert Plumbers. On Time. Every Time.</small>
            </span>
          </button>
          <nav className="desktop-site-nav" aria-label="Primary navigation">
            <button type="button" onClick={() => scrollTo('services')}>Services</button>
            <button type="button" onClick={() => scrollTo('packages')}>Packages</button>
            <button type="button" onClick={() => scrollTo('trending')}>Trending</button>
            <button type="button" onClick={() => scrollTo('why-us')}>Why Us</button>
            <button type="button" onClick={() => scrollTo('reviews')}>Reviews</button>
          </nav>
          <a className="call-block" href={`tel:${PHONE_NUMBER}`}>
            <Phone size={22} />
            <span>
              <small>Call Us Now</small>
              <strong>{PHONE_DISPLAY}</strong>
            </span>
          </a>
          <button className="book-top" type="button" onClick={() => openBooking()}>
            <CalendarDays size={22} />
            <span>BOOK SERVICE<small>Schedule Online</small></span>
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-drop">
            <button type="button" onClick={() => scrollTo('services')}>Services</button>
            <button type="button" onClick={() => scrollTo('packages')}>Packages</button>
            <button type="button" onClick={() => scrollTo('trending')}>Trending</button>
            <button type="button" onClick={() => scrollTo('why-us')}>Why Us</button>
            <button type="button" onClick={() => scrollTo('reviews')}>Reviews</button>
            <a href={`tel:${PHONE_NUMBER}`}>Call Now</a>
          </nav>
        )}
      </header>

      <main>
        <HeroCarousel images={HERO_CAROUSEL_IMAGES} onBookNow={() => openBooking()} />
        <ServicesGrid services={SERVICE_DISPLAY} onBookNow={openBooking} />
        <StatsBar />
        <TrendingServicesSection />
        <PackagesSection packages={PACKAGES} onSelectPackage={(name) => openBooking(name)} />
        <HeroBookingSection onOpenBooking={openBooking} />
        <WhyChooseSection benefits={WHY_CHOOSE_DISPLAY} />
        <BrandLogosSection />
        <TestimonialsSection testimonials={TESTIMONIALS} />

        <Footer onScrollTo={scrollTo} onBook={openBooking} onLegal={setLegalPage} />
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

      <nav className="bottom-nav" aria-label="Mobile navigation">
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><Home size={22} /><span>Home</span></button>
        <button type="button" onClick={() => scrollTo('services')}><Wrench size={22} /><span>Services</span></button>
        <button className="book-float" type="button" onClick={() => openBooking()}><CalendarDays size={26} /><span>BOOK</span></button>
        <a
          className="bottom-nav-whatsapp"
          href={`https://wa.me/91${PHONE_NUMBER}?text=${encodeURIComponent('Hi Narayan Plumbing Services, I need plumbing service.')}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={22} />
          <span>WhatsApp</span>
        </a>
        <a
          className="bottom-nav-call"
          href={`tel:${PHONE_NUMBER}`}
          aria-label="Call Now"
        >
          <Phone size={22} />
          <span>Call</span>
        </a>
      </nav>

      <BookingModal open={bookingOpen} preselectedService={preselectedService} onClose={() => setBookingOpen(false)} />
    </div>
  );
}

export default App;

