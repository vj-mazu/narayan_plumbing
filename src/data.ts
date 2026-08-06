import type {
  Service,
} from './types';

export const CORE_SERVICES: Service[] = [
  { id: 'plumbing', name: 'Plumbing Services', icon: '/service-card-plumbing.webp', desc: 'SERVICES', bgImage: '/service-card-plumbing.webp' },
  { id: 'painting', name: 'Painting Services', icon: '/service-card-painting.webp', desc: 'SERVICES', bgImage: '/service-card-painting.webp' },
  { id: 'tiles', name: 'Tiles & Granite Works', icon: '/service-card-tiles.webp', desc: 'WORKS', bgImage: '/service-card-tiles.webp' },
  { id: 'electrical', name: 'Electrical Work', icon: '/service-card-electrical.webp', desc: 'WORK', bgImage: '/service-card-electrical.webp' },
  { id: 'ceiling', name: 'False Ceiling Work', icon: '/service-card-ceiling.webp', desc: 'WORK', bgImage: '/service-card-ceiling.webp' },
  { id: 'bathroom', name: 'Bathroom Renovation', icon: '/service-card-bathroom.webp', desc: 'RENOVATION', bgImage: '/service-card-bathroom.webp' },
  { id: 'interior', name: 'Interior Design', icon: '/service-card-interior.webp', desc: 'WORK', bgImage: '/service-card-interior.webp' },
  { id: 'construction', name: 'Construction Work', icon: '/service-card-construction.webp', desc: 'WORK', bgImage: '/service-card-construction.webp' },
  { id: 'civil', name: 'Civil Work', icon: '/service-card-civil.webp', desc: 'WORK', bgImage: '/service-card-civil.webp' },
];

export const HERO_CAROUSEL_IMAGES = [
  { src: '/hero/banner-1.webp', alt: 'Narayan Plumbing Services — beautiful home interiors served' },
  { src: '/hero/banner-2.webp', alt: 'Narayan Plumbing Services — expert plumber at work under sink' },
  { src: '/hero/banner-3.webp', alt: 'Narayan Plumbing Services — professional home cleaning service' },
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
