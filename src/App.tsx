import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, Calendar, ShieldCheck, Clock, Award, Star, CheckCircle, Wrench, 
  Droplet, Sparkles, MapPin, ChevronRight, X, User, AlertTriangle, 
  Flame, Home, Grid, Tag, Image as ImageIcon, MessageSquare, ArrowUpRight, Search, ThumbsUp, Menu
} from 'lucide-react';
import confetti from 'canvas-confetti';

// --- DATA DEFINITIONS --- //
const PHONE_NUMBER = "9606157745";
const PHONE_DISPLAY = "+91 96061 57745";

const TOP_ANNOUNCEMENTS = [
  { icon: Clock, text: "30 Min Doorstep Service" },
  { icon: ShieldCheck, text: "Verified & Experienced Plumbers" },
  { icon: Award, text: "Upfront Pricing" },
  { icon: ShieldCheck, text: "No Hidden Charges" }
];

const TRUST_BADGES = [
  { label: "30 Minutes", sub: "Doorstep Service", icon: "⏱️" },
  { label: "Verified & Trained", sub: "Plumbers", icon: "🛡️" },
  { label: "Upfront", sub: "Pricing", icon: "₹" },
  { label: "100%", sub: "Satisfaction Guaranteed", icon: "👍" }
];

// 12 Exact Core Services matching Poster with blue 3D icons & descriptions
const CORE_SERVICES = [
  { id: "tap", name: "Tap Installation & Repair", icon: "🚰", desc: "Leaking taps, mixer replacement, cartridge repair & fitting.", price: "₹149" },
  { id: "shower", name: "Shower Installation & Repair", icon: "🚿", desc: "Wall mixer, rain showerhead, pressure boosting & repair.", price: "₹249" },
  { id: "toilet", name: "Toilet (WC) Installation & Repair", icon: "🚽", desc: "Flush tank leak repair, western/commode installation & gasket.", price: "₹349" },
  { id: "basin", name: "Wash Basin Installation & Repair", icon: "🧼", desc: "Pedestal basin, counter basin & bottle trap replacement.", price: "₹299" },
  { id: "kitchen", name: "Kitchen Sink Installation & Repair", icon: "🥣", desc: "Sink clogged drain, waste pipe replacement & coupling.", price: "₹249" },
  { id: "pipe-leak", name: "Pipe Leak Repair", icon: "🔧", desc: "Concealed wall leaks, joint sealing & copper/CPVC patching.", price: "₹199" },
  { id: "pipe-inst", name: "Pipe Installation & Replacement", icon: "🔩", desc: "New water pipeline layout, CPVC/UPVC fitting & line extension.", price: "₹499" },
  { id: "drain", name: "Drain Blockage Cleaning", icon: "🌪️", desc: "High-pressure drain jetting, floor trap unblocking & snake line.", price: "₹399" },
  { id: "tank", name: "Water Tank Installation", icon: "🛢️", desc: "Overhead tank fitting, auto-cut valve, float valve & clean tank.", price: "₹699" },
  { id: "geyser", name: "Geyser Installation & Repair", icon: "♨️", desc: "Thermostat repair, heating element, inlet connection & mounting.", price: "₹349" },
  { id: "bath-plumb", name: "Bathroom Plumbing Services", icon: "🛀", desc: "Complete sanitaryware overhaul, diverters & fittings.", price: "₹599" },
  { id: "emergency", name: "Emergency Plumbing Service", icon: "🚨", desc: "24/7 Priority burst pipe, main valve leak & midnight emergency.", price: "₹499" }
];

