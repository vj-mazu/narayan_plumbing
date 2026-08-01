import type {
  Service,
  QuickCategory,
  TrendingService,
  ServicePackage,
  WhyChoose,
  Review,
  Faq,
} from './types';

export const QUICK_CATEGORIES: QuickCategory[] = [
  { id: 'tap', name: 'Tap Repair', icon: '🚰', price: '₹149', rating: '4.8' },
  { id: 'toilet', name: 'WC & Toilet', icon: '🚽', price: '₹349', rating: '4.9' },
  { id: 'pipe', name: 'Leakage Repair', icon: '🔧', price: '₹199', rating: '4.8' },
  { id: 'drain', name: 'Drain Unblock', icon: '🌪️', price: '₹399', rating: '4.7' },
  { id: 'geyser', name: 'Geyser Service', icon: '♨️', price: '₹349', rating: '4.9' },
  { id: 'tank', name: 'Tank Cleaning', icon: '🛢️', price: '₹699', rating: '4.8' },
];

export const CORE_SERVICES: Service[] = [
  { id: 'tap', name: 'Tap Installation & Repair', icon: '🚰', desc: 'Leaking taps, mixer replacement, cartridge repair & fitting.', price: '₹149', rating: '4.8 ★' },
  { id: 'shower', name: 'Shower Installation & Repair', icon: '🚿', desc: 'Wall mixer, rain showerhead, pressure boosting & repair.', price: '₹249', rating: '4.9 ★' },
  { id: 'toilet', name: 'Toilet (WC) Installation & Repair', icon: '🚽', desc: 'Flush tank leak repair, western/commode installation & gasket.', price: '₹349', rating: '4.8 ★' },
  { id: 'basin', name: 'Wash Basin Installation & Repair', icon: '🧼', desc: 'Pedestal basin, counter basin & bottle trap replacement.', price: '₹299', rating: '4.7 ★' },
  { id: 'kitchen', name: 'Kitchen Sink Installation & Repair', icon: '🥣', desc: 'Sink clogged drain, waste pipe replacement & coupling.', price: '₹249', rating: '4.9 ★' },
  { id: 'pipe-leak', name: 'Pipe Leak Repair', icon: '🔧', desc: 'Concealed wall leaks, joint sealing & copper/CPVC patching.', price: '₹199', rating: '4.9 ★' },
  { id: 'pipe-inst', name: 'Pipe Installation & Replacement', icon: '🔩', desc: 'New water pipeline layout, CPVC/UPVC fitting & line extension.', price: '₹499', rating: '4.8 ★' },
  { id: 'drain', name: 'Drain Blockage Cleaning', icon: '🌪️', desc: 'High-pressure drain jetting, floor trap unblocking & snake line.', price: '₹399', rating: '4.8 ★' },
  { id: 'tank', name: 'Water Tank Installation & Clean', icon: '🛢️', desc: 'Overhead tank fitting, auto-cut valve, float valve & clean tank.', price: '₹699', rating: '4.9 ★' },
  { id: 'geyser', name: 'Geyser Installation & Repair', icon: '♨️', desc: 'Thermostat repair, heating element, inlet connection & mounting.', price: '₹349', rating: '4.9 ★' },
  { id: 'bath-plumb', name: 'Bathroom Plumbing Services', icon: '🛀', desc: 'Complete sanitaryware overhaul, diverters & fittings.', price: '₹599', rating: '4.8 ★' },
  { id: 'emergency', name: 'Emergency Plumbing Service', icon: '🚨', desc: '24/7 priority burst pipe, main valve leak & midnight emergency.', price: '₹499', rating: '5.0 ★' },
];

