import type {
  Service,
} from './types';

export const CORE_SERVICES: Service[] = [
  { id: 'plumbing', name: 'Plumbing Services', icon: '🚰', desc: 'Complete Plumbing Solutions', bgImage: '/services/plumbing.jpg' },
  { id: 'bathroom', name: 'Bathroom Renovation', icon: '🛁', desc: 'Modern Bathroom Makeovers', bgImage: '/services/bathroom.jpg' },
  { id: 'painting', name: 'Painting Services', icon: '🎨', desc: 'Interior & Exterior Painting', bgImage: '/services/painting.jpg' },
  { id: 'construction', name: 'Construction Work', icon: '🏗️', desc: 'Building & Construction', bgImage: '/services/construction.jpg' },
  { id: 'tiles', name: 'Tiles & Granite Work', icon: '🧱', desc: 'Flooring & Wall Tiles', bgImage: '/services/tiles.jpg' },
  { id: 'civil', name: 'Civil Work', icon: '👷', desc: 'Structural & Civil Engineering', bgImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80' },
  { id: 'carpenter', name: 'Carpenter Work', icon: '🪚', desc: 'Wood & Furniture Work', bgImage: '/services/carpenter.jpg' },
  { id: 'electrical', name: 'Electrical Work', icon: '⚡', desc: 'Wiring & Electrical Solutions', bgImage: '/services/electrical.jpg' },
  { id: 'ceiling', name: 'False Ceiling Work', icon: '/service-icons/ceiling-light.png', desc: 'Modern Ceiling Designs', bgImage: '/services/ceiling.jpg' },
  { id: 'interior', name: 'Interior Design', icon: '🛋️', desc: 'Complete Interior Solutions', bgImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80' },
];

export const HERO_CAROUSEL_IMAGES = [
  { src: '/hero/banner-1.png', alt: 'Narayan Plumbing Services — 24/7 service available' },
  { src: '/hero/banner-2.png', alt: 'Narayan Plumbing Services — expert plumbers on time' },
  { src: '/hero/banner-3.png', alt: 'Narayan Plumbing Services — professional plumbing solutions' },
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