const TRENDING_SERVICES = [
  { title: "Bathroom Renovation", tag: "POPULAR", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80", desc: "Luxury marble layouts, concealed diverters & rain shower systems." },
  { title: "Kitchen Renovation", tag: "HOT", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80", desc: "Modular plumbing, under-sink RO setup & heavy-duty waste fittings." },
  { title: "Complete Plumbing", tag: "BEST VALUE", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80", desc: "Whole house piping, pressure pump integration & valve overhaul." },
  { title: "Water Tank Cleaning", tag: "HYGIENE", image: "/tank.png", desc: "High-pressure jet washing, vacuum sludger & UV sanitization." },
  { title: "Waterproofing Solutions", tag: "PROTECT", image: "/waterproof.png", desc: "Seepage treatment, slab crack injection & tile chemical coating." },
  { title: "CPVC / UPVC Pipeline", tag: "DURABLE", image: "/cpvc.png", desc: "Lead-free food grade piping with 10-year joint leak guarantee." },
  { title: "Geyser Installation", tag: "WINTER CARE", image: "/geyser.png", desc: "Instant & storage water heater mounting with safety valve test." },
  { title: "Drain Cleaning", tag: "EXPRESS", image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=600&q=80", desc: "Camera line inspection & heavy motorized drain auger clearance." }
];

const PACKAGES = [
  {
    name: "Essential Home Checkup",
    price: "₹499",
    originalPrice: "₹999",
    popular: false,
    features: [
      "Whole house tap & valve inspection",
      "Flush tank leak assessment",
      "Minor joint tightening included",
      "Water pressure testing",
      "Free quotation for repairs"
    ]
  },
  {
    name: "Complete Bathroom Care",
    price: "₹1,299",
    originalPrice: "₹2,499",
    popular: true,
    features: [
      "Deep cleaning of all shower heads",
      "2 Tap valve/washer replacements",
      "Drain trap descaling & clearing",
      "Geyser safety valve inspection",
      "Anti-leak seal application"
    ]
  },
  {
    name: "Full House Plumbing Audit",
    price: "₹2,499",
    originalPrice: "₹4,599",
    popular: false,
    features: [
      "Overhead water tank sanitization check",
      "All bathroom & kitchen fixtures service",
      "Main line pressure & leak test",
      "Free 2 minor repair labor jobs",
      "30-Day unconditional warranty"
    ]
  }
];

const WHY_CHOOSE = [
  { title: "30 Minutes Doorstep Service", desc: "GPS tracked local plumbers stationed nearby for rapid response.", icon: "🛵" },
  { title: "Verified & Trained Experts", desc: "Background checked professionals with 5+ years hand-on experience.", icon: "🛡️" },
  { title: "Transparent Upfront Pricing", desc: "Rate card approval before starting work. Zero hidden surprise fees.", icon: "🏷️" },
  { title: "Genuine Parts & Quality Work", desc: "Original ISI-certified fittings from top brands (Jaquar, Astral, Supreme).", icon: "🧰" },
  { title: "30 Days Service Warranty", desc: "Free re-visit and fix if issues recur within 30 days of completion.", icon: "📅" },
  { title: "No Hidden Charges", desc: "Honest billing with invoice details for every single component.", icon: "🚫" }
];

const REVIEWS = [
  { name: "Rajesh Kumar", area: "Indiranagar", rating: 5, time: "2 days ago", comment: "Came in 20 minutes! Fixed main pipe leak very fast. Highly professional work." },
  { name: "Priya Sharma", area: "Koramangala", rating: 5, time: "1 week ago", comment: "Geyser installation done smoothly. Very clean work and affordable price." },
  { name: "Anand Verma", area: "Whitefield", rating: 5, time: "3 days ago", comment: "Cleared clogged kitchen sink in no time. Transparent pricing approved before work." }
];

const FAQS = [
  { q: "How fast will the plumber reach my house?", a: "We guarantee a technician at your doorstep within 30 minutes of booking in all covered city locations." },
  { q: "Are your plumbers background verified?", a: "Yes, 100% of our plumbers are police background checked, identity verified, and certified." },
  { q: "Do you offer warranty on repair work?", a: "Yes, every service comes with a 30-Day unconditional service warranty." }
];

export function App() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Home');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Booking Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    service: 'General Plumbing',
    date: 'Today',
    notes: ''
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleOpenBooking = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
      setFormData(prev => ({ ...prev, service: serviceName }));
    }
    setBookingModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    triggerConfetti();
    setTimeout(() => {
      setSubmitted(false);
      setBookingModalOpen(false);
    }, 2500);
  };

  const filteredServices = CORE_SERVICES.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const firstWord = "NARAYAN".split("");
  const secondWord = "PLUMBING".split("");

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#071329', color: '#FFFFFF', position: 'relative' }}>
      
      {/* --- LETTER BY LETTER PRELOADER ANIMATION --- */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              backgroundColor: '#071329',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}
          >
            <div style={{ textAlign: 'center', position: 'relative', padding: '0 20px' }}>
              
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 140 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                style={{ height: 2, backgroundColor: '#FF5A1F', margin: '0 auto 20px auto' }}
              />

              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.25em', display: 'flex', justifyContent: 'center' }}>
                {firstWord.map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 50, rotateX: 90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>

              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(2rem, 6vw, 3.8rem)', fontWeight: 900, color: '#FF5A1F', letterSpacing: '0.3em', display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                {secondWord.map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 50, rotateX: 90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                style={{ fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', color: '#00D4FF', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 16, fontWeight: 700 }}
              >
                EXPERT PLUMBERS • ON TIME. EVERY TIME.
              </motion.p>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 90 }}
                transition={{ duration: 1, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ height: 2, backgroundColor: '#00D4FF', margin: '20px auto 0 auto' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- TOP TICKER ANNOUNCEMENT BAR --- */}
      <div style={{ backgroundColor: '#050D1D', color: '#FFFFFF', padding: '8px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', width: '100%', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            {TOP_ANNOUNCEMENTS.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', fontWeight: 600, color: '#E2E8F0' }}>
                  <IconComp size={14} color="#FF5A1F" />
                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- HEADER NAVBAR MATCHING POSTER --- */}
      <header className="glass-header" style={{ position: 'sticky', top: 0, zIndex: 100, padding: '12px 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Brand Logo & Tagline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <motion.div 
              whileHover={{ rotate: 15 }}
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FF5A1F, #E0480E)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(255, 90, 31, 0.5)'
              }}
            >
              <Wrench size={26} color="#FFFFFF" />
            </motion.div>

            <div>
              <h1 style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: '-0.3px', margin: 0, lineHeight: 1.1, color: '#FFFFFF' }}>
                NARAYAN
              </h1>
              <span style={{ fontSize: '0.72rem', color: '#FF5A1F', fontWeight: 800, letterSpacing: '1px', display: 'block' }}>
                PLUMBING SERVICES
              </span>
              <span style={{ fontSize: '0.62rem', color: '#94A3B8', display: 'block' }}>
                Expert Plumbers. On Time. Every Time.
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="desktop-nav" style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            <a href="#home" style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 700, fontSize: '0.88rem' }}>Home</a>
            <a href="#services" style={{ color: '#CBD5E1', textDecoration: 'none', fontWeight: 600, fontSize: '0.88rem' }}>Services</a>
            <a href="#trending" style={{ color: '#CBD5E1', textDecoration: 'none', fontWeight: 600, fontSize: '0.88rem' }}>Trending</a>
            <a href="#packages" style={{ color: '#CBD5E1', textDecoration: 'none', fontWeight: 600, fontSize: '0.88rem' }}>Packages</a>
            <a href="#why-us" style={{ color: '#CBD5E1', textDecoration: 'none', fontWeight: 600, fontSize: '0.88rem' }}>Why Us</a>
            <a href="#reviews" style={{ color: '#CBD5E1', textDecoration: 'none', fontWeight: 600, fontSize: '0.88rem' }}>Reviews</a>
            <a href="#faqs" style={{ color: '#CBD5E1', textDecoration: 'none', fontWeight: 600, fontSize: '0.88rem' }}>FAQs</a>
          </nav>

          {/* Call & CTA Header Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <a 
              href={`tel:${PHONE_NUMBER}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                textDecoration: 'none',
                color: '#FFFFFF',
                background: 'rgba(255, 255, 255, 0.08)',
                padding: '8px 16px',
                borderRadius: 30,
                border: '1px solid rgba(255,255,255,0.15)'
              }}
            >
              <Phone size={16} color="#00D4FF" />
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#00D4FF' }}>{PHONE_DISPLAY}</span>
            </a>

            <button
              onClick={() => handleOpenBooking()}
              className="btn-poster-orange"
            >
              <Calendar size={16} />
              <span>BOOK SERVICE</span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'none',
                padding: 4
              }}
            >
              <Menu size={26} />
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Nav Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ overflow: 'hidden', background: '#071329', padding: '16px 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '0 24px' }}>
                <a href="#home" onClick={() => setMobileMenuOpen(false)} style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 700 }}>Home</a>
                <a href="#services" onClick={() => setMobileMenuOpen(false)} style={{ color: '#CBD5E1', textDecoration: 'none', fontWeight: 600 }}>Our Services</a>
                <a href="#trending" onClick={() => setMobileMenuOpen(false)} style={{ color: '#CBD5E1', textDecoration: 'none', fontWeight: 600 }}>Trending Services</a>
                <a href="#packages" onClick={() => setMobileMenuOpen(false)} style={{ color: '#CBD5E1', textDecoration: 'none', fontWeight: 600 }}>Plumbing Packages</a>
                <a href="#why-us" onClick={() => setMobileMenuOpen(false)} style={{ color: '#CBD5E1', textDecoration: 'none', fontWeight: 600 }}>Why Choose Us</a>
                <a href="#reviews" onClick={() => setMobileMenuOpen(false)} style={{ color: '#CBD5E1', textDecoration: 'none', fontWeight: 600 }}>Customer Reviews</a>
                <a href="#faqs" onClick={() => setMobileMenuOpen(false)} style={{ color: '#CBD5E1', textDecoration: 'none', fontWeight: 600 }}>FAQs</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- HERO SECTION WITH VIBRANT WATER SPLASH GRAPHICS --- */}
      <section id="home" style={{ background: 'linear-gradient(180deg, #071329 0%, #0D2C54 60%, #071329 100%)', color: '#FFFFFF', padding: '40px 24px 70px 24px', position: 'relative', overflow: 'hidden' }}>
        
        {/* Dynamic Water Glow Bubbles */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.18, pointerEvents: 'none' }}>
          <motion.div
            animate={{ y: [-20, 20, -20] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            style={{ position: 'absolute', top: '10%', left: '15%', width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, #00D4FF, transparent)' }}
          />
          <motion.div
            animate={{ y: [20, -20, 20] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            style={{ position: 'absolute', bottom: '15%', right: '10%', width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, #FF5A1F, transparent)' }}
          />
        </div>

        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40, alignItems: 'center', position: 'relative', zIndex: 2 }}>
          
          {/* Left Text Content */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span style={{ background: 'rgba(255, 90, 31, 0.15)', color: '#FF5A1F', border: '1px solid rgba(255, 90, 31, 0.3)', padding: '6px 16px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 18 }}>
                <Sparkles size={14} /> COMPLETE PLUMBING SOLUTIONS
              </span>

              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, textTransform: 'uppercase', letterSpacing: '-0.5px' }}>
                COMPLETE <br />
                <span style={{ color: '#FF5A1F' }}>PLUMBING SOLUTIONS</span> <br />
                <span style={{ color: '#00D4FF', fontSize: '1.8rem' }}>AT YOUR DOORSTEP</span>
              </h2>

              <p style={{ color: '#CBD5E1', fontSize: '1.05rem', margin: '18px 0 32px 0', maxWidth: 500, fontWeight: 500 }}>
                Fast, Reliable & Affordable Plumbing Solutions for Your Home & Business. 24/7 Priority Emergency Support!
              </p>
            </motion.div>

            {/* Quick Feature Badges Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 36, maxWidth: 480 }}>
              {TRUST_BADGES.map((b, idx) => (
                <div 
                  key={idx} 
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 14,
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{b.icon}</span>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#FFFFFF' }}>{b.label}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{b.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Hero Buttons */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <button
                onClick={() => handleOpenBooking()}
                className="btn-poster-orange"
                style={{ padding: '14px 32px', fontSize: '0.95rem' }}
              >
                <Calendar size={18} />
                <span>BOOK SERVICE NOW</span>
              </button>

              <a
                href={`tel:${PHONE_NUMBER}`}
                style={{
                  textDecoration: 'none',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  padding: '14px 28px',
                  borderRadius: 30,
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <Phone size={18} color="#00D4FF" />
                <span>CALL: {PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>

          {/* Right Hero Graphic Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 320 }}
          >
            {/* 30 Minutes Timer Circle Graphic */}
            <div 
              style={{
                position: 'relative',
                width: 280,
                height: 280,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #0B2545 0%, #071329 100%)',
                border: '6px solid #00D4FF',
                boxShadow: '0 0 40px rgba(0, 212, 255, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2
              }}
            >
              <Clock size={36} color="#FF5A1F" style={{ marginBottom: 4 }} />
              <div style={{ fontSize: '3.8rem', fontWeight: 900, lineHeight: 0.9, color: '#FFFFFF' }}>
                30
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#00D4FF', letterSpacing: '1px', marginTop: 4 }}>
                MINUTES
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#FF5A1F', textTransform: 'uppercase', marginTop: 2 }}>
                SERVICE GUARANTEE
              </div>
            </div>

            {/* Mobile Service Vehicle Badge */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              style={{
                position: 'absolute',
                bottom: -15,
                right: -10,
                background: '#FFFFFF',
                color: '#071329',
                padding: '12px 20px',
                borderRadius: 20,
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                zIndex: 3
              }}
            >
              <div style={{ fontSize: '2rem' }}>🚐</div>
              <div>
                <div style={{ fontWeight: 900, fontSize: '0.85rem', color: '#071329' }}>WE REACH, YOU RELAX</div>
                <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Fully Equipped Service Van</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- GOOGLE RATINGS & REVIEWS BANNER --- */}
      <section style={{ backgroundColor: '#071329', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '18px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          
          {/* Google Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#4285F4', fontSize: '1.4rem' }}>
              G
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FFFFFF' }}>4.8</span>
                <div style={{ display: 'flex', color: '#FFB800' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#FFB800" color="#FFB800" />
                  ))}
                </div>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Google Rating (1200+ Reviews)</div>
            </div>
          </div>

          {/* Happy Customers */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <User size={24} color="#00D4FF" />
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FFFFFF' }}>10K+</div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Happy Customers</div>
            </div>
          </div>

          {/* Verified Professionals */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShieldCheck size={24} color="#FF5A1F" />
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FFFFFF' }}>Verified</div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Professionals</div>
            </div>
          </div>

          {/* 24/7 Availability */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Clock size={24} color="#25D366" />
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FFFFFF' }}>24 / 7</div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Service Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- OUR SERVICES SECTION (WHITE CARDS + BLUE CIRCLE ICONS LIKE POSTER) --- */}
      <section id="services" style={{ backgroundColor: '#F4F7FB', color: '#071329', padding: '70px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          
          {/* Poster Blue Ribbon Header Banner */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="poster-ribbon">
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '0.1em', margin: 0 }}>
                OUR SERVICES
              </h2>
            </div>
          </div>

          {/* Search Filter Bar */}
          <div style={{ maxWidth: 480, margin: '0 auto 36px auto', position: 'relative' }}>
            <Search size={18} color="#64748B" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search service (e.g. Tap leak, Geyser, Drain block)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 46px',
                borderRadius: 30,
                border: '1px solid #CBD5E1',
                outline: 'none',
                fontSize: '0.9rem',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}
            />
          </div>

          {/* 12 Service Cards (Matching Poster 3D Blue Circular Icons) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 20 }}>
            {filteredServices.map((srv) => (
              <motion.div
                key={srv.id}
                className="service-card-wrap"
                whileHover={{ y: -6, boxShadow: '0 12px 24px rgba(11, 37, 69, 0.12)' }}
                transition={{ duration: 0.2 }}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 18,
                  padding: '24px 16px',
                  textAlign: 'center',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                  {/* 3D Blue Icon Circle Frame */}
                  <div 
                    className="service-icon-circle"
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle at 30% 30%, #EBF4FF 0%, #D0E3FF 100%)',
                      border: '2px solid #0084FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.2rem',
                      marginBottom: 14,
                      boxShadow: '0 6px 16px rgba(0, 132, 255, 0.15)'
                    }}
                  >
                    {srv.icon}
                  </div>

                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#071329', lineHeight: 1.3, marginBottom: 8 }}>
                    {srv.name}
                  </h3>

                  <p style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.4, marginBottom: 14 }}>
                    {srv.desc}
                  </p>
                </div>

                <div style={{ width: '100%' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0084FF', marginBottom: 10 }}>
                    Starts {srv.price}
                  </div>

                  <button
                    onClick={() => handleOpenBooking(srv.name)}
                    className="btn-poster-orange"
                    style={{ width: '100%', justifyContent: 'center', padding: '8px 0', fontSize: '0.8rem' }}
                  >
                    BOOK NOW
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TRENDING SERVICES SECTION (DARK NAVY BLUE + REAL PHOTOS LIKE POSTER) --- */}
      <section id="trending" style={{ backgroundColor: '#071329', color: '#FFFFFF', padding: '70px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          
          {/* Poster Blue Ribbon Banner Header */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="poster-ribbon">
              <h2 style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '0.1em', margin: 0 }}>
                TRENDING SERVICES
              </h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {TRENDING_SERVICES.map((t, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
                  <img 
                    src={t.image} 
                    alt={t.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  <span 
                    style={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      backgroundColor: '#FF5A1F',
                      color: '#FFFFFF',
                      fontSize: '0.65rem',
                      fontWeight: 900,
                      padding: '4px 10px',
                      borderRadius: 12
                    }}
                  >
                    {t.tag}
                  </span>
                </div>

                <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 6 }}>{t.title}</h3>
                    <p style={{ fontSize: '0.8rem', color: '#94A3B8', lineHeight: 1.4 }}>{t.desc}</p>
                  </div>

                  <button
                    onClick={() => handleOpenBooking(t.title)}
                    style={{
                      marginTop: 16,
                      background: 'transparent',
                      border: '1px solid #00D4FF',
                      color: '#00D4FF',
                      padding: '8px 14px',
                      borderRadius: 20,
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6
                    }}
                  >
                    Explore Service <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PACKAGES SECTION --- */}
      <section id="packages" style={{ backgroundColor: '#F4F7FB', color: '#071329', padding: '70px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span style={{ backgroundColor: 'rgba(255, 90, 31, 0.1)', color: '#FF5A1F', padding: '4px 14px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 800 }}>
              SPECIAL COMBOS
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#071329', marginTop: 8 }}>
              PLUMBING PACKAGES
            </h2>
            <div style={{ width: 60, height: 4, backgroundColor: '#FF5A1F', margin: '8px auto 0 auto', borderRadius: 2 }}></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {PACKAGES.map((pkg, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 20,
                  padding: 28,
                  border: pkg.popular ? '2px solid #FF5A1F' : '1px solid #E2E8F0',
                  position: 'relative',
                  boxShadow: pkg.popular ? '0 12px 30px rgba(255, 90, 31, 0.15)' : '0 6px 18px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                {pkg.popular && (
                  <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#FF5A1F', color: '#FFFFFF', fontSize: '0.75rem', fontWeight: 900, padding: '4px 16px', borderRadius: 12 }}>
                    MOST POPULAR CHOICE
                  </div>
                )}

                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#071329' }}>{pkg.name}</h3>
                  
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, margin: '16px 0' }}>
                    <span style={{ fontSize: '2.2rem', fontWeight: 900, color: '#071329' }}>{pkg.price}</span>
                    <span style={{ fontSize: '1rem', color: '#94A3B8', textDecoration: 'line-through' }}>{pkg.originalPrice}</span>
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0' }}>
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.88rem', color: '#334155', marginBottom: 12 }}>
                        <CheckCircle size={16} color="#0084FF" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleOpenBooking(pkg.name)}
                  className="btn-poster-orange"
                  style={{ width: '100%', justifyContent: 'center', padding: '12px 0' }}
                >
                  SELECT PACKAGE
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US SECTION --- */}
      <section id="why-us" style={{ backgroundColor: '#FFFFFF', color: '#071329', padding: '70px 24px', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#071329' }}>
              WHY CHOOSE <span style={{ color: '#FF5A1F' }}>NARAYAN PLUMBING SERVICES?</span>
            </h2>
            <p style={{ color: '#64748B', fontSize: '0.95rem', marginTop: 6 }}>
              We bring trust, speed, and premium craftsmanship to every repair.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {WHY_CHOOSE.map((item, idx) => (
              <div 
                key={idx}
                style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: 16,
                  padding: 20,
                  display: 'flex',
                  gap: 16,
                  alignItems: 'flex-start',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ fontSize: '2rem' }}>{item.icon}</div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#071329', marginBottom: 4 }}>{item.title}</h3>
                  <p style={{ fontSize: '0.82rem', color: '#64748B', lineHeight: 1.4 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- REVIEWS SECTION --- */}
      <section id="reviews" style={{ backgroundColor: '#F4F7FB', color: '#071329', padding: '70px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span style={{ backgroundColor: 'rgba(0, 132, 255, 0.1)', color: '#0084FF', padding: '4px 14px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 800 }}>
              TESTIMONIALS
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#071329', marginTop: 8 }}>
              WHAT OUR CUSTOMERS SAY
            </h2>
            <div style={{ width: 60, height: 4, backgroundColor: '#FF5A1F', margin: '8px auto 0 auto', borderRadius: 2 }}></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {REVIEWS.map((rev, idx) => (
              <div key={idx} style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: 24, border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div>
                    <h4 style={{ fontWeight: 800, color: '#071329', fontSize: '1rem' }}>{rev.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{rev.area}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{rev.time}</span>
                </div>
                <div style={{ display: 'flex', color: '#FFB800', marginBottom: 10 }}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#FFB800" color="#FFB800" />
                  ))}
                </div>
                <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.5 }}>"{rev.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQS SECTION --- */}
      <section id="faqs" style={{ backgroundColor: '#FFFFFF', color: '#071329', padding: '70px 24px', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#071329' }}>
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p style={{ color: '#64748B', fontSize: '0.9rem', marginTop: 4 }}>Everything you need to know before booking</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {FAQS.map((faq, idx) => (
              <div 
                key={idx}
                style={{
                  border: '1px solid #E2E8F0',
                  borderRadius: 14,
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    backgroundColor: '#F8FAFC',
                    border: 'none',
                    textAlign: 'left',
                    fontWeight: 800,
                    color: '#071329',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>{faq.q}</span>
                  <ChevronRight size={18} style={{ transform: openFaq === idx ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>

                {openFaq === idx && (
                  <div style={{ padding: '16px 20px', fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, backgroundColor: '#FFFFFF' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BOTTOM CALLOUT BANNER --- */}
      <section style={{ background: 'linear-gradient(135deg, #071329 0%, #0D2C54 100%)', color: '#FFFFFF', padding: '48px 24px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 28 }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900 }}>Need Urgent Plumbing Assistance?</h2>
            <p style={{ color: '#00D4FF', fontWeight: 700, marginTop: 4 }}>We are available 24/7. Technician arrives in 30 minutes!</p>
          </div>

          <div style={{ display: 'flex', gap: 14 }}>
            <a
              href={`tel:${PHONE_NUMBER}`}
              style={{
                backgroundColor: '#FFFFFF',
                color: '#071329',
                textDecoration: 'none',
                padding: '12px 24px',
                borderRadius: 25,
                fontWeight: 900,
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              <Phone size={18} color="#FF5A1F" />
              {PHONE_DISPLAY}
            </a>

            <button
              onClick={() => handleOpenBooking()}
              className="btn-poster-orange"
            >
              BOOK NOW
            </button>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer style={{ backgroundColor: '#030A16', color: '#94A3B8', padding: '40px 24px 90px 24px', fontSize: '0.85rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32 }}>
          <div>
            <h3 style={{ color: '#FFFFFF', fontWeight: 900, fontSize: '1.2rem', marginBottom: 12 }}>
              NARAYAN <span style={{ color: '#FF5A1F' }}>PLUMBING</span>
            </h3>
            <p style={{ lineHeight: 1.5 }}>
              Expert Plumbers. On Time. Every Time. Providing residential and commercial plumbing across the city with 30-minute rapid doorstep delivery.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#FFFFFF', fontWeight: 800, marginBottom: 12 }}>Contact Details</h4>
            <p>📞 Phone: <a href={`tel:${PHONE_NUMBER}`} style={{ color: '#00D4FF', textDecoration: 'none' }}><strong>{PHONE_DISPLAY}</strong></a></p>
            <p style={{ margin: '6px 0' }}>📍 Address: Citywide Service Hub</p>
            <p>⏰ Hours: 24 Hours / 7 Days Open</p>
          </div>

          <div>
            <h4 style={{ color: '#FFFFFF', fontWeight: 800, marginBottom: 12 }}>Our Guarantees</h4>
            <p>✔ 30-Min Arrival</p>
            <p style={{ margin: '6px 0' }}>✔ 30 Days Free Warranty</p>
            <p>✔ Upfront Rate Card</p>
          </div>
        </div>

        <div style={{ maxWidth: 1280, margin: '30px auto 0 auto', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center', fontSize: '0.75rem' }}>
          © {new Date().getFullYear()} Narayan Plumbing Services. All Rights Reserved.
        </div>
      </footer>

      {/* --- MOBILE-ONLY BOTTOM NAVIGATION BAR --- */}
      <div 
        className="mobile-bottom-nav"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 65,
          backgroundColor: '#071329',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          zIndex: 1000,
          boxShadow: '0 -4px 20px rgba(0,0,0,0.3)'
        }}
      >
        <button 
          onClick={() => { setActiveTab('Home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{ background: 'none', border: 'none', color: activeTab === 'Home' ? '#FF5A1F' : '#94A3B8', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
        >
          <Home size={20} />
          <span style={{ fontSize: '0.65rem', marginTop: 3, fontWeight: 700 }}>Home</span>
        </button>

        <button 
          onClick={() => { setActiveTab('Services'); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}
          style={{ background: 'none', border: 'none', color: activeTab === 'Services' ? '#FF5A1F' : '#94A3B8', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
        >
          <Wrench size={20} />
          <span style={{ fontSize: '0.65rem', marginTop: 3, fontWeight: 700 }}>Services</span>
        </button>

        {/* Center Floating Action Button */}
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleOpenBooking()}
          style={{
            width: 54,
            height: 54,
            borderRadius: '50%',
            backgroundColor: '#FF5A1F',
            border: '3px solid #071329',
            marginTop: -24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: '0 4px 15px rgba(255, 90, 31, 0.6)',
            cursor: 'pointer'
          }}
        >
          <Calendar size={22} />
          <span style={{ fontSize: '0.55rem', fontWeight: 900, marginTop: 1 }}>BOOK</span>
        </motion.button>

        <button 
          onClick={() => { setActiveTab('Packages'); document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' }); }}
          style={{ background: 'none', border: 'none', color: activeTab === 'Packages' ? '#FF5A1F' : '#94A3B8', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
        >
          <Tag size={20} />
          <span style={{ fontSize: '0.65rem', marginTop: 3, fontWeight: 700 }}>Packages</span>
        </button>

        <a 
          href={`tel:${PHONE_NUMBER}`}
          style={{ textDecoration: 'none', color: '#25D366', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <Phone size={20} />
          <span style={{ fontSize: '0.65rem', marginTop: 3, fontWeight: 700, color: '#94A3B8' }}>Call</span>
        </a>
      </div>

      {/* --- WHATSAPP FLOATING QUICK ACTION BUTTON --- */}
      <motion.a
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href={`https://wa.me/91${PHONE_NUMBER}?text=Hi%20Narayan%20Plumbing%20Services,%20I%20need%20plumbing%20assistance.`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: 76,
          right: 16,
          width: 50,
          height: 50,
          borderRadius: '50%',
          backgroundColor: '#25D366',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 18px rgba(37, 211, 102, 0.4)',
          zIndex: 999
        }}
      >
        <MessageSquare size={26} />
      </motion.a>

      {/* --- INTERACTIVE BOOKING MODAL --- */}
      <AnimatePresence>
        {bookingModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(7, 19, 41, 0.85)',
              backdropFilter: 'blur(6px)',
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 24,
                width: '100%',
                maxWidth: 480,
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                position: 'relative'
              }}
            >
              {/* Modal Header */}
              <div style={{ backgroundColor: '#071329', color: '#FFFFFF', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 900 }}>Schedule Service Visit</h3>
                  <p style={{ fontSize: '0.75rem', color: '#00D4FF', margin: 0 }}>Technician arrives at your doorstep in 30 mins</p>
                </div>
                <button 
                  onClick={() => setBookingModalOpen(false)}
                  style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#FFFFFF', width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <X size={18} />
                </button>
              </div>

              {submitted ? (
                <div style={{ padding: 40, textAlign: 'center' }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{ width: 70, height: 70, borderRadius: '50%', backgroundColor: '#25D366', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}
                  >
                    <CheckCircle size={40} />
                  </motion.div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#071329' }}>Booking Confirmed!</h3>
                  <p style={{ color: '#64748B', fontSize: '0.9rem', marginTop: 8 }}>
                    Our master plumber will call you within 5 minutes to confirm exact doorstep location.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} style={{ padding: 24 }}>
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: 4 }}>
                      Select Service
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
                    >
                      {CORE_SERVICES.map((s) => (
                        <option key={s.id} value={s.name}>{s.name} ({s.price})</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: 4 }}>
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: 4 }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#334155', display: 'block', marginBottom: 4 }}>
                      Complete Address / Flat No. *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="House/Flat No., Landmark, Area"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-poster-orange"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      padding: '14px',
                      fontSize: '1rem',
                      marginTop: 8
                    }}
                  >
                    CONFIRM INSTANT BOOKING
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
