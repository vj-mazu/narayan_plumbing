import { useEffect, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Phone, Calendar, Clock, Check, Package, Wrench } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CORE_SERVICES, PACKAGES, TIME_SLOTS } from './data';
import { createBooking } from './storage';
import { PHONE_NUMBER } from './types';

interface BookingModalProps {
  open: boolean;
  preselectedService?: string;
  onClose: () => void;
}

interface FormState {
  name: string;
  phone: string;
  email: string;
  address: string;
  services: string[];
  dateType: 'today' | 'tomorrow' | 'custom';
  customDate: string;
  timeSlot: string;
  notes: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  timeSlot?: string;
  services?: string;
}

const initialForm: FormState = {
  name: '',
  phone: '',
  email: '',
  address: '',
  services: ['Tap Installation & Repair'],
  dateType: 'today',
  customDate: '',
  timeSlot: '',
  notes: '',
};

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', weekday: 'short' });
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  const name = form.name.trim();
  const phone = form.phone.trim();
  const address = form.address.trim();

  // Name validation
  if (!name) {
    errors.name = 'Name is required';
  } else if (name.length > 100) {
    errors.name = 'Name must not exceed 100 characters';
  }

  // Phone validation
  if (!phone) {
    errors.phone = 'Phone number is required';
  } else if (!/^\d{10,15}$/.test(phone)) {
    errors.phone = 'Enter a valid 10-digit mobile number';
  }

  // Email validation (optional if empty, format check if entered)
  if (form.email.trim() && !/@.+/.test(form.email.trim())) {
    errors.email = 'Enter a valid email address';
  }

  // Address validation
  if (!address) {
    errors.address = 'Address is required';
  }

  // Service validation
  if (form.services.length === 0) {
    errors.services = 'Please select at least one service or package';
  }

  // Time slot validation
  if (!form.timeSlot) {
    errors.timeSlot = 'Please choose a time slot';
  }

  return errors;
}

