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
}

interface FormErrors {
  name?: string;
  phone?: string;
  address?: string;
  services?: string;
}

const initialForm: FormState = {
  name: '',
  phone: '',
  address: '',
  services: ['Plumbing Services'],
};

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
    errors.address = 'Locality/Address is required';
  }

  // Service validation
  if (form.services.length === 0) {
    errors.services = 'Please select at least one service';
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
      date: new Date().toLocaleDateString('en-IN'),
      dateISO: new Date().toISOString().split('T')[0],
      timeSlot: 'ASAP / Doorstep in 90 mins',
    });

    const whatsappMessage = [
      'Hi Narayan Plumbing Services, I want to book a service.',
      '',
      `Booking ID: ${booking.id}`,
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Selected Services: ${form.services.join(', ')}`,
      `Locality/Address: ${form.address.trim()}`,
    ].filter(Boolean).join('\n');

    window.location.href = `https://wa.me/91${PHONE_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

    setBookingId(booking.id);
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
  };

  const inputStyle = (hasError?: string): React.CSSProperties => ({
    width: '100%', padding: '7px 10px', borderRadius: 8, border: hasError ? '1.5px solid #E11D48' : '1px solid #D0D5DD',
    fontSize: '0.8rem', outline: 'none',
  });

  const fieldLabelStyle: React.CSSProperties = {
    fontSize: '0.72rem', fontWeight: 800, color: '#424242', display: 'block', marginBottom: 3,
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
            padding: 10,
          }}
          onClick={close}
        >
          <motion.div
            key="panel"
            initial={{ scale: 0.94, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 15 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 14,
              width: '100%',
              maxWidth: 400,
              maxHeight: '94vh',
              overflowY: 'auto',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
              position: 'relative',
              overscrollBehavior: 'contain',
            }}
          >
            <div style={{ background: 'linear-gradient(135deg, var(--orange) 0%, #d95a00 100%)', color: '#FFFFFF', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 2 }}>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 900, margin: 0 }}>Book a Service</h3>
                <p style={{ fontSize: '0.65rem', color: '#FFFFFF', margin: '1px 0 0 0', opacity: 0.95 }}>Technician arrives at your doorstep in 90 mins</p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close booking form"
                style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#FFFFFF', width: 26, height: 26, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={13} />
              </button>
            </div>

            {bookingId ? (
              <div style={{ padding: 24, textAlign: 'center' }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  style={{ width: 54, height: 54, borderRadius: '50%', backgroundColor: '#25D366', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}
                >
                  <CheckCircle size={32} />
                </motion.div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#101010', margin: 0 }}>Booking Confirmed!</h3>
                <p style={{ color: '#757575', fontSize: '0.8rem', marginTop: 6 }}>
                  Booking ID: <strong style={{ color: 'var(--orange)' }}>{bookingId}</strong>
                </p>
                <p style={{ color: '#757575', fontSize: '0.8rem', marginTop: 4, lineHeight: 1.4 }}>
                  Our service coordinator will call you within 5 minutes to confirm your doorstep location.
                </p>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    marginTop: 12,
                    backgroundColor: 'var(--orange)',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    padding: '8px 14px',
                    borderRadius: 8,
                    fontWeight: 800,
                    fontSize: '0.8rem',
                  }}
                >
                  <Phone size={14} /> Need help? Call us
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ padding: 12 }}>
                {/* Service Selection */}
                <div style={{ marginBottom: 8 }}>
                  <label style={fieldLabelStyle}>
                    Select Services *
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 4, maxHeight: 110, overflowY: 'auto', border: '1px solid #D0D5DD', padding: 6, borderRadius: 8, backgroundColor: '#FAFAFA' }}>
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
                            padding: '5px 7px',
                            borderRadius: 6,
                            border: selected ? '1.5px solid var(--orange)' : '1px solid #E0E0E0',
                            backgroundColor: selected ? '#FFF7ED' : '#FFFFFF',
                            textAlign: 'left',
                            cursor: 'pointer',
                            fontSize: '0.72rem',
                            fontWeight: selected ? 800 : 600,
                            color: selected ? 'var(--orange)' : '#424242',
                          }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <Wrench size={10} style={{ flexShrink: 0, opacity: 0.7 }} />
                            <span>{s.name}</span>
                          </span>
                          <span style={{ width: 14, height: 14, borderRadius: 3, border: '1.5px solid #BDBDBD', display: 'grid', placeItems: 'center', backgroundColor: selected ? 'var(--orange)' : '#FFFFFF', borderColor: selected ? 'var(--orange)' : '#BDBDBD', flexShrink: 0 }}>
                            {selected && <Check size={9} color="#FFFFFF" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.services && <span style={{ fontSize: '0.68rem', color: '#E11D48', marginTop: 2, display: 'block' }}>{errors.services}</span>}
                </div>

                <div style={{ marginBottom: 8 }}>
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
                  {errors.name && <span style={{ fontSize: '0.68rem', color: '#E11D48', marginTop: 2, display: 'block' }}>{errors.name}</span>}
                </div>

                <div style={{ marginBottom: 8 }}>
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
                  {errors.phone && <span style={{ fontSize: '0.68rem', color: '#E11D48', marginTop: 2, display: 'block' }}>{errors.phone}</span>}
                </div>

                <div style={{ marginBottom: 8 }}>
                  <label htmlFor="address" style={fieldLabelStyle}>
                    Complete Locality / Address *
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
                  {errors.address && <span style={{ fontSize: '0.68rem', color: '#E11D48', marginTop: 2, display: 'block' }}>{errors.address}</span>}
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--orange)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '9px',
                    borderRadius: 8,
                    fontWeight: 900,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(249, 115, 22, 0.3)',
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
                    gap: 6,
                    marginTop: 6,
                    backgroundColor: '#101010',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    padding: '8px',
                    borderRadius: 8,
                    fontWeight: 800,
                    fontSize: '0.78rem',
                  }}
                >
                  <Phone size={14} /> CALL NOW — {PHONE_DISPLAY}
                </a>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

