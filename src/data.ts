import type {
  Service,
} from './types';

export const CORE_SERVICES: Service[] = [
  { id: 'plumbing', name: 'Plumbing Services', icon: '/service-card-plumbing.webp', desc: 'SERVICES' },
  { id: 'civil', name: 'Civil Work', icon: '/service-card-civil.webp', desc: 'WORK' },
  { id: 'bathroom', name: 'Bathroom Renovation', icon: '/service-card-bathroom.webp', desc: 'RENOVATION' },
  { id: 'cleaning', name: 'Cleaning Services', icon: '/service-card-cleaning.webp', desc: 'SERVICES' },
  { id: 'painting', name: 'Painting Services', icon: '/service-card-painting.webp', desc: 'SERVICES' },
  { id: 'tiles', name: 'Tiles & Granite Works', icon: '/service-card-tiles.webp', desc: 'WORKS' },
  { id: 'electrical', name: 'Electrical Work', icon: '/service-card-electrical.webp', desc: 'WORK' },
  { id: 'ceiling', name: 'False Ceiling Work', icon: '/service-card-ceiling.webp', desc: 'WORK' },
  { id: 'construction', name: 'Construction Work', icon: '/service-card-construction.webp', desc: 'WORK' },
  { id: 'interior', name: 'Interior Design', icon: '/service-card-interior.webp', desc: 'DESIGN' },
  { id: 'home-renovation', name: 'Home Renovation', icon: '/service-card-home-renovation.webp', desc: 'RENOVATION' },
  { id: 'carpenter', name: 'Carpenter Work', icon: '/service-card-carpenter.webp', desc: 'WORK' },
  { id: 'home-maintenance', name: 'Home Maintenance', icon: '/service-card-home-maintenance.webp', desc: 'MAINTENANCE' },
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