export default function BookingModal({ open, preselectedService, onClose }: BookingModalProps) {
  const [form, setForm] = useState<FormState>({
    ...initialForm,
    services: preselectedService ? [preselectedService] : initialForm.services,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [bookingId, setBookingId] = useState<string | null>(null);

  // Combine packages and core services for complete visibility
  const packageItems = PACKAGES.map((p) => ({
    id: `pkg-${p.name}`,
    name: p.name,
    price: p.price,
    isPackage: true,
  }));

  const coreItems = CORE_SERVICES.map((s) => ({
    id: s.id,
    name: s.name,
    price: s.price,
    isPackage: false,
  }));

  // Ensure any custom preselectedService is included in the list
  const allServicesList = [...packageItems, ...coreItems];
  if (preselectedService && !allServicesList.some((s) => s.name === preselectedService)) {
    allServicesList.unshift({
      id: `custom-${preselectedService}`,
      name: preselectedService,
      price: '₹499',
      isPackage: preselectedService.toLowerCase().includes('package') || preselectedService.toLowerCase().includes('care'),
    });
  }

  // Re-initialize form when modal opens
  useEffect(() => {
    if (open) {
      setForm({
        ...initialForm,
        services: preselectedService ? [preselectedService] : initialForm.services,
      });
      setErrors({});
      setBookingId(null);
    }
  }, [open, preselectedService]);

  const close = () => {
    onClose();
  };

  const toggleService = (svcName: string) => {
    setForm((prev) => {
      const alreadySelected = prev.services.includes(svcName);
      let updated: string[];
      if (alreadySelected) {
        updated = prev.services.filter((s) => s !== svcName);
      } else {
        updated = [...prev.services, svcName];
      }
      return { ...prev, services: updated };
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const now = new Date();
    const todayISO = now.toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowISO = tomorrow.toISOString().split('T')[0];

    const dateISO =
      form.dateType === 'today' ? todayISO
      : form.dateType === 'tomorrow' ? tomorrowISO
      : form.customDate;

    const date =
      form.dateType === 'today' ? formatDate(now)
      : form.dateType === 'tomorrow' ? formatDate(tomorrow)
      : formatDate(new Date(form.customDate + 'T00:00:00'));

    // Compute total price across packages and core services
    let totalPrice = 0;
    form.services.forEach((sName) => {
      const match = allServicesList.find((s) => s.name === sName);
      if (match) {
        const val = parseInt(match.price.replace(/[^\d]/g, ''), 10) || 0;
        totalPrice += val;
      }
    });
    const priceStr = totalPrice > 0 ? `₹${totalPrice}` : '₹499';

    const booking = createBooking({
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      service: form.services.join(', '),
      price: priceStr,
      date,
      dateISO,
      timeSlot: form.timeSlot,
      notes: form.notes.trim(),
    });

    const whatsappMessage = [
      'Hi Narayan Plumbing Services, I want to book a service.',
      '',
      `Booking ID: ${booking.id}`,
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Selected Services/Packages: ${form.services.join(', ')}`,
      `Est. Total: ${priceStr}`,
      `Date: ${date}`,
      `Time: ${form.timeSlot}`,
      `Address: ${form.address.trim()}`,
      form.notes.trim() ? `Notes: ${form.notes.trim()}` : '',
    ].filter(Boolean).join('\n');

    window.location.href = `https://wa.me/91${PHONE_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

    setBookingId(booking.id);
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
  };

  const todayISO = new Date().toISOString().split('T')[0];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 14,
          }}
          onClick={close}
        >
          <motion.div
            key="panel"
            initial={{ scale: 0.92, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 24 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 18,
              width: '100%',
              maxWidth: 480,
              maxHeight: '92vh',
              overflowY: 'auto',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
              position: 'relative',
              overscrollBehavior: 'contain',
            }}
          >
            <div style={{ background: 'linear-gradient(135deg, #ff6200 0%, #FF8C42 100%)', color: '#FFFFFF', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 2 }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 900, margin: 0 }}>Book a Service or Package</h3>
                <p style={{ fontSize: '0.72rem', color: '#FFFFFF', margin: '2px 0 0 0', opacity: 0.95 }}>Technician arrives at your doorstep in 30 mins</p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close booking form"
                style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#FFFFFF', width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} />
              </button>
            </div>

            {bookingId ? (
              <div style={{ padding: 32, textAlign: 'center' }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: '#25D366', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto' }}
                >
                  <CheckCircle size={38} />
                </motion.div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#101010', margin: 0 }}>Booking Confirmed!</h3>
                <p style={{ color: '#757575', fontSize: '0.85rem', marginTop: 8 }}>
                  Booking ID: <strong style={{ color: '#ff6200' }}>{bookingId}</strong>
                </p>
                <p style={{ color: '#757575', fontSize: '0.85rem', marginTop: 4, lineHeight: 1.5 }}>
                  Our master plumber will call you within 5 minutes to confirm your doorstep location.
                </p>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    marginTop: 16,
                    backgroundColor: '#ff6200',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    padding: '10px 18px',
                    borderRadius: 10,
                    fontWeight: 800,
                    fontSize: '0.85rem',
                  }}
                >
                  <Phone size={16} /> Need help? Call us
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ padding: 20 }}>
                {/* Service / Package Selection */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#424242', display: 'block', marginBottom: 6 }}>
                    Select Package or Services (Choose one or multiple) *
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 6, maxHeight: 220, overflowY: 'auto', border: '1px solid #D0D5DD', padding: 10, borderRadius: 8, backgroundColor: '#FAFAFA' }}>
                    {/* Packages Section */}
                    <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#ff6200', padding: '4px 6px 2px', display: 'flex', alignItems: 'center', gap: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      <Package size={12} /> Service Packages
                    </div>
                    {packageItems.map((pkg) => {
                      const selected = form.services.includes(pkg.name);
                      return (
                        <button
                          key={pkg.id}
                          type="button"
                          onClick={() => toggleService(pkg.name)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 10px',
                            borderRadius: 6,
                            border: selected ? '2px solid #ff6200' : '1px solid #E0E0E0',
                            backgroundColor: selected ? '#FFF5F0' : '#FFFFFF',
                            textAlign: 'left',
                            cursor: 'pointer',
                            fontSize: '0.82rem',
                            fontWeight: selected ? 800 : 600,
                            color: selected ? '#ff6200' : '#222',
                          }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ background: '#ff6200', color: '#fff', fontSize: '0.62rem', fontWeight: 900, padding: '2px 6px', borderRadius: 4 }}>PACKAGE</span>
                            {pkg.name}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#ff6200' }}>{pkg.price}</span>
                            <span style={{ width: 18, height: 18, borderRadius: 4, border: '1.5px solid #BDBDBD', display: 'grid', placeItems: 'center', backgroundColor: selected ? '#ff6200' : '#FFFFFF', borderColor: selected ? '#ff6200' : '#BDBDBD' }}>
                              {selected && <Check size={12} color="#FFFFFF" />}
                            </span>
                          </span>
                        </button>
                      );
                    })}

                    {/* Individual Services Section */}
                    <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#555', padding: '8px 6px 2px', display: 'flex', alignItems: 'center', gap: 4, textTransform: 'uppercase', letterSpacing: '0.5px', borderTop: '1px solid #e5e5e5', marginTop: 4 }}>
                      <Wrench size={12} /> Individual Plumbing Services
                    </div>
                    {coreItems.map((s) => {
                      const selected = form.services.includes(s.name);
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => toggleService(s.name)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 10px',
                            borderRadius: 6,
                            border: selected ? '2px solid #ff6200' : '1px solid #E0E0E0',
                            backgroundColor: selected ? '#FFF5F0' : '#FFFFFF',
                            textAlign: 'left',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: selected ? 800 : 600,
                            color: selected ? '#ff6200' : '#424242',
                          }}
                        >
                          <span>{s.name}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontSize: '0.75rem', color: '#757575' }}>({s.price})</span>
                            <span style={{ width: 18, height: 18, borderRadius: 4, border: '1.5px solid #BDBDBD', display: 'grid', placeItems: 'center', backgroundColor: selected ? '#ff6200' : '#FFFFFF', borderColor: selected ? '#ff6200' : '#BDBDBD' }}>
                              {selected && <Check size={12} color="#FFFFFF" />}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.services && <span style={{ fontSize: '0.72rem', color: '#E11D48', marginTop: 3, display: 'block' }}>{errors.services}</span>}
                </div>

                <div style={{ marginBottom: 12 }}>
                  <label htmlFor="name" style={{ fontSize: '0.78rem', fontWeight: 800, color: '#424242', display: 'block', marginBottom: 4 }}>
                    Your Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Rahul Sharma"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: 8, border: errors.name ? '1.5px solid #E11D48' : '1px solid #D0D5DD',
                      fontSize: '0.85rem', outline: 'none',
                    }}
                  />
                  {errors.name && <span style={{ fontSize: '0.72rem', color: '#E11D48', marginTop: 3, display: 'block' }}>{errors.name}</span>}
                </div>

                <div style={{ marginBottom: 12 }}>
                  <label htmlFor="phone" style={{ fontSize: '0.78rem', fontWeight: 800, color: '#424242', display: 'block', marginBottom: 4 }}>
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="10-digit mobile number"
                    maxLength={15}
                    inputMode="numeric"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '') })}
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: 8, border: errors.phone ? '1.5px solid #E11D48' : '1px solid #D0D5DD',
                      fontSize: '0.85rem', outline: 'none',
                    }}
                  />
                  {errors.phone && <span style={{ fontSize: '0.72rem', color: '#E11D48', marginTop: 3, display: 'block' }}>{errors.phone}</span>}
                </div>

                <div style={{ marginBottom: 12 }}>
                  <label htmlFor="email" style={{ fontSize: '0.78rem', fontWeight: 800, color: '#424242', display: 'block', marginBottom: 4 }}>
                    Email Address (optional)
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="your.email@example.com"
                    maxLength={254}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: 8, border: errors.email ? '1.5px solid #E11D48' : '1px solid #D0D5DD',
                      fontSize: '0.85rem', outline: 'none',
                    }}
                  />
                  {errors.email && <span style={{ fontSize: '0.72rem', color: '#E11D48', marginTop: 3, display: 'block' }}>{errors.email}</span>}
                </div>

                <div style={{ marginBottom: 12 }}>
                  <label htmlFor="address" style={{ fontSize: '0.78rem', fontWeight: 800, color: '#424242', display: 'block', marginBottom: 4 }}>
                    Complete Address / Flat No. *
                  </label>
                  <input
                    id="address"
                    type="text"
                    autoComplete="street-address"
                    placeholder="House/Flat No., Landmark, Area"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: 8, border: errors.address ? '1.5px solid #E11D48' : '1px solid #D0D5DD',
                      fontSize: '0.85rem', outline: 'none',
                    }}
                  />
                  {errors.address && <span style={{ fontSize: '0.72rem', color: '#E11D48', marginTop: 3, display: 'block' }}>{errors.address}</span>}
                </div>

                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#424242', display: 'block', marginBottom: 4 }}>
                    When do you need service? *
                  </label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {(['today', 'tomorrow', 'custom'] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm({ ...form, dateType: t })}
                        style={{
                          flex: 1, minWidth: 90, padding: '8px 6px', borderRadius: 8, cursor: 'pointer',
                          backgroundColor: form.dateType === t ? '#ff6200' : '#FFFFFF',
                          color: form.dateType === t ? '#FFFFFF' : '#424242',
                          border: form.dateType === t ? '1.5px solid #ff6200' : '1px solid #D0D5DD',
                          fontWeight: 800, fontSize: '0.75rem',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                        }}
                      >
                        <Calendar size={13} />
                        {t === 'today' ? 'Today' : t === 'tomorrow' ? 'Tomorrow' : 'Pick date'}
                      </button>
                    ))}
                  </div>
                  {form.dateType === 'custom' && (
                    <input
                      type="date"
                      min={todayISO}
                      value={form.customDate}
                      onChange={(e) => setForm({ ...form, customDate: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D0D5DD', fontSize: '0.85rem', outline: 'none', marginTop: 8 }}
                    />
                  )}
                </div>

                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#424242', display: 'block', marginBottom: 4 }}>
                    Preferred Time Slot *
                  </label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setForm({ ...form, timeSlot: slot })}
                        style={{
                          padding: '7px 10px', borderRadius: 8, cursor: 'pointer',
                          backgroundColor: form.timeSlot === slot ? '#FF6500' : '#FFFFFF',
                          color: form.timeSlot === slot ? '#FFFFFF' : '#424242',
                          border: form.timeSlot === slot ? '1.5px solid #FF6500' : '1px solid #D0D5DD',
                          fontWeight: 700, fontSize: '0.75rem',
                          display: 'flex', alignItems: 'center', gap: 4,
                        }}
                      >
                        <Clock size={12} />
                        {slot}
                      </button>
                    ))}
                  </div>
                  {errors.timeSlot && <span style={{ fontSize: '0.72rem', color: '#E11D48', marginTop: 3, display: 'block' }}>{errors.timeSlot}</span>}
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label htmlFor="notes" style={{ fontSize: '0.78rem', fontWeight: 800, color: '#424242', display: 'block', marginBottom: 4 }}>
                    Notes (optional)
                  </label>
                  <textarea
                    id="notes"
                    rows={2}
                    placeholder="Describe the issue briefly, e.g. leaking kitchen tap"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D0D5DD', fontSize: '0.85rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    backgroundColor: '#ff6200',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '13px',
                    borderRadius: 10,
                    fontWeight: 900,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(255, 98, 0, 0.4)',
                  }}
                >
                  CONFIRM INSTANT BOOKING
                </button>
                <p style={{ fontSize: '0.72rem', color: '#9E9E9E', textAlign: 'center', marginTop: 10 }}>
                  Free visit & estimate • No payment required now • 30-day warranty
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
