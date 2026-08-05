import type {
  Service,
} from './types';

export const CORE_SERVICES: Service[] = [
  { id: 'plumbing', name: 'Plumbing Services', icon: '🚰', desc: 'Complete Plumbing Solutions' },
  { id: 'bathroom', name: 'Bathroom Renovation', icon: '🛁', desc: 'Modern Bathroom Makeovers' },
  { id: 'painting', name: 'Painting Services', icon: '🎨', desc: 'Interior & Exterior Painting' },
  { id: 'construction', name: 'Construction Work', icon: '🏗️', desc: 'Building & Construction' },
  { id: 'tiles', name: 'Tiles & Granite Work', icon: '🧱', desc: 'Flooring & Wall Tiles' },
  { id: 'civil', name: 'Civil Work', icon: '👷', desc: 'Structural & Civil Engineering' },
  { id: 'carpenter', name: 'Carpenter Work', icon: '🪚', desc: 'Wood & Furniture Work' },
  { id: 'electrical', name: 'Electrical Work', icon: '⚡', desc: 'Wiring & Electrical Solutions' },
  { id: 'ceiling', name: 'False Ceiling Work', icon: '/service-icons/ceiling-light.png', desc: 'Modern Ceiling Designs' },
  { id: 'interior', name: 'Interior Design', icon: '🛋️', desc: 'Complete Interior Solutions' },
];

export const HERO_CAROUSEL_IMAGES = [
  { src: '/hero/banner-1.webp', alt: 'Narayan Plumbing — complete plumbing solutions at your doorstep' },
  { src: '/hero/banner-2.webp', alt: 'Narayan Plumbing — solutions that flow, care that lasts' },
  { src: '/hero/banner-3.webp', alt: 'Narayan Plumbing — expert plumbers on time every time' },
  { src: '/hero/banner-4.webp', alt: 'Narayan Plumbing — protect your home from leaks and damage' },
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
