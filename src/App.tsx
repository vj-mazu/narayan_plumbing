import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, Calendar, ShieldCheck, Clock, Award, Star, CheckCircle, Wrench, 
  Droplet, Sparkles, MapPin, ChevronRight, X, User, AlertTriangle, 
  Flame, Home, Grid, Tag, Image as ImageIcon, MessageSquare, ArrowUpRight, Search, ThumbsUp, Menu,
  Percent, ChevronDown, Check, Zap, Shield, ArrowRight, ShoppingBag, MoreVertical
} from 'lucide-react';
import confetti from 'canvas-confetti';

// --- DATA DEFINITIONS --- //
const PHONE_NUMBER = "9606157745";
const PHONE_DISPLAY = "+91 96061 57745";

// Urban Company Style Category Grid (6 Quick Action Apps)
const UC_CATEGORIES = [
  { id: "tap", name: "Tap Repair", icon: "🚰", price: "₹149", rating: "4.8 (12k)" },
  { id: "toilet", name: "WC & Toilet", icon: "🚽", price: "₹349", rating: "4.9 (18k)" },
  { id: "pipe", name: "Leakage Repair", icon: "🔧", price: "₹199", rating: "4.8 (22k)" },
  { id: "drain", name: "Drain Unblock", icon: "🌪️", price: "₹399", rating: "4.7 (15k)" },
  { id: "geyser", name: "Geyser Service", icon: "♨️", price: "₹349", rating: "4.9 (14k)" },
  { id: "tank", name: "Tank Cleaning", icon: "🛢️", price: "₹699", rating: "4.8 (9k)" }
];

const CORE_SERVICES = [
  { id: "tap", name: "Tap Installation & Repair", icon: "🚰", desc: "Leaking taps, mixer replacement, cartridge repair & fitting.", price: "₹149", rating: "4.8 ★" },
  { id: "shower", name: "Shower Installation & Repair", icon: "🚿", desc: "Wall mixer, rain showerhead, pressure boosting & repair.", price: "₹249", rating: "4.9 ★" },
  { id: "toilet", name: "Toilet (WC) Installation & Repair", icon: "🚽", desc: "Flush tank leak repair, western/commode installation & gasket.", price: "₹349", rating: "4.8 ★" },
  { id: "basin", name: "Wash Basin Installation & Repair", icon: "🧼", desc: "Pedestal basin, counter basin & bottle trap replacement.", price: "₹299", rating: "4.7 ★" },
  { id: "kitchen", name: "Kitchen Sink Installation & Repair", icon: "🥣", desc: "Sink clogged drain, waste pipe replacement & coupling.", price: "₹249", rating: "4.9 ★" },
  { id: "pipe-leak", name: "Pipe Leak Repair", icon: "🔧", desc: "Concealed wall leaks, joint sealing & copper/CPVC patching.", price: "₹199", rating: "4.9 ★" },
  { id: "pipe-inst", name: "Pipe Installation & Replacement", icon: "🔩", desc: "New water pipeline layout, CPVC/UPVC fitting & line extension.", price: "₹499", rating: "4.8 ★" },
  { id: "drain", name: "Drain Blockage Cleaning", icon: "🌪️", desc: "High-pressure drain jetting, floor trap unblocking & snake line.", price: "₹399", rating: "4.8 ★" },
  { id: "tank", name: "Water Tank Installation & Clean", icon: "🛢️", desc: "Overhead tank fitting, auto-cut valve, float valve & clean tank.", price: "₹699", rating: "4.9 ★" },
  { id: "geyser", name: "Geyser Installation & Repair", icon: "♨️", desc: "Thermostat repair, heating element, inlet connection & mounting.", price: "₹349", rating: "4.9 ★" },
  { id: "bath-plumb", name: "Bathroom Plumbing Services", icon: "🛀", desc: "Complete sanitaryware overhaul, diverters & fittings.", price: "₹599", rating: "4.8 ★" },
  { id: "emergency", name: "Emergency Plumbing Service", icon: "🚨", desc: "24/7 Priority burst pipe, main valve leak & midnight emergency.", price: "₹499", rating: "5.0 ★" }
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
    badge: "360° INSPECTION",
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
    badge: "3D PREMIUM CARE",
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
    badge: "VIP ALL-IN-ONE",
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
  { title: "30 Minutes Doorstep Service", desc: "GPS tracked local plumbers stationed nearby for rapid response.", icon: "⚡" },
  { title: "Verified & Trained Experts", desc: "Background checked professionals with 5+ years hand-on experience.", icon: "🛡️" },
  { title: "Transparent Upfront Pricing", desc: "Rate card approval before starting work. Zero hidden surprise fees.", icon: "🏷️" },
  { title: "Genuine Parts & Quality Work", desc: "Original ISI-certified fittings from top brands (Jaquar, Astral, Supreme).", icon: "🧰" },
  { title: "30 Days Service Warranty", desc: "Free re-visit and fix if issues recur within 30 days of completion.", icon: "📅" },
  { title: "No Hidden Charges", desc: "Honest billing with invoice details for every single component.", icon: "🚫" }
];

