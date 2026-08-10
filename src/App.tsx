import { lazy, Suspense, useEffect, useState } from 'react';
import {
  BadgeCheck,
  CalendarCheck,
  Home,
  LayoutGrid,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Timer,
  X,
} from 'lucide-react';
import { WhatsAppIcon } from './components/WhatsAppIcon';
const BookingModal = lazy(() => import('./BookingModal'));
import {
  CORE_SERVICES,
  TESTIMONIALS,
} from './data';
import { PHONE_DISPLAY, PHONE_NUMBER } from './types';
import { HeroCarousel } from './components/HeroCarousel';
import { HeroBookingSection } from './components/HeroBookingSection';
import { StatsBar } from './components/StatsBar';
import { TrendingServicesSection } from './components/TrendingServicesSection';
import { ServicesGrid } from './components/ServicesGrid';
import { HowItWorksSection } from './components/HowItWorksSection';
import { QuickHelpSection } from './components/QuickHelpSection';
import { WhyChooseBanner } from './components/WhyChooseBanner';
import { RecentlyCompletedProjects } from './components/RecentlyCompletedProjects';
import { FloatingContactBar } from './components/FloatingContactBar';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';

const trustItems = [
  { label: '90 Min Doorstep Service', icon: Timer },
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
    // Keep the splash extremely short so the LCP hero image renders ASAP.
    const timer = window.setTimeout(() => setLoading(false), 200);
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

  // Give customers a tactile “vibration” buzz when they tap the call button,
  // then the tel: link opens the dialer so they connect right away.
  const callWithVibration = () => {
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      navigator.vibrate(80);
    }
  };

  if (loading) {
    return (
      <div className="page-loader" role="status" aria-label="Loading Narayan Plumbing Services">
        <img src="/logo-emblem-new-144.webp" srcSet="/logo-emblem-new-144.webp 144w, /logo-emblem-new-192.webp 192w" sizes="96px" width={96} height={96} className="loader-logo-img" alt="Narayan Plumbing Services Logo" loading="eager" decoding="async" onError={(e) => {
          const el = e.target as HTMLImageElement;
          if (!el.src.endsWith('logo.webp')) {
            el.src = '/logo.webp';
          } else {
            el.style.display = 'none';
          }
        }} />
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
            <img src="/logo-emblem-new-144.webp" srcSet="/logo-emblem-new-144.webp 144w, /logo-emblem-new-192.webp 192w" sizes="64px" width={96} height={96} className="brand-logo-img" alt="Narayan Plumbing Services Logo" loading="eager" decoding="async" onError={(e) => {
              const el = e.target as HTMLImageElement;
              // Try the full logo if the emblem is missing
              if (!el.src.endsWith('logo.webp')) {
                el.src = '/logo.webp';
              } else {
                el.style.display = 'none';
              }
            }} />
            <span className="brand-logo-text">
              <strong>NARAYAN</strong>
              <b>PLUMBING SERVICES</b>
            </span>
          </button>
          <nav className="desktop-site-nav" aria-label="Primary navigation">
            <button type="button" onClick={() => scrollTo('services')}>Services</button>
            <button type="button" onClick={() => scrollTo('trending')}>Trending</button>
            <button type="button" onClick={() => scrollTo('reviews')}>Reviews</button>
          </nav>
          <a className="call-block" href={`tel:${PHONE_NUMBER}`} onClick={callWithVibration} aria-label="Call Now">
            <span className="call-block-phone"><Phone size={20} /></span>
            <span className="call-block-text">
              <small>Call Now</small>
              <strong>{PHONE_DISPLAY}</strong>
            </span>
          </a>
          <button className="book-top" type="button" onClick={() => openBooking()}>
            <CalendarCheck size={18} />
            <span>Book Now</span>
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-drop">
            <button type="button" onClick={() => scrollTo('services')}>Services</button>
            <button type="button" onClick={() => scrollTo('trending')}>Trending</button>
            <button type="button" onClick={() => scrollTo('reviews')}>Reviews</button>
            <a href={`tel:${PHONE_NUMBER}`}>Call Now</a>
          </nav>
        )}
      </header>

      <main>
        <HeroCarousel onBookNow={() => openBooking()} />
        <QuickHelpSection />
        <ServicesGrid services={CORE_SERVICES} onBookNow={openBooking} />
        <HowItWorksSection />
        <StatsBar />
        <TrendingServicesSection />
        <WhyChooseBanner />
        <HeroBookingSection onOpenBooking={openBooking} />
        <RecentlyCompletedProjects />
        <FloatingContactBar />
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
        <button type="button" className="bottom-nav-item" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Home size={22} /><span>Home</span>
        </button>
        <button type="button" className="bottom-nav-item" onClick={() => scrollTo('services')}>
          <LayoutGrid size={22} /><span>Services</span>
        </button>
        <a
          className="call-float"
          href={`tel:${PHONE_NUMBER}`}
          onClick={callWithVibration}
          aria-label="Call Now"
        >
          <Phone size={26} />
          <span>CALL</span>
        </a>
        <button
          type="button"
          className="bottom-nav-item"
          onClick={() => openBooking()}
          aria-label="Book Now"
        >
          <CalendarCheck size={22} /><span>Book</span>
        </button>
        <a
          className="bottom-nav-item whatsapp-nav-item"
          href={`https://wa.me/91${PHONE_NUMBER}?text=${encodeURIComponent('Hi Narayan Plumbing Services, I need plumbing service.')}`}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
        >
          <WhatsAppIcon size={22} /><span>WhatsApp</span>
        </a>
      </nav>

      <Suspense fallback={null}>
        {bookingOpen && (
          <BookingModal open={bookingOpen} preselectedService={preselectedService} onClose={() => setBookingOpen(false)} />
        )}
      </Suspense>
    </div>
  );
}

export default App;

