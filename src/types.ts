export interface Service {
  id: string;
  name: string;
  icon: string;
  desc: string;
  price: string;
  rating: string;
}

export interface QuickCategory {
  id: string;
  name: string;
  icon: string;
  price: string;
  rating: string;
}

export interface TrendingService {
  title: string;
  tag: string;
  image: string;
  desc: string;
}

export interface ServicePackage {
  name: string;
  price: string;
  originalPrice: string;
  popular: boolean;
  badge: string;
  features: string[];
}

export interface WhyChoose {
  title: string;
  desc: string;
  icon: string;
}

export interface Review {
  name: string;
  area: string;
  rating: number;
  time: string;
  comment: string;
}

export interface Faq {
  q: string;
  a: string;
}

export type BookingStatus = 'New' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface Booking {
  id: string;
  name: string;
  phone: string;
  address: string;
  service: string;
  price: string;
  date: string;
  dateISO: string;
  timeSlot: string;
  notes: string;
  status: BookingStatus;
  createdAt: string;
}

export const PHONE_NUMBER = '9606157745';
export const PHONE_DISPLAY = '+91 96061 57745';