const REVIEWS = [
  { name: "Rajesh Kumar", area: "Indiranagar", rating: 5, time: "2 days ago", comment: "Came in 20 minutes! Fixed main pipe leak very fast. Highly professional work." },
  { name: "Priya Sharma", area: "Koramangala", rating: 5, time: "1 week ago", comment: "Geyser installation done smoothly. Very clean work and affordable price." },
  { name: "Anand Verma", area: "Whitefield", rating: 5, time: "3 days ago", comment: "Cleared clogged kitchen sink in no time. Transparent pricing approved before work." },
  { name: "Suresh Menon", area: "HSR Layout", rating: 5, time: "4 days ago", comment: "Super fast response! Tap replacement done within 30 mins. Great experience." },
  { name: "Kavita Reddy", area: "Jayanagar", rating: 5, time: "Yesterday", comment: "Clean water tank service. Courteous plumber with genuine rates." }
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
  const [threeDotsMenuOpen, setThreeDotsMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [cartCount, setCartCount] = useState(0);

  const reviewsContainerRef = useRef<HTMLDivElement>(null);

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
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Automatic Smooth Horizontal Scrolling for Customer Reviews
  useEffect(() => {
    const container = reviewsContainerRef.current;
    if (!container) return;

    let scrollAmount = 0;
    const step = 280;

    const interval = setInterval(() => {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        scrollAmount = 0;
      } else {
        scrollAmount += step;
      }
      container.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }, 3000);

    return () => clearInterval(interval);
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
    setCartCount(prev => prev + 1);
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

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F5F5F7', color: '#101010', position: 'relative', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif' }}>
      
      {/* --- URBAN COMPANY APP STYLE SPLASH LOADING SCREEN --- */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 999999,
              backgroundColor: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              style={{ textAlign: 'center' }}
            >
              <div 
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: 22,
                  backgroundColor: '#101010',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.12)'
                }}
              >
                <Wrench size={38} color="#FFFFFF" />
              </div>
              
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#101010', letterSpacing: '-0.5px', margin: 0 }}>
                NARAYAN <span style={{ color: '#6E42E5' }}>PLUMBING</span>
              </h2>
              <p style={{ fontSize: '0.82rem', color: '#757575', marginTop: 4, fontWeight: 500 }}>
                Expert Plumbing Services at Home
              </p>
            </motion.div>

            {/* Urban Company purple loading line */}
            <div style={{ width: 200, height: 4, borderRadius: 2, backgroundColor: '#E0E0E0', marginTop: 32, overflow: 'hidden', position: 'relative' }}>
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                style={{ width: '50%', height: '100%', backgroundColor: '#6E42E5', borderRadius: 2 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- URBAN COMPANY NATIVE APP TOP HEADER WITH 3 DOTS MENU --- */}
      <header 
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}
      >
        <div style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1200, margin: '0 auto', gap: 8 }}>
          
          {/* Brand Logo & Location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: '#101010', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Wrench size={16} />
            </div>

            <div style={{ minWidth: 0, overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '0.68rem', color: '#6E42E5', fontWeight: 700 }}>
                <MapPin size={11} color="#6E42E5" />
                <span>BANGALORE</span>
                <ChevronDown size={10} />
              </div>
              <h1 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#101010', margin: 0, lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Narayan Plumbing
              </h1>
            </div>
          </div>

          {/* Call, Cart & Mobile Three Dots Menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <a 
              href={`tel:${PHONE_NUMBER}`}
              style={{
                backgroundColor: '#F3F4F6',
                color: '#101010',
                padding: '6px 10px',
                borderRadius: 16,
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.72rem',
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}
            >
              <Phone size={12} color="#6E42E5" />
              <span>Call</span>
            </a>

            <button
              onClick={() => handleOpenBooking()}
              style={{
                backgroundColor: '#6E42E5',
                color: '#FFFFFF',
                border: 'none',
                padding: '6px 12px',
                borderRadius: 16,
                fontWeight: 800,
                fontSize: '0.72rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                boxShadow: '0 2px 8px rgba(110, 66, 229, 0.25)'
              }}
            >
              <ShoppingBag size={12} />
              <span>Cart ({cartCount})</span>
            </button>

            {/* Three Dots Menu Button */}
            <button
              onClick={() => setThreeDotsMenuOpen(!threeDotsMenuOpen)}
              style={{
                backgroundColor: '#F3F4F6',
                border: 'none',
                color: '#101010',
                width: 32,
                height: 32,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        {/* Three Dots Dropdown Menu */}
        <AnimatePresence>
          {threeDotsMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ overflow: 'hidden', backgroundColor: '#FFFFFF', borderTop: '1px solid #E5E7EB', padding: '12px 16px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <button 
                  onClick={() => {
                    setThreeDotsMenuOpen(false);
                    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  style={{ background: 'none', border: 'none', textAlign: 'left', color: '#101010', fontWeight: 800, fontSize: '0.88rem', cursor: 'pointer', padding: '4px 0' }}
                >
                  🛠️ All 12 Core Services
                </button>
                <button 
                  onClick={() => {
                    setThreeDotsMenuOpen(false);
                    document.getElementById('trending')?.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  style={{ background: 'none', border: 'none', textAlign: 'left', color: '#101010', fontWeight: 800, fontSize: '0.88rem', cursor: 'pointer', padding: '4px 0' }}
                >
                  🔥 Trending Upgrades
                </button>
                <button 
                  onClick={() => {
                    setThreeDotsMenuOpen(false);
                    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  style={{ background: 'none', border: 'none', textAlign: 'left', color: '#101010', fontWeight: 800, fontSize: '0.88rem', cursor: 'pointer', padding: '4px 0' }}
                >
                  📦 3D Plumbing Packages
                </button>
                <button 
                  onClick={() => {
                    setThreeDotsMenuOpen(false);
                    document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  style={{ background: 'none', border: 'none', textAlign: 'left', color: '#101010', fontWeight: 800, fontSize: '0.88rem', cursor: 'pointer', padding: '4px 0' }}
                >
                  🛡️ Why Choose Us
                </button>
                <button 
                  onClick={() => {
                    setThreeDotsMenuOpen(false);
                    document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  style={{ background: 'none', border: 'none', textAlign: 'left', color: '#101010', fontWeight: 800, fontSize: '0.88rem', cursor: 'pointer', padding: '4px 0' }}
                >
                  ⭐ Customer Reviews
                </button>
                <a 
                  href="https://maps.app.goo.gl/HRGVvm5RDNo7Vs448"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setThreeDotsMenuOpen(false)}
                  style={{ color: '#00D4FF', textDecoration: 'none', fontWeight: 800, fontSize: '0.88rem', padding: '4px 0', display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  📍 Google Maps Location
                </a>
                <a 
                  href={`tel:${PHONE_NUMBER}`}
                  style={{
                    backgroundColor: '#FF5A1F',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    textAlign: 'center',
                    padding: '10px 0',
                    borderRadius: 10,
                    fontWeight: 900,
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    marginTop: 4
                  }}
                >
                  <Phone size={16} />
                  <span>CALL NOW ({PHONE_DISPLAY})</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- HERO MOBILE APP BANNER --- */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '16px 14px 20px 14px', borderBottom: '1px solid #E0E0E0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div 
            style={{
              background: 'linear-gradient(135deg, #101010 0%, #1A1A1A 100%)',
              color: '#FFFFFF',
              borderRadius: 18,
              padding: '20px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 16,
              boxShadow: '0 8px 20px rgba(0,0,0,0.12)'
            }}
          >
            <div>
              <span style={{ backgroundColor: '#FF5A1F', color: '#FFFFFF', fontSize: '0.65rem', fontWeight: 900, padding: '3px 8px', borderRadius: 10, letterSpacing: '0.5px' }}>
                EXPRESS 30-MIN DOORSTEP
              </span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginTop: 6, lineHeight: 1.2 }}>
                Expert Plumbers at <br />
                <span style={{ color: '#00D4FF' }}>Your Doorstep in 30 Mins</span>
              </h2>
              <p style={{ fontSize: '0.78rem', color: '#B0B0B0', marginTop: 4 }}>
                Verified Plumbers • 30-Day Warranty • Upfront Pricing
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div 
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  border: '3px solid #6E42E5',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}
              >
                <Zap size={18} color="#FF5A1F" />
                <span style={{ fontSize: '1rem', fontWeight: 900, color: '#FFFFFF', lineHeight: 1 }}>30</span>
                <span style={{ fontSize: '0.5rem', fontWeight: 800, color: '#00D4FF' }}>MINS</span>
              </div>

              <button
                onClick={() => handleOpenBooking()}
                style={{
                  backgroundColor: '#FF5A1F',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: 20,
                  fontWeight: 900,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(255, 90, 31, 0.4)'
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- URBAN COMPANY APP QUICK CATEGORIES GRID --- */}
      <section style={{ backgroundColor: '#FFFFFF', padding: '20px 14px', borderBottom: '1px solid #E0E0E0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#101010', marginBottom: 14 }}>
            What are you looking for?
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(95px, 1fr))', gap: 10 }}>
            {UC_CATEGORIES.map((cat) => (
              <motion.div
                key={cat.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOpenBooking(cat.name)}
                style={{
                  backgroundColor: '#F5F5F7',
                  borderRadius: 14,
                  padding: '14px 6px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  border: '1px solid #EAEAEA',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <div 
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 14,
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.6rem',
                    marginBottom: 6,
                    boxShadow: '0 3px 8px rgba(0,0,0,0.04)'
                  }}
                >
                  {cat.icon}
                </div>

                <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#101010', lineHeight: 1.2 }}>
                  {cat.name}
                </span>
                
                <span style={{ fontSize: '0.65rem', color: '#6E42E5', fontWeight: 800, marginTop: 3 }}>
                  {cat.price}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ALL 12 CORE PLUMBING SERVICES LIST (ALL 12 DISPLAYED FULLY) --- */}
      <section id="services" style={{ maxWidth: 1200, margin: '24px auto', padding: '0 14px' }}>
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#101010' }}>
            Plumbing Repairs & Services (12 Core Services)
          </h2>
          <p style={{ fontSize: '0.78rem', color: '#757575' }}>100% Guaranteed doorstep service by background-checked pros</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {CORE_SERVICES.map((srv) => (
            <motion.div
              key={srv.id}
              whileHover={{ y: -3 }}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                padding: 14,
                border: '1px solid #E0E0E0',
                display: 'flex',
                justifyContent: 'space-between',
                gap: 12,
                boxShadow: '0 3px 10px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#6E42E5', backgroundColor: '#F0EAFB', padding: '2px 6px', borderRadius: 6 }}>
                    {srv.rating}
                  </span>
                  <span style={{ fontSize: '0.68rem', color: '#757575' }}>Verified Service</span>
                </div>

                <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#101010', margin: '3px 0' }}>
                  {srv.name}
                </h3>

                <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#101010', margin: '3px 0' }}>
                  {srv.price}
                </div>

                <p style={{ fontSize: '0.75rem', color: '#757575', lineHeight: 1.35 }}>
                  {srv.desc}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: 70 }}>
                <div 
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 12,
                    backgroundColor: '#F5F5F7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.75rem'
                  }}
                >
                  {srv.icon}
                </div>

                <button
                  onClick={() => handleOpenBooking(srv.name)}
                  style={{
                    width: '100%',
                    backgroundColor: '#FFFFFF',
                    color: '#6E42E5',
                    border: '1.5px solid #6E42E5',
                    borderRadius: 8,
                    padding: '5px 0',
                    fontWeight: 900,
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 5px rgba(110, 66, 229, 0.12)'
                  }}
                >
                  ADD +
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- TRENDING SERVICES SECTION --- */}
      <section id="trending" style={{ backgroundColor: '#FFFFFF', padding: '32px 14px', borderTop: '1px solid #E0E0E0', borderBottom: '1px solid #E0E0E0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#101010', marginBottom: 2 }}>
            Trending Services & Renovation
          </h2>
          <p style={{ fontSize: '0.78rem', color: '#757575', marginBottom: 16 }}>Most booked home upgrades this month</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 14 }}>
            {TRENDING_SERVICES.map((t, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#F5F5F7',
                  borderRadius: 14,
                  overflow: 'hidden',
                  border: '1px solid #E0E0E0',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ position: 'relative', height: 140, overflow: 'hidden' }}>
                  <img 
                    src={t.image} 
                    alt={t.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  <span 
                    style={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      backgroundColor: '#101010',
                      color: '#FFFFFF',
                      fontSize: '0.6rem',
                      fontWeight: 800,
                      padding: '3px 8px',
                      borderRadius: 10
                    }}
                  >
                    {t.tag}
                  </span>
                </div>

                <div style={{ padding: 12, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#101010', marginBottom: 3 }}>{t.title}</h3>
                    <p style={{ fontSize: '0.75rem', color: '#757575', lineHeight: 1.35 }}>{t.desc}</p>
                  </div>

                  <button
                    onClick={() => handleOpenBooking(t.title)}
                    style={{
                      marginTop: 12,
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #101010',
                      color: '#101010',
                      padding: '6px 12px',
                      borderRadius: 8,
                      fontWeight: 800,
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 4
                    }}
                  >
                    Book Consultation <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- POPULAR PLUMBING PACKAGES (360° INTERACTIVE 3D PERSPECTIVE FLIP CARDS) --- */}
      <section id="packages" style={{ maxWidth: 1200, margin: '32px auto', padding: '0 14px' }}>
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#101010' }}>
            3D Interactive Plumbing Packages
          </h2>
          <p style={{ fontSize: '0.78rem', color: '#757575' }}>Tap card or hover for 360° interactive 3D model details</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {PACKAGES.map((pkg, idx) => (
            <motion.div
              key={idx}
              whileHover={{ rotateY: 10, rotateX: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 20,
                padding: 22,
                border: pkg.popular ? '2px solid #6E42E5' : '1px solid #E0E0E0',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: pkg.popular ? '0 12px 30px rgba(110, 66, 229, 0.2)' : '0 6px 18px rgba(0,0,0,0.05)',
                transformStyle: 'preserve-3d'
              }}
            >
              <div style={{ position: 'absolute', top: 12, right: 14, backgroundColor: '#6E42E5', color: '#FFFFFF', fontSize: '0.62rem', fontWeight: 900, padding: '3px 8px', borderRadius: 8 }}>
                {pkg.badge}
              </div>

              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#101010' }}>{pkg.name}</h3>
                
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '10px 0' }}>
                  <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#101010' }}>{pkg.price}</span>
                  <span style={{ fontSize: '0.85rem', color: '#757575', textDecoration: 'line-through' }}>{pkg.originalPrice}</span>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '14px 0' }}>
                  {pkg.features.map((feat, fIdx) => (
                    <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: '#424242', marginBottom: 8 }}>
                      <CheckCircle size={14} color="#6E42E5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleOpenBooking(pkg.name)}
                style={{
                  width: '100%',
                  backgroundColor: pkg.popular ? '#6E42E5' : '#101010',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '10px 0',
                  borderRadius: 10,
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  marginTop: 10
                }}
              >
                Book Package
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us" style={{ backgroundColor: '#FFFFFF', padding: '32px 14px', borderTop: '1px solid #E0E0E0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#101010', marginBottom: 16 }}>
            Urban Guarantee for Narayan Plumbing
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            {WHY_CHOOSE.map((item, idx) => (
              <div 
                key={idx}
                style={{
                  backgroundColor: '#F5F5F7',
                  borderRadius: 14,
                  padding: 14,
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start'
                }}
              >
                <div style={{ fontSize: '1.6rem' }}>{item.icon}</div>
                <div>
                  <h3 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#101010', marginBottom: 2 }}>{item.title}</h3>
                  <p style={{ fontSize: '0.75rem', color: '#757575', lineHeight: 1.35 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CUSTOMER REVIEWS (SMOOTH HORIZONTAL SLIDING ANIMATION CAROUSEL) --- */}
      <section id="reviews" style={{ maxWidth: 1200, margin: '32px auto', padding: '0 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#101010' }}>
            Customer Reviews
          </h2>
          <span style={{ fontSize: '0.75rem', color: '#6E42E5', fontWeight: 700 }}>Swipe →</span>
        </div>

        {/* Smooth Horizontal Carousel Container */}
        <div 
          ref={reviewsContainerRef}
          className="no-scrollbar"
          style={{ 
            display: 'flex', 
            gap: 14, 
            overflowX: 'auto', 
            paddingBottom: 10,
            scrollSnapType: 'x mandatory'
          }}
        >
          {REVIEWS.map((rev, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ scale: 1.02 }}
              style={{ 
                minWidth: 260,
                maxWidth: 280,
                backgroundColor: '#FFFFFF', 
                borderRadius: 16, 
                padding: 16, 
                border: '1px solid #E0E0E0',
                scrollSnapAlign: 'start',
                flexShrink: 0,
                boxShadow: '0 3px 10px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <div>
                  <h4 style={{ fontWeight: 800, color: '#101010', fontSize: '0.88rem' }}>{rev.name}</h4>
                  <span style={{ fontSize: '0.7rem', color: '#757575' }}>{rev.area}</span>
                </div>
                <span style={{ fontSize: '0.7rem', color: '#9E9E9E' }}>{rev.time}</span>
              </div>
              <div style={{ display: 'flex', color: '#FFB800', marginBottom: 6 }}>
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={12} fill="#FFB800" color="#FFB800" />
                ))}
              </div>
              <p style={{ fontSize: '0.8rem', color: '#424242', lineHeight: 1.4 }}>"{rev.comment}"</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- FAQS --- */}
      <section id="faqs" style={{ backgroundColor: '#FFFFFF', padding: '32px 14px', borderTop: '1px solid #E0E0E0' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#101010', marginBottom: 16 }}>
            Frequently Asked Questions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FAQS.map((faq, idx) => (
              <div 
                key={idx}
                style={{
                  border: '1px solid #E0E0E0',
                  borderRadius: 10,
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    backgroundColor: '#F5F5F7',
                    border: 'none',
                    textAlign: 'left',
                    fontWeight: 700,
                    color: '#101010',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>{faq.q}</span>
                  <ChevronRight size={14} style={{ transform: openFaq === idx ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>

                {openFaq === idx && (
                  <div style={{ padding: '12px 14px', fontSize: '0.8rem', color: '#616161', lineHeight: 1.45, backgroundColor: '#FFFFFF' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer style={{ backgroundColor: '#101010', color: '#9E9E9E', padding: '32px 14px 90px 14px', fontSize: '0.8rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
          <div>
            <h3 style={{ color: '#FFFFFF', fontWeight: 900, fontSize: '1.1rem', marginBottom: 10 }}>
              NARAYAN <span style={{ color: '#6E42E5' }}>PLUMBING</span>
            </h3>
            <p style={{ lineHeight: 1.4 }}>
              Urban Company verified plumbing professionals. 30-minute rapid doorstep service across Bangalore.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#FFFFFF', fontWeight: 800, marginBottom: 10 }}>Contact Details</h4>
            <p>📞 Phone: <a href={`tel:${PHONE_NUMBER}`} style={{ color: '#00D4FF', textDecoration: 'none' }}><strong>{PHONE_DISPLAY}</strong></a></p>
            <p style={{ margin: '4px 0' }}>📍 Address: Citywide Service Hub, Bangalore</p>
            <p>⏰ Hours: 24 Hours / 7 Days Open</p>
          </div>

          <div>
            <h4 style={{ color: '#FFFFFF', fontWeight: 800, marginBottom: 10 }}>Our Guarantees</h4>
            <p>✔ 30-Min Rapid Arrival</p>
            <p style={{ margin: '4px 0' }}>✔ 30 Days Free Warranty</p>
            <p>✔ Upfront Rate Card</p>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: '24px auto 0 auto', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', fontSize: '0.7rem' }}>
          © {new Date().getFullYear()} Narayan Plumbing Services. All Rights Reserved.
        </div>
      </footer>

      {/* --- NATIVE MOBILE APP BOTTOM NAVIGATION BAR --- */}
      <div 
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 56,
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #E0E0E0',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          zIndex: 1000,
          boxShadow: '0 -4px 15px rgba(0,0,0,0.06)'
        }}
      >
        <button 
          onClick={() => { setActiveTab('Home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{ background: 'none', border: 'none', color: activeTab === 'Home' ? '#6E42E5' : '#757575', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
        >
          <Home size={18} />
          <span style={{ fontSize: '0.62rem', marginTop: 2, fontWeight: 700 }}>UC Home</span>
        </button>

        <button 
          onClick={() => { setActiveTab('Services'); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}
          style={{ background: 'none', border: 'none', color: activeTab === 'Services' ? '#6E42E5' : '#757575', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
        >
          <Wrench size={18} />
          <span style={{ fontSize: '0.62rem', marginTop: 2, fontWeight: 700 }}>Services</span>
        </button>

        <button 
          onClick={() => handleOpenBooking()}
          style={{ background: 'none', border: 'none', color: '#6E42E5', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', position: 'relative' }}
        >
          <ShoppingBag size={18} />
          <span style={{ fontSize: '0.62rem', marginTop: 2, fontWeight: 800 }}>Cart</span>
          {cartCount > 0 && (
            <span style={{ position: 'absolute', top: -3, right: 8, backgroundColor: '#FF5A1F', color: '#FFFFFF', fontSize: '0.55rem', fontWeight: 900, borderRadius: '50%', width: 14, height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {cartCount}
            </span>
          )}
        </button>

        <a 
          href={`tel:${PHONE_NUMBER}`}
          style={{ textDecoration: 'none', color: '#757575', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <Phone size={18} color="#25D366" />
          <span style={{ fontSize: '0.62rem', marginTop: 2, fontWeight: 700, color: '#757575' }}>Call Pro</span>
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
          bottom: 68,
          right: 14,
          width: 44,
          height: 44,
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
        <MessageSquare size={22} />
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
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(4px)',
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 14
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 18,
                width: '100%',
                maxWidth: 460,
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                position: 'relative'
              }}
            >
              {/* Modal Header */}
              <div style={{ backgroundColor: '#101010', color: '#FFFFFF', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 900 }}>Schedule Service Visit</h3>
                  <p style={{ fontSize: '0.72rem', color: '#00D4FF', margin: 0 }}>Technician arrives at your doorstep in 30 mins</p>
                </div>
                <button 
                  onClick={() => setBookingModalOpen(false)}
                  style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#FFFFFF', width: 30, height: 30, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <X size={16} />
                </button>
              </div>

              {submitted ? (
                <div style={{ padding: 32, textAlign: 'center' }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{ width: 60, height: 60, borderRadius: '50%', backgroundColor: '#25D366', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto' }}
                  >
                    <CheckCircle size={36} />
                  </motion.div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#101010' }}>Booking Confirmed!</h3>
                  <p style={{ color: '#757575', fontSize: '0.85rem', marginTop: 6 }}>
                    Our master plumber will call you within 5 minutes to confirm exact doorstep location.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} style={{ padding: 20 }}>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#424242', display: 'block', marginBottom: 4 }}>
                      Select Service
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: '0.85rem', outline: 'none' }}
                    >
                      {CORE_SERVICES.map((s) => (
                        <option key={s.id} value={s.name}>{s.name} ({s.price})</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#424242', display: 'block', marginBottom: 4 }}>
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: '0.85rem', outline: 'none' }}
                    />
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#424242', display: 'block', marginBottom: 4 }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: '0.85rem', outline: 'none' }}
                    />
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#424242', display: 'block', marginBottom: 4 }}>
                      Complete Address / Flat No. *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="House/Flat No., Landmark, Area"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #E0E0E0', fontSize: '0.85rem', outline: 'none' }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      backgroundColor: '#6E42E5',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '12px',
                      borderRadius: 10,
                      fontWeight: 900,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      marginTop: 6,
                      boxShadow: '0 4px 14px rgba(110, 66, 229, 0.4)'
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
