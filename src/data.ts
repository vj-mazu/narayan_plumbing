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
  { id: 'site-visit', name: 'Book Site Visit', icon: '🏠', desc: 'Free on-site inspection and cost estimation for your plumbing needs.', price: '₹0', rating: '5.0 ★' },
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

export const SERVICE_DISPLAY = [
  { id: 'tap', shortName: 'Tap', subtitle: 'Installation & Repair' },
  { id: 'shower', shortName: 'Shower', subtitle: 'Installation & Repair' },
  { id: 'toilet', shortName: 'Toilet (WC)', subtitle: 'Installation & Repair' },
  { id: 'basin', shortName: 'Wash Basin', subtitle: 'Installation & Repair' },
  { id: 'kitchen', shortName: 'Kitchen Sink', subtitle: 'Installation & Repair' },
  { id: 'pipe-leak', shortName: 'Pipe Leak', subtitle: 'Leak Detection & Repair' },
  { id: 'pipe-inst', shortName: 'Pipe Fitting', subtitle: 'Installation & Replacement' },
  { id: 'drain', shortName: 'Drain Blockage', subtitle: 'Cleaning & Unclogging' },
  { id: 'tank', shortName: 'Water Tank', subtitle: 'Installation & Cleaning' },
  { id: 'geyser', shortName: 'Geyser', subtitle: 'Installation & Repair' },
  { id: 'bath-plumb', shortName: 'Bathroom Plumbing', subtitle: 'Complete Solutions' },
  { id: 'emergency', shortName: 'Emergency Service', subtitle: '24/7 Rapid Response', emergency: true },
];

export const TRENDING_SERVICES: TrendingService[] = [
  {
    title: 'Bathroom Renovation',
    tag: 'TRENDING',
    image: '/trending/trending-1.png',
    desc: 'Complete bathroom makeover with modern fittings, tiles, and fixtures.',
  },
  {
    title: 'Kitchen Sink Services',
    tag: 'TRENDING',
    image: '/trending/trending-2.png',
    desc: 'Professional sink installation, repair, and drainage solutions.',
  },
  {
    title: 'Water Tank Installation',
    tag: 'TRENDING',
    image: '/tank.webp',
    desc: 'Expert overhead tank fitting, cleaning, and maintenance services.',
  },
  {
    title: 'Geyser Installation & Repair',
    tag: 'TRENDING',
    image: '/geyser-trending.png',
    desc: 'Professional water heater installation and repair for all brands.',
  },
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
  { title: '30 Minutes', desc: 'Doorstep Service', icon: '⚡' },
  { title: 'Verified', desc: 'Trained Experts', icon: '🛡️' },
  { title: 'Upfront', desc: 'Transparent Pricing', icon: '🏷️' },
  { title: 'Quality', desc: 'Genuine Parts & Work', icon: '🧰' },
  { title: '30 Days', desc: 'Service Warranty', icon: '📅' },
  { title: 'No Hidden', desc: 'Charges Ever', icon: '🚫' },
];

export const WHY_CHOOSE_DISPLAY = [
  { title: '30 Minutes', subtitle: 'Doorstep Service' },
  { title: 'Verified', subtitle: 'Trained Experts' },
  { title: 'Upfront', subtitle: 'Transparent Pricing' },
  { title: 'Quality', subtitle: 'Genuine Parts & Work' },
  { title: '30 Days', subtitle: 'Service Warranty' },
  { title: 'No Hidden', subtitle: 'Charges Ever' },
];

export const WHY_CHOOSE_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=500&q=80',
    alt: 'Premium CPVC and Ashirvad quality pipes',
    label: 'Ashirvad & CPVC Pipes',
  },
  {
    src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80',
    alt: 'Professional trained plumbing expert',
    label: 'Expert Professionals',
  },
  {
    src: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=500&q=80',
    alt: 'Skilled worker installing plumbing fixtures',
    label: 'Trained Workers',
  },
  {
    src: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=500&q=80',
    alt: 'Quality plumbing tools and fittings',
    label: 'Quality Fittings',
  },
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

export const HERO_CAROUSEL_IMAGES = [
  { src: '/hero/banner-1.jpg', alt: 'Narayan Plumbing — complete plumbing solutions at your doorstep' },
  { src: '/hero/banner-2.jpg', alt: 'Narayan Plumbing — solutions that flow, care that lasts' },
  { src: '/hero/banner-3.jpg', alt: 'Narayan Plumbing — expert plumbers on time every time' },
  { src: '/hero/banner-4.jpg', alt: 'Narayan Plumbing — protect your home from leaks and damage' },
];

export interface Testimonial {
  id: string;
  customerName: string;
  location: string;
  reviewText: string;
  rating: number;
  date?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    customerName: 'Ramesh K.',
    location: 'Whitefield',
    reviewText: 'Plumber arrived within 30 minutes for a bathroom pipe leak. Clean work and price exactly as quoted.',
    rating: 5,
  },
  {
    id: '2',
    customerName: 'Priya S.',
    location: 'Jayanagar',
    reviewText: 'Booked geyser installation in the morning, done by afternoon. Very polite and professional team.',
    rating: 5,
  },
  {
    id: '3',
    customerName: 'Imran A.',
    location: 'HSR Layout',
    reviewText: 'Our kitchen sink was fully blocked. They cleared it fast and even cleaned up afterwards. Highly recommend.',
    rating: 5,
  },
];
