import { useEffect, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Phone, Check, Wrench } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CORE_SERVICES } from './data';
import { createBooking } from './storage';
import { PHONE_NUMBER, PHONE_DISPLAY } from './types';

interface BookingModalProps {
  open: boolean;
  preselectedService?: string;
  onClose: () => void;
}

interface FormState {
  name: string;
  phone: string;
  address: string;
  services: string[];
  date: string;
  time: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  address?: string;
  services?: string;
  date?: string;
  time?: string;
}

const initialForm: FormState = {
  name: '',
  phone: '',
  address: '',
  services: ['Plumbing Services'],
  date: '',
  time: '',
};

function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  if (Number.isNaN(d.getTime())) return iso;
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

  // Address validation
  if (!address) {
    errors.address = 'Address is required';
  }

  // Service validation
  if (form.services.length === 0) {
    errors.services = 'Please select at least one service';
  }

  // Date & time validation
  if (!form.date) {
    errors.date = 'Choose a date';
  }
  if (!form.time) {
    errors.time = 'Choose a time';
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

  // Core services for booking
  const coreItems = CORE_SERVICES.map((s) => ({
    id: s.id,
    name: s.name,
  }));

  // Ensure any custom preselectedService is included in the list
  const allServicesList = [...coreItems];
  if (preselectedService && !allServicesList.some((s) => s.name === preselectedService)) {
    allServicesList.unshift({
      id: `custom-${preselectedService}`,
      name: preselectedService,
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

    const booking = createBooking({
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      service: form.services.join(', '),
      date: formatDate(form.date),
      dateISO: form.date,
      timeSlot: form.time,
    });

    const whatsappMessage = [
      'Hi Narayan Plumbing Services, I want to book a service.',
      '',
      `Booking ID: ${booking.id}`,
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Selected Services: ${form.services.join(', ')}`,
      `Date: ${formatDate(form.date)}`,
      `Time: ${form.time}`,
      `Address: ${form.address.trim()}`,
    ].filter(Boolean).join('\n');

    window.location.href = `https://wa.me/91${PHONE_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

    setBookingId(booking.id);
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
  };

  const todayISO = new Date().toISOString().split('T')[0];

  const inputStyle = (hasError?: string): React.CSSProperties => ({
    width: '100%', padding: '9px 12px', borderRadius: 8, border: hasError ? '1.5px solid #E11D48' : '1px solid #D0D5DD',
    fontSize: '0.85rem', outline: 'none',
  });

  const fieldLabelStyle: React.CSSProperties = {
    fontSize: '0.75rem', fontWeight: 800, color: '#424242', display: 'block', marginBottom: 4,
  };

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
              maxWidth: 460,
              maxHeight: '92vh',
              overflowY: 'auto',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
              position: 'relative',
              overscrollBehavior: 'contain',
            }}
          >
            <div style={{ background: 'linear-gradient(135deg, #ff6200 0%, #FF8C42 100%)', color: '#FFFFFF', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 2 }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 900, margin: 0 }}>Book a Service</h3>
                <p style={{ fontSize: '0.7rem', color: '#FFFFFF', margin: '2px 0 0 0', opacity: 0.95 }}>Technician arrives at your doorstep in 30 mins</p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close booking form"
                style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#FFFFFF', width: 30, height: 30, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={15} />
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
              <form onSubmit={handleSubmit} noValidate style={{ padding: 16 }}>
                {/* Service Selection */}
                <div style={{ marginBottom: 12 }}>
                  <label style={fieldLabelStyle}>
                    Select Services (Choose one or multiple) *
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 5, maxHeight: 180, overflowY: 'auto', border: '1px solid #D0D5DD', padding: 8, borderRadius: 8, backgroundColor: '#FAFAFA' }}>
                    {allServicesList.map((s) => {
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
                            padding: '7px 9px',
                            borderRadius: 6,
                            border: selected ? '2px solid #ff6200' : '1px solid #E0E0E0',
                            backgroundColor: selected ? '#FFF5F0' : '#FFFFFF',
                            textAlign: 'left',
                            cursor: 'pointer',
                            fontSize: '0.78rem',
                            fontWeight: selected ? 800 : 600,
                            color: selected ? '#ff6200' : '#424242',
                          }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <Wrench size={12} style={{ flexShrink: 0, opacity: 0.7 }} />
                            <span>{s.name}</span>
                          </span>
                          <span style={{ width: 17, height: 17, borderRadius: 4, border: '1.5px solid #BDBDBD', display: 'grid', placeItems: 'center', backgroundColor: selected ? '#ff6200' : '#FFFFFF', borderColor: selected ? '#ff6200' : '#BDBDBD', flexShrink: 0 }}>
                            {selected && <Check size={11} color="#FFFFFF" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.services && <span style={{ fontSize: '0.72rem', color: '#E11D48', marginTop: 3, display: 'block' }}>{errors.services}</span>}
                </div>

                <div style={{ marginBottom: 10 }}>
                  <label htmlFor="name" style={fieldLabelStyle}>
                    Your Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Rahul Sharma"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={inputStyle(errors.name)}
                  />
                  {errors.name && <span style={{ fontSize: '0.72rem', color: '#E11D48', marginTop: 3, display: 'block' }}>{errors.name}</span>}
                </div>

                <div style={{ marginBottom: 10 }}>
                  <label htmlFor="phone" style={fieldLabelStyle}>
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
                    style={inputStyle(errors.phone)}
                  />
                  {errors.phone && <span style={{ fontSize: '0.72rem', color: '#E11D48', marginTop: 3, display: 'block' }}>{errors.phone}</span>}
                </div>

                <div style={{ marginBottom: 10 }}>
                  <label htmlFor="address" style={fieldLabelStyle}>
                    Complete Address / Flat No. *
                  </label>
                  <input
                    id="address"
                    type="text"
                    autoComplete="street-address"
                    placeholder="House/Flat No., Landmark, Area"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    style={inputStyle(errors.address)}
                  />
                  {errors.address && <span style={{ fontSize: '0.72rem', color: '#E11D48', marginTop: 3, display: 'block' }}>{errors.address}</span>}
                </div>

                {/* Manual date & time */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                  <div>
                    <label htmlFor="date" style={fieldLabelStyle}>
                      Date *
                    </label>
                    <input
                      id="date"
                      type="date"
                      min={todayISO}
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      style={inputStyle(errors.date)}
                    />
                    {errors.date && <span style={{ fontSize: '0.72rem', color: '#E11D48', marginTop: 3, display: 'block' }}>{errors.date}</span>}
                  </div>
                  <div>
                    <label htmlFor="time" style={fieldLabelStyle}>
                      Time *
                    </label>
                    <input
                      id="time"
                      type="time"
                      value={form.time}
                      onChange={(e) => setForm({ ...form, time: e.target.value })}
                      style={inputStyle(errors.time)}
                    />
                    {errors.time && <span style={{ fontSize: '0.72rem', color: '#E11D48', marginTop: 3, display: 'block' }}>{errors.time}</span>}
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    backgroundColor: '#ff6200',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '12px',
                    borderRadius: 10,
                    fontWeight: 900,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(255, 98, 0, 0.4)',
                  }}
                >
                  CONFIRM INSTANT BOOKING
                </button>

                <a
                  href={`tel:${PHONE_NUMBER}`}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    marginTop: 8,
                    backgroundColor: '#101010',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    padding: '11px',
                    borderRadius: 10,
                    fontWeight: 800,
                    fontSize: '0.85rem',
                  }}
                >
                  <Phone size={16} /> CALL NOW — {PHONE_DISPLAY}
                </a>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