export const TRENDING_SERVICES: TrendingService[] = [
  { title: 'Bathroom Renovation', tag: 'POPULAR', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=75', desc: 'Luxury marble layouts, concealed diverters & rain shower systems.' },
  { title: 'Kitchen Renovation', tag: 'HOT', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=75', desc: 'Modular plumbing, under-sink RO setup & heavy-duty waste fittings.' },
  { title: 'Complete Plumbing', tag: 'BEST VALUE', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=75', desc: 'Whole house piping, pressure pump integration & valve overhaul.' },
  { title: 'Water Tank Cleaning', tag: 'HYGIENE', image: '/tank.webp', desc: 'High-pressure jet washing, vacuum sludger & UV sanitization.' },
  { title: 'Waterproofing Solutions', tag: 'PROTECT', image: '/waterproof.webp', desc: 'Seepage treatment, slab crack injection & tile chemical coating.' },
  { title: 'CPVC / UPVC Pipeline', tag: 'DURABLE', image: '/cpvc.webp', desc: 'Lead-free food grade piping with 10-year joint leak guarantee.' },
  { title: 'Geyser Installation', tag: 'WINTER CARE', image: '/geyser.webp', desc: 'Instant & storage water heater mounting with safety valve test.' },
  { title: 'Drain Cleaning', tag: 'EXPRESS', image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=600&q=75', desc: 'Camera line inspection & heavy motorized drain auger clearance.' },
];

export const PACKAGES: ServicePackage[] = [
  {
    name: 'Essential Home Checkup',
    price: '₹499',
    originalPrice: '₹999',
    popular: false,
    badge: '360° INSPECTION',
    features: [
      'Whole house tap & valve inspection',
      'Flush tank leak assessment',
      'Minor joint tightening included',
      'Water pressure testing',
      'Free quotation for repairs',
    ],
  },
  {
    name: 'Complete Bathroom Care',
    price: '₹1,299',
    originalPrice: '₹2,499',
    popular: true,
    badge: 'PREMIUM CARE',
    features: [
      'Deep cleaning of all shower heads',
      '2 tap valve/washer replacements',
      'Drain trap descaling & clearing',
      'Geyser safety valve inspection',
      'Anti-leak seal application',
    ],
  },
  {
    name: 'Full House Plumbing Audit',
    price: '₹2,499',
    originalPrice: '₹4,599',
    popular: false,
    badge: 'VIP ALL-IN-ONE',
    features: [
      'Overhead water tank sanitization check',
      'All bathroom & kitchen fixtures service',
      'Main line pressure & leak test',
      'Free 2 minor repair labour jobs',
      '30-day unconditional warranty',
    ],
  },
];

export const WHY_CHOOSE: WhyChoose[] = [
  { title: '30 Minutes Doorstep Service', desc: 'GPS tracked local plumbers stationed nearby for rapid response.', icon: '⚡' },
  { title: 'Verified & Trained Experts', desc: 'Background checked professionals with 5+ years hands-on experience.', icon: '🛡️' },
  { title: 'Transparent Upfront Pricing', desc: 'Rate card approval before starting work. Zero hidden surprise fees.', icon: '🏷️' },
  { title: 'Genuine Parts & Quality Work', desc: 'Original ISI-certified fittings from top brands (Jaquar, Astral, Supreme).', icon: '🧰' },
  { title: '30 Days Service Warranty', desc: 'Free re-visit and fix if issues recur within 30 days of completion.', icon: '📅' },
  { title: 'No Hidden Charges', desc: 'Honest billing with invoice details for every single component.', icon: '🚫' },
];

export const REVIEWS: Review[] = [
  { name: 'Rajesh Kumar', area: 'Indiranagar', rating: 5, time: '2 days ago', comment: 'Came in 20 minutes! Fixed main pipe leak very fast. Highly professional work.' },
  { name: 'Priya Sharma', area: 'Koramangala', rating: 5, time: '1 week ago', comment: 'Geyser installation done smoothly. Very clean work and affordable price.' },
  { name: 'Anand Verma', area: 'Whitefield', rating: 5, time: '3 days ago', comment: 'Cleared clogged kitchen sink in no time. Transparent pricing approved before work.' },
  { name: 'Suresh Menon', area: 'HSR Layout', rating: 5, time: '4 days ago', comment: 'Super fast response! Tap replacement done within 30 mins. Great experience.' },
  { name: 'Kavita Reddy', area: 'Jayanagar', rating: 5, time: 'Yesterday', comment: 'Clean water tank service. Courteous plumber with genuine rates.' },
];

export const FAQS: Faq[] = [
  { q: 'How fast will the plumber reach my house?', a: 'We guarantee a technician at your doorstep within 30 minutes of booking in all covered Bangalore locations.' },
  { q: 'Are your plumbers background verified?', a: 'Yes, 100% of our plumbers are police background checked, identity verified and certified.' },
  { q: 'Do you offer warranty on repair work?', a: 'Yes, every service comes with a 30-day unconditional service warranty.' },
];

export const AREAS_SERVED = [
  'Indiranagar', 'Koramangala', 'Whitefield', 'HSR Layout', 'Jayanagar',
  'J. P. Nagar', 'Bannerghatta Road', 'Electronic City', 'Marathahalli', 'Malleshwaram',
];

export const TIME_SLOTS = ['9 AM – 12 PM', '12 PM – 3 PM', '3 PM – 6 PM', '6 PM – 9 PM', '9 PM – 12 AM'];
