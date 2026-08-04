import type { Booking } from './types';

function readRaw(): Booking[] {
  try {
    const raw = localStorage.getItem('narayan_bookings_v1');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(bookings: Booking[]) {
  localStorage.setItem('narayan_bookings_v1', JSON.stringify(bookings));
}

export function createBooking(data: Omit<Booking, 'id' | 'status' | 'createdAt'>): Booking {
  const id = 'NPS-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
  const booking: Booking = {
    ...data,
    id,
    status: 'New',
    createdAt: new Date().toISOString(),
  };
  const all = readRaw();
  all.push(booking);
  write(all);
  return booking;
}
