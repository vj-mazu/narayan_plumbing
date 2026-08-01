import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, Calendar, Star, CheckCircle, Wrench, MapPin, ChevronRight, Home, MessageSquare, Zap, MoreVertical,
} from 'lucide-react';
import BookingModal from './BookingModal';
import {
  QUICK_CATEGORIES, CORE_SERVICES, TRENDING_SERVICES, PACKAGES,
  WHY_CHOOSE, REVIEWS, FAQS, AREAS_SERVED,
} from './data';
import { PHONE_NUMBER, PHONE_DISPLAY } from './types';

const AdminPanel = lazy(() => import('./AdminPanel'));

const NAV_ITEMS = [
  { id: 'services', label: 'Services' },
  { id: 'trending', label: 'Trending' },
  { id: 'packages', label: 'Packages' },
  { id: 'why-us', label: 'Why Us' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'faqs', label: 'FAQs' },
];

export function App() {
  const [isAdmin, setIsAdmin] = useState(() => window.location.hash.startsWith('#/admin'));
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const reviewsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const reviewing = useRef(false);

  useEffect(() => {
    const onHash = () => setIsAdmin(window.location.hash.startsWith('#/admin'));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Close the mobile dropdown menu when the user taps anywhere outside the header.
  // (Not a scroll listener — scroll events on mobile fire after a tap and would
  // instantly close the menu when the page is scrolled down.)
  useEffect(() => {
    if (!menuOpen) return;
    const onClickOutside = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('pointerdown', onClickOutside);
    return () => document.removeEventListener('pointerdown', onClickOutside);
  }, [menuOpen]);

  // Auto horizontal carousel for reviews (pauses while user interacts)
  useEffect(() => {
    if (isAdmin) return;
    const container = reviewsRef.current;
    if (!container) return;
    let scrollAmount = 0;
    const step = 280;

    const interval = setInterval(() => {
      if (reviewing.current) return;
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        scrollAmount = 0;
      } else {
        scrollAmount += step;
      }
      container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }, 3000);

    return () => clearInterval(interval);
  }, [isAdmin]);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 72;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  const scrollHome = () => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openBooking = (serviceName?: string) => {
    setPreselectedService(serviceName);
    setMenuOpen(false);
    setBookingOpen(true);
  };

  if (isAdmin) {
    return (
      <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F5F7', color: '#757575', fontWeight: 700 }}>Loading admin panel…</div>}>
        <AdminPanel />
      </Suspense>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F5F5F7', color: '#101010', position: 'relative', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>

      {/* ======================= HEADER ======================= */}
      <header
        ref={headerRef}
        className="glass-header"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: 'rgba(255,255,255,0.94)',
          borderBottom: '1px solid #E5E7EB',
        }}
      >
        <div style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1200, margin: '0 auto', gap: 8 }}>
          {/* Brand */}
          <button type="button" onClick={scrollHome} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, minWidth: 0, padding: 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#101010', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Wrench size={17} />
            </div>
            <div style={{ minWidth: 0, textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '0.66rem', color: '#6E42E5', fontWeight: 800 }}>
                <MapPin size={11} color="#6E42E5" />
                <span>BANGALORE</span>
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 900, color: '#101010', lineHeight: 1.15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Narayan <span style={{ color: '#6E42E5' }}>Plumbing</span>
              </div>
            </div>
          </button>

          {/* Desktop nav links (hidden on mobile via CSS, shown >=901px) */}
          <nav className="desktop-nav" style={{ alignItems: 'center', gap: 4, flexWrap: 'wrap' }} aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                style={{
                  background: 'none', border: 'none', color: '#424242', fontWeight: 700, fontSize: '0.8rem',
                  cursor: 'pointer', padding: '8px 12px', borderRadius: 8,
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <a
              href={`tel:${PHONE_NUMBER}`}
              style={{
                backgroundColor: '#F3F4F6', color: '#101010', padding: '8px 12px', borderRadius: 18,
                textDecoration: 'none', fontWeight: 800, fontSize: '0.72rem',
                display: 'flex', alignItems: 'center', gap: 5,
              }}
            >
              <Phone size={13} color="#6E42E5" />
              <span className="call-label">Call</span>
              <span className="call-number" style={{ color: '#6E42E5', fontWeight: 900 }}>{PHONE_DISPLAY}</span>
            </a>

            <button
              type="button"
              onClick={() => openBooking()}
              className="header-book-btn"
              style={{
                backgroundColor: '#6E42E5', color: '#FFFFFF', border: 'none', padding: '8px 16px', borderRadius: 18,
                fontWeight: 900, fontSize: '0.78rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 5,
                boxShadow: '0 2px 10px rgba(110, 66, 229, 0.3)',
              }}
            >
              <Calendar size={13} /> <span className="book-now-label">Book Now</span>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="mobile-menu-btn"
              style={{
                backgroundColor: '#F3F4F6', border: 'none', color: '#101010', width: 36, height: 36, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}
            >
              <MoreVertical size={17} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ overflow: 'hidden', backgroundColor: '#FFFFFF', borderTop: '1px solid #E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
            >
              <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                {NAV_ITEMS.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    style={{ background: 'none', border: 'none', textAlign: 'left', color: '#101010', fontWeight: 800, fontSize: '0.88rem', cursor: 'pointer', padding: '10px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    {item.label} <ChevronRight size={14} color="#9E9E9E" />
                  </button>
                ))}
                <a
                  href="https://maps.app.goo.gl/HRGVvm5RDNo7Vs448"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  style={{ color: '#00D4FF', textDecoration: 'none', fontWeight: 800, fontSize: '0.88rem', padding: '10px 4px', display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <MapPin size={15} /> Google Maps Location
                </a>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  style={{
                    backgroundColor: '#FF5A1F', color: '#FFFFFF', textDecoration: 'none', textAlign: 'center',
                    padding: '12px 0', borderRadius: 10, fontWeight: 900, fontSize: '0.85rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 6,
                  }}
                >
                  <Phone size={16} /> CALL NOW ({PHONE_DISPLAY})
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ======================= HERO ======================= */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '16px 14px 20px', borderBottom: '1px solid #E0E0E0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ background: 'linear-gradient(135deg, #101010 0%, #1A1A1A 100%)', color: '#FFFFFF', borderRadius: 18, padding: '22px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, boxShadow: '0 8px 20px rgba(0,0,0,0.12)' }}>
            <div style={{ minWidth: 0 }}>
              <span style={{ backgroundColor: '#FF5A1F', color: '#FFFFFF', fontSize: '0.65rem', fontWeight: 900, padding: '3px 8px', borderRadius: 10, letterSpacing: '0.5px', display: 'inline-block' }}>
                EXPRESS 30-MIN DOORSTEP
              </span>
              <h1 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 900, marginTop: 8, lineHeight: 1.2, marginBottom: 0 }}>
                Expert Plumbers at <br />
                <span style={{ color: '#00D4FF' }}>Your Doorstep in 30 Mins</span>
              </h1>
              <p style={{ fontSize: '0.8rem', color: '#B0B0B0', marginTop: 6 }}>
                Verified Plumbers • 30-Day Warranty • Upfront Pricing
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
              <div style={{ width: 78, height: 78, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)', border: '3px solid #6E42E5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <Zap size={18} color="#FF5A1F" />
                <span style={{ fontSize: '1.05rem', fontWeight: 900, color: '#FFFFFF', lineHeight: 1 }}>30</span>
                <span style={{ fontSize: '0.5rem', fontWeight: 800, color: '#00D4FF' }}>MINS</span>
              </div>
              <button
                onClick={() => openBooking()}
                style={{ backgroundColor: '#FF5A1F', color: '#FFFFFF', border: 'none', padding: '13px 22px', borderRadius: 22, fontWeight: 900, fontSize: '0.85rem', cursor: 'pointer', boxShadow: '0 4px 14px rgba(255, 90, 31, 0.4)' }}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= QUICK CATEGORIES ======================= */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '20px 14px', borderBottom: '1px solid #E0E0E0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#101010', marginBottom: 14, marginTop: 0 }}>
            What are you looking for?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 10 }}>
            {QUICK_CATEGORIES.map((cat) => (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => openBooking(cat.name)}
                style={{
                  backgroundColor: '#F5F5F7', borderRadius: 14, padding: '14px 6px', textAlign: 'center',
                  cursor: 'pointer', border: '1px solid #EAEAEA', display: 'flex', flexDirection: 'column', alignItems: 'center',
                }}
              >
                <span style={{ width: 46, height: 46, borderRadius: 14, backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: 6, boxShadow: '0 3px 8px rgba(0,0,0,0.04)' }}>
                  {cat.icon}
                </span>
                <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#101010', lineHeight: 1.2 }}>{cat.name}</span>
                <span style={{ fontSize: '0.65rem', color: '#6E42E5', fontWeight: 800, marginTop: 3 }}>{cat.price}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ======================= CORE SERVICES ======================= */}
      <section id="services" style={{ maxWidth: 1200, margin: '26px auto', padding: '0 14px', scrollMarginTop: 72 }}>
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#101010', margin: 0 }}>Plumbing Repairs & Services (12 Core Services)</h2>
          <p style={{ fontSize: '0.78rem', color: '#757575' }}>100% guaranteed doorstep service by background-checked pros</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {CORE_SERVICES.map((srv) => (
            <div key={srv.id} style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: 14, border: '1px solid #E0E0E0', display: 'flex', justifyContent: 'space-between', gap: 12, boxShadow: '0 3px 10px rgba(0,0,0,0.03)' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#6E42E5', backgroundColor: '#F0EAFB', padding: '2px 6px', borderRadius: 6 }}>{srv.rating}</span>
                  <span style={{ fontSize: '0.68rem', color: '#757575' }}>Verified Service</span>
                </div>
                <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#101010', margin: '3px 0' }}>{srv.name}</h3>
                <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#101010', margin: '3px 0' }}>{srv.price}</div>
                <p style={{ fontSize: '0.75rem', color: '#757575', lineHeight: 1.35 }}>{srv.desc}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: 70, flexShrink: 0 }}>
                <span style={{ width: 52, height: 52, borderRadius: 12, backgroundColor: '#F5F5F7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem' }}>{srv.icon}</span>
                <button
                  onClick={() => openBooking(srv.name)}
                  style={{ width: '100%', backgroundColor: '#6E42E5', color: '#FFFFFF', border: 'none', borderRadius: 8, padding: '6px 0', fontWeight: 900, fontSize: '0.76rem', cursor: 'pointer' }}
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================= TRENDING ======================= */}
      <section id="trending" style={{ backgroundColor: '#FFFFFF', padding: '32px 14px', borderTop: '1px solid #E0E0E0', borderBottom: '1px solid #E0E0E0', scrollMarginTop: 72 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#101010', marginBottom: 2, marginTop: 0 }}>Trending Services & Renovation</h2>
          <p style={{ fontSize: '0.78rem', color: '#757575', marginBottom: 16 }}>Most booked home upgrades this month</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 14 }}>
            {TRENDING_SERVICES.map((t, idx) => (
              <div key={idx} style={{ backgroundColor: '#F5F5F7', borderRadius: 14, overflow: 'hidden', border: '1px solid #E0E0E0', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: 140, overflow: 'hidden' }}>
                  <img
                    src={t.image}
                    alt={t.title}
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={400}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <span style={{ position: 'absolute', top: 8, left: 8, backgroundColor: '#101010', color: '#FFFFFF', fontSize: '0.6rem', fontWeight: 800, padding: '3px 8px', borderRadius: 10 }}>
                    {t.tag}
                  </span>
                </div>
                <div style={{ padding: 12, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#101010', marginBottom: 3 }}>{t.title}</h3>
                    <p style={{ fontSize: '0.75rem', color: '#757575', lineHeight: 1.35 }}>{t.desc}</p>
                  </div>
                  <button
                    onClick={() => openBooking(t.title)}
                    style={{ marginTop: 12, backgroundColor: '#FFFFFF', border: '1px solid #101010', color: '#101010', padding: '6px 12px', borderRadius: 8, fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
                  >
                    Book Consultation <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================= PACKAGES ======================= */}
      <section id="packages" style={{ maxWidth: 1200, margin: '32px auto', padding: '0 14px', scrollMarginTop: 72 }}>
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#101010', margin: 0 }}>Plumbing Care Packages</h2>
          <p style={{ fontSize: '0.78rem', color: '#757575' }}>Save more with value bundles — every package includes a 30-day warranty</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {PACKAGES.map((pkg, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF', borderRadius: 20, padding: 22, border: pkg.popular ? '2px solid #101010' : '1px solid #E0E0E0',
                position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                boxShadow: pkg.popular ? '0 12px 30px rgba(0,0,0,0.12)' : '0 6px 18px rgba(0,0,0,0.05)',
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#101010', margin: 0 }}>{pkg.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '10px 0' }}>
                  <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#101010' }}>{pkg.price}</span>
                  <span style={{ fontSize: '0.85rem', color: '#757575', textDecoration: 'line-through' }}>{pkg.originalPrice}</span>
                  {pkg.popular && <span style={{ fontSize: '0.68rem', color: '#FF5A1F', fontWeight: 800 }}>MOST POPULAR</span>}
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '14px 0' }}>
                  {pkg.features.map((feat, fIdx) => (
                    <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: '#424242', marginBottom: 8 }}>
                      <CheckCircle size={14} color="#16A34A" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => openBooking(pkg.name)}
                style={{ width: '100%', backgroundColor: '#101010', color: '#FFFFFF', border: 'none', padding: '11px 0', borderRadius: 10, fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer', marginTop: 10 }}
              >
                Book Package
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ======================= WHY US ======================= */}
      <section id="why-us" style={{ backgroundColor: '#FFFFFF', padding: '32px 14px', borderTop: '1px solid #E0E0E0', scrollMarginTop: 72 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#101010', marginBottom: 16, marginTop: 0 }}>The Narayan Plumbing Guarantee</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            {WHY_CHOOSE.map((item, idx) => (
              <div key={idx} style={{ backgroundColor: '#F5F5F7', borderRadius: 14, padding: 14, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.6rem' }}>{item.icon}</span>
                <div>
                  <h3 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#101010', marginBottom: 2 }}>{item.title}</h3>
                  <p style={{ fontSize: '0.75rem', color: '#757575', lineHeight: 1.35 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================= AREAS SERVED (Local SEO) ======================= */}
      <section id="areas" style={{ maxWidth: 1200, margin: '32px auto', padding: '0 14px', scrollMarginTop: 72 }}>
        <div style={{ marginBottom: 14 }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#101010', margin: 0 }}>Areas We Serve in Bangalore</h2>
          <p style={{ fontSize: '0.78rem', color: '#757575' }}>30-minute response in these localities and nearby</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {AREAS_SERVED.map((area) => (
            <button
              key={area}
              onClick={() => openBooking()}
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: 20, padding: '8px 14px', fontSize: '0.8rem', fontWeight: 700, color: '#424242', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <MapPin size={13} color="#6E42E5" /> {area}
            </button>
          ))}
        </div>
      </section>

      {/* ======================= REVIEWS ======================= */}
      <section id="reviews" style={{ maxWidth: 1200, margin: '32px auto', padding: '0 14px', scrollMarginTop: 72 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#101010', margin: 0 }}>Customer Reviews</h2>
          <span style={{ fontSize: '0.75rem', color: '#6E42E5', fontWeight: 700 }}>Swipe →</span>
        </div>
        <div
          ref={reviewsRef}
          onPointerDown={() => { reviewing.current = true; }}
          onPointerUp={() => setTimeout(() => { reviewing.current = false; }, 4000)}
          onTouchStart={() => { reviewing.current = true; }}
          onTouchEnd={() => setTimeout(() => { reviewing.current = false; }, 4000)}
          className="no-scrollbar"
          style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 10, scrollSnapType: 'x mandatory' }}
        >
          {REVIEWS.map((rev, idx) => (
            <div key={idx} style={{ minWidth: 260, maxWidth: 280, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, border: '1px solid #E0E0E0', scrollSnapAlign: 'start', flexShrink: 0, boxShadow: '0 3px 10px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <div>
                  <h4 style={{ fontWeight: 800, color: '#101010', fontSize: '0.88rem', margin: 0 }}>{rev.name}</h4>
                  <span style={{ fontSize: '0.7rem', color: '#757575' }}>{rev.area}</span>
                </div>
                <span style={{ fontSize: '0.7rem', color: '#9E9E9E' }}>{rev.time}</span>
              </div>
              <div style={{ display: 'flex', color: '#FFB800', marginBottom: 6 }}>
                {[...Array(rev.rating)].map((_, i) => <Star key={i} size={12} fill="#FFB800" color="#FFB800" />)}
              </div>
              <p style={{ fontSize: '0.8rem', color: '#424242', lineHeight: 1.4, margin: 0 }}>"{rev.comment}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* ======================= FAQS ======================= */}
      <section id="faqs" style={{ backgroundColor: '#FFFFFF', padding: '32px 14px', borderTop: '1px solid #E0E0E0', scrollMarginTop: 72 }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#101010', marginBottom: 16, marginTop: 0 }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FAQS.map((faq, idx) => (
              <div key={idx} style={{ border: '1px solid #E0E0E0', borderRadius: 10, overflow: 'hidden' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  aria-expanded={openFaq === idx}
                  style={{ width: '100%', padding: '12px 14px', backgroundColor: '#F5F5F7', border: 'none', textAlign: 'left', fontWeight: 700, color: '#101010', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <span>{faq.q}</span>
                  <ChevronRight size={14} style={{ transform: openFaq === idx ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ padding: '12px 14px', fontSize: '0.8rem', color: '#616161', lineHeight: 1.45, backgroundColor: '#FFFFFF' }}>{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================= FOOTER ======================= */}
      <footer style={{ backgroundColor: '#101010', color: '#9E9E9E', padding: '32px 14px 96px', fontSize: '0.8rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
          <div>
            <h3 style={{ color: '#FFFFFF', fontWeight: 900, fontSize: '1.1rem', marginBottom: 10, marginTop: 0 }}>NARAYAN <span style={{ color: '#6E42E5' }}>PLUMBING</span></h3>
            <p style={{ lineHeight: 1.4 }}>
              Verified plumbing professionals. 30-minute rapid doorstep service across Bangalore.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#FFFFFF', fontWeight: 800, marginBottom: 10, marginTop: 0 }}>Contact Details</h4>
            <p style={{ margin: 0 }}>📞 <a href={`tel:${PHONE_NUMBER}`} style={{ color: '#00D4FF', textDecoration: 'none' }}><strong>{PHONE_DISPLAY}</strong></a></p>
            <p style={{ margin: '4px 0' }}>📍 Citywide Service Hub, Bangalore</p>
            <p>⏰ 24 Hours / 7 Days Open</p>
          </div>
          <div>
            <h4 style={{ color: '#FFFFFF', fontWeight: 800, marginBottom: 10, marginTop: 0 }}>Our Guarantees</h4>
            <p style={{ margin: 0 }}>✔ 30-Min Rapid Arrival</p>
            <p style={{ margin: '4px 0' }}>✔ 30 Days Free Warranty</p>
            <p>✔ Upfront Rate Card</p>
          </div>
          <div>
            <h4 style={{ color: '#FFFFFF', fontWeight: 800, marginBottom: 10, marginTop: 0 }}>Quick Links</h4>
            <button type="button" onClick={() => scrollToSection('services')} style={{ background: 'none', border: 'none', color: '#9E9E9E', padding: 0, margin: 0, cursor: 'pointer', fontSize: '0.8rem', display: 'block' }}>Services</button>
            <button type="button" onClick={() => scrollToSection('packages')} style={{ background: 'none', border: 'none', color: '#9E9E9E', padding: '4px 0', cursor: 'pointer', fontSize: '0.8rem', display: 'block' }}>Packages</button>
            <button type="button" onClick={() => scrollToSection('reviews')} style={{ background: 'none', border: 'none', color: '#9E9E9E', padding: 0, margin: 0, cursor: 'pointer', fontSize: '0.8rem', display: 'block' }}>Reviews</button>
          </div>
        </div>
        <div style={{ maxWidth: 1200, margin: '24px auto 0', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', fontSize: '0.7rem' }}>
          © {new Date().getFullYear()} Narayan Plumbing Services. All Rights Reserved.
        </div>
      </footer>

      {/* ======================= MOBILE BOTTOM NAV ======================= */}
      <nav className="bottom-nav" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 58, backgroundColor: '#FFFFFF', borderTop: '1px solid #E0E0E0', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 1000, boxShadow: '0 -4px 15px rgba(0,0,0,0.06)', paddingBottom: 'env(safe-area-inset-bottom)' }} aria-label="Mobile navigation">
        <button type="button" onClick={scrollHome} aria-label="Go to home" style={{ background: 'none', border: 'none', color: '#6E42E5', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
          <Home size={19} />
          <span style={{ fontSize: '0.62rem', marginTop: 2, fontWeight: 700 }}>Home</span>
        </button>

        <button type="button" onClick={() => scrollToSection('services')} aria-label="Go to services" style={{ background: 'none', border: 'none', color: '#757575', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
          <Wrench size={19} />
          <span style={{ fontSize: '0.62rem', marginTop: 2, fontWeight: 700 }}>Services</span>
        </button>

        <button
          type="button"
          onClick={() => openBooking()}
          aria-label="Book a plumber"
          style={{
            transform: 'translateY(-12px)',
            height: 44, padding: '0 18px', borderRadius: 22,
            border: '4px solid #F5F5F7',
            backgroundColor: '#6E42E5', color: '#FFFFFF',
            display: 'flex', alignItems: 'center', gap: 6,
            cursor: 'pointer', boxShadow: '0 6px 18px rgba(110, 66, 229, 0.45)',
            fontWeight: 900, fontSize: '0.8rem',
          }}
        >
          <Calendar size={17} /> Book
        </button>

        <button type="button" onClick={() => scrollToSection('reviews')} aria-label="Go to reviews" style={{ background: 'none', border: 'none', color: '#757575', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
          <Star size={19} />
          <span style={{ fontSize: '0.62rem', marginTop: 2, fontWeight: 700 }}>Reviews</span>
        </button>

        <a href={`tel:${PHONE_NUMBER}`} aria-label="Call now" style={{ textDecoration: 'none', color: '#757575', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Phone size={19} color="#25D366" />
          <span style={{ fontSize: '0.62rem', marginTop: 2, fontWeight: 700, color: '#757575' }}>Call</span>
        </a>
      </nav>

      {/* ======================= WHATSAPP FLOATING BUTTON ======================= */}
      <motion.a
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href={`https://wa.me/91${PHONE_NUMBER}?text=Hi%20Narayan%20Plumbing%20Services,%20I%20need%20plumbing%20assistance.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        style={{ position: 'fixed', bottom: 70, right: 14, width: 46, height: 46, borderRadius: '50%', backgroundColor: '#25D366', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 18px rgba(37, 211, 102, 0.4)', zIndex: 999 }}
      >
        <MessageSquare size={22} />
      </motion.a>

      {/* ======================= BOOKING MODAL ======================= */}
      <BookingModal open={bookingOpen} preselectedService={preselectedService} onClose={() => setBookingOpen(false)} />
    </div>
  );
}

export default App;
