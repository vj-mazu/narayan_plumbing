export interface Service {
  id: string;
  name: string;
  icon: string;
  desc: string;
  bgImage?: string;
}

export type BookingStatus = 'New' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface Booking {
  id: string;
  name: string;
  phone: string;
  address: string;
  service: string;
  date: string;
  dateISO: string;
  timeSlot: string;
  status: BookingStatus;
  createdAt: string;
}

export const PHONE_NUMBER = '9606157745';
export const PHONE_DISPLAY = '+91 96061 57745';
