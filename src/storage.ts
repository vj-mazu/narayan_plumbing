import type { Booking, BookingStatus } from './types';

export const STORAGE_KEY = 'narayan_bookings_v1';
const PIN_KEY = 'narayan_admin_pin';
const DEFAULT_PIN = '1234';

function readRaw(): Booking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(bookings: Booking[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

export function getBookings(): Booking[] {
  return readRaw().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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

export function updateBookingStatus(id: string, status: BookingStatus): Booking[] {
  const all = readRaw().map((b) => (b.id === id ? { ...b, status } : b));
  write(all);
  return all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function deleteBooking(id: string): Booking[] {
  const all = readRaw().filter((b) => b.id !== id);
  write(all);
  return all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function clearAllBookings(): Booking[] {
  write([]);
  return [];
}

// --- Admin PIN ---
export function getPin(): string {
  return localStorage.getItem(PIN_KEY) || DEFAULT_PIN;
}

export function verifyPin(input: string): boolean {
  return input.trim() === getPin();
}

export function setPin(newPin: string) {
  localStorage.setItem(PIN_KEY, newPin.trim());
}

export function defaultPin(): string {
  return DEFAULT_PIN;
}
