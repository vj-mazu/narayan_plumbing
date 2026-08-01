import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import { ArrowLeft, Bell, Lock, Wrench, Search, Download, Trash2, ShieldCheck, CheckCircle, Clock, XCircle, LogOut, CalendarDays, TrendingUp } from 'lucide-react';
import type { Booking, BookingStatus } from './types';
import { getBookings, verifyPin, updateBookingStatus, deleteBooking, clearAllBookings, defaultPin, STORAGE_KEY } from './storage';

const STATUS_STYLES: Record<BookingStatus, { color: string; bg: string; icon: React.ReactNode }> = {
  New: { color: '#B45309', bg: '#FEF3C7', icon: <Clock size={12} /> },
  Confirmed: { color: '#1D4ED8', bg: '#DBEAFE', icon: <CheckCircle size={12} /> },
  Completed: { color: '#047857', bg: '#D1FAE5', icon: <ShieldCheck size={12} /> },
  Cancelled: { color: '#B91C1C', bg: '#FEE2E2', icon: <XCircle size={12} /> },
};

const STATUS_ORDER: BookingStatus[] = ['New', 'Confirmed', 'Completed', 'Cancelled'];

type Filter = 'All' | 'Today' | BookingStatus;

function parsePrice(s: string): number {
  const m = String(s).match(/\d[\d,]*/);
  return m ? parseInt(m[0].replace(/,/g, ''), 10) : 0;
}

function formatMoney(n: number): string {
  return '₹' + n.toLocaleString('en-IN');
}

function inMonth(b: Booking, ym: string): boolean {
  if (b.dateISO) return b.dateISO.startsWith(ym);
  return new Date(b.createdAt).toISOString().slice(0, 7) === ym;
}

interface Toast {
  id: string;
  name: string;
  service: string;
}

export default function AdminPanel() {
  const [authed, setAuthed] = useState(() => verifyPin(''));
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>(() => getBookings());
  const [filter, setFilter] = useState<Filter>('All');
  const [search, setSearch] = useState('');
  const [cleared, setCleared] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7));

  const knownIds = useRef<Set<string> | null>(null);

  const todayISO = new Date().toISOString().split('T')[0];
  const isToday = (b: Booking) => b.dateISO === todayISO;

  // Detect newly created bookings (cross-tab via storage event)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        const fresh = getBookings();
        setBookings(fresh);
        detectNew(fresh);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const detectNew = (fresh: Booking[]) => {
    if (!knownIds.current) {
      knownIds.current = new Set(fresh.map((b) => b.id));
      return;
    }
    const incoming = fresh.filter((b) => b.status === 'New' && !knownIds.current!.has(b.id));
    if (incoming.length > 0) {
      setToasts((t) => [...t, ...incoming.map((b) => ({ id: b.id, name: b.name, service: b.service }))]);
    }
    knownIds.current = new Set(fresh.map((b) => b.id));
  };

  // Auto-dismiss toasts
  useEffect(() => {
    if (toasts.length === 0) return;
    const t = setTimeout(() => setToasts((ts) => ts.slice(1)), 6000);
    return () => clearTimeout(t);
  }, [toasts]);

  const stats = useMemo(() => {
    const s: Record<string, number> = { All: bookings.length, Today: 0, New: 0, Confirmed: 0, Completed: 0, Cancelled: 0 };
    bookings.forEach((b) => {
      s[b.status] += 1;
      if (isToday(b)) s.Today += 1;
    });
    return s;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookings]);

  const newBookings = useMemo(() => bookings.filter((b) => b.status === 'New'), [bookings]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return bookings.filter((b) => {
      if (filter === 'Today' && !isToday(b)) return false;
      if (filter !== 'All' && filter !== 'Today' && b.status !== filter) return false;
      if (!q) return true;
      return (
        b.name.toLowerCase().includes(q) ||
        b.phone.includes(q) ||
        b.id.toLowerCase().includes(q) ||
        b.service.toLowerCase().includes(q) ||
        b.address.toLowerCase().includes(q)
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookings, filter, search]);

  // ---- Monthly report ----
  const monthBookings = useMemo(() => bookings.filter((b) => inMonth(b, month)), [bookings, month]);

  const report = useMemo(() => {
    const total = monthBookings.length;
    const revenue = monthBookings.reduce((sum, b) => sum + parsePrice(b.price), 0);
    const completed = monthBookings.filter((b) => b.status === 'Completed').length;
    const cancelled = monthBookings.filter((b) => b.status === 'Cancelled').length;
    const byService: Record<string, number> = {};
    monthBookings.forEach((b) => {
      byService[b.service] = (byService[b.service] || 0) + 1;
    });
    const serviceRows = Object.entries(byService).sort((a, b) => b[1] - a[1]).slice(0, 10);
    const maxCount = serviceRows.length > 0 ? serviceRows[0][1] : 1;
    const [year, monthNum] = month.split('-');
    const daysInMonth = new Date(Number(year), Number(monthNum), 0).getDate();
    const perDay = total / daysInMonth;
    return { total, revenue, completed, cancelled, serviceRows, maxCount, perDay };
  }, [monthBookings, month]);

  const downloadCSV = (filename: string, rows: (string | number)[][]) => {
    const csv = rows.map((r) => r.map((c) => '"' + String(c).replace(/"/g, '""') + '"').join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCurrent = () => {
    const header = ['Booking ID', 'Name', 'Phone', 'Service', 'Price', 'Date', 'Time Slot', 'Address', 'Notes', 'Status', 'Created At'];
    const rows = filtered.map((b) => [
      b.id, b.name, b.phone, b.service, b.price, b.date, b.timeSlot, b.address, b.notes, b.status, new Date(b.createdAt).toLocaleString('en-IN'),
    ]);
    downloadCSV('narayan-bookings.csv', [header, ...rows]);
  };

  const exportMonthlyReport = () => {
    const [y, m] = month.split('-');
    const monthName = new Date(Number(y), Number(m) - 1, 1).toLocaleString('en-IN', { month: 'long', year: 'numeric' });
    const header = ['Booking ID', 'Name', 'Phone', 'Service', 'Price', 'Date', 'Time Slot', 'Address', 'Notes', 'Status', 'Created At'];
    const rows = monthBookings.map((b) => [
      b.id, b.name, b.phone, b.service, b.price, b.date, b.timeSlot, b.address, b.notes, b.status, new Date(b.createdAt).toLocaleString('en-IN'),
    ]);
    downloadCSV(`narayan-report-${month}.csv`, [
      [`Narayan Plumbing Services - Monthly Report`, ''],
      ['Month', monthName],
      ['Total Bookings', report.total],
      ['Total Revenue', formatMoney(report.revenue)],
      ['Completed', report.completed],
      ['Cancelled', report.cancelled],
      ['', ''],
      ...header.map((h) => [h]),
      ...rows,
    ]);
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (verifyPin(pinInput)) {
      setAuthed(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const changeStatus = (id: string, status: BookingStatus) => {
    setBookings(updateBookingStatus(id, status));
  };

  const confirmBooking = (id: string) => {
    setBookings(updateBookingStatus(id, 'Confirmed'));
  };

  const removeBooking = (id: string) => {
    if (window.confirm('Delete this booking permanently?')) {
      setBookings(deleteBooking(id));
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Clear ALL bookings? This cannot be undone.')) {
      setBookings(clearAllBookings());
      setCleared(true);
      setTimeout(() => setCleared(false), 2000);
    }
  };

  const inputStyle: CSSProperties = {
    padding: '9px 12px',
    borderRadius: 8,
    border: '1px solid #D0D5DD',
    fontSize: '0.82rem',
    outline: 'none',
    backgroundColor: '#FFFFFF',
  };

  const statCards: { key: Filter; label: string }[] = [
    { key: 'All', label: 'Total' },
    { key: 'Today', label: 'Today' },
    { key: 'New', label: 'New' },
    { key: 'Confirmed', label: 'Confirmed' },
    { key: 'Completed', label: 'Completed' },
    { key: 'Cancelled', label: 'Cancelled' },
  ];

  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#101010', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{ width: '100%', maxWidth: 380, backgroundColor: '#FFFFFF', borderRadius: 18, padding: 32, boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, backgroundColor: '#6E42E5', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
            <Lock size={24} />
          </div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 900, textAlign: 'center', color: '#101010', margin: 0 }}>Admin Access</h2>
          <p style={{ fontSize: '0.78rem', color: '#757575', textAlign: 'center', marginTop: 4 }}>Enter the admin PIN to view bookings</p>

          <form onSubmit={handleLogin} style={{ marginTop: 20 }}>
            <input
              type="password"
              inputMode="numeric"
              value={pinInput}
              onChange={(e) => { setPinInput(e.target.value); setPinError(false); }}
              placeholder="••••"
              style={{ ...inputStyle, width: '100%', textAlign: 'center', fontSize: '1.1rem', letterSpacing: 6, border: pinError ? '1.5px solid #E11D48' : '1px solid #D0D5DD' }}
            />
            {pinError && <p style={{ fontSize: '0.75rem', color: '#E11D48', marginTop: 6, textAlign: 'center' }}>Incorrect PIN. Try again.</p>}
            <button type="submit" style={{ width: '100%', marginTop: 12, backgroundColor: '#6E42E5', color: '#FFFFFF', border: 'none', padding: '12px', borderRadius: 10, fontWeight: 900, fontSize: '0.88rem', cursor: 'pointer' }}>
              UNLOCK
            </button>
          </form>

          <p style={{ fontSize: '0.72rem', color: '#9E9E9E', textAlign: 'center', marginTop: 16 }}>Demo PIN: <strong>{defaultPin()}</strong></p>

          <a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = '#/'; }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 8, color: '#6E42E5', fontWeight: 800, fontSize: '0.8rem', textDecoration: 'none' }}>
            <ArrowLeft size={14} /> Back to website
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F5F5F7' }}>
      {/* ===== Header ===== */}
      <header style={{ backgroundColor: '#101010', color: '#FFFFFF', padding: '14px 16px', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: '#6E42E5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wrench size={16} />
            </div>
            <div>
              <h1 style={{ fontSize: '0.95rem', fontWeight: 900, margin: 0 }}>Narayan Plumbing — Admin Panel</h1>
              <p style={{ fontSize: '0.7rem', color: '#9E9E9E', margin: 0 }}>Manage bookings, notifications & reports</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Notification bell */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setBellOpen(!bellOpen)}
                aria-label={`Notifications, ${newBookings.length} new`}
                aria-expanded={bellOpen}
                style={{ position: 'relative', backgroundColor: '#2A2A2A', border: 'none', color: '#FFFFFF', width: 38, height: 38, borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Bell size={18} />
                {newBookings.length > 0 && (
                  <span style={{ position: 'absolute', top: -5, right: -5, backgroundColor: '#FF5A1F', color: '#FFFFFF', fontSize: '0.6rem', fontWeight: 900, borderRadius: '50%', minWidth: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3px' }}>
                    {newBookings.length}
                  </span>
                )}
              </button>

              {bellOpen && (
                <div style={{ position: 'absolute', right: 0, top: 44, width: 300, maxWidth: '80vw', backgroundColor: '#FFFFFF', borderRadius: 14, boxShadow: '0 12px 40px rgba(0,0,0,0.25)', overflow: 'hidden', zIndex: 2000, border: '1px solid #E5E7EB' }}>
                  <div style={{ padding: '12px 14px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '0.85rem', color: '#101010' }}>New Bookings ({newBookings.length})</strong>
                    {newBookings.length > 0 && (
                      <button onClick={() => { newBookings.forEach((b) => confirmBooking(b.id)); }} style={{ background: 'none', border: 'none', color: '#6E42E5', fontWeight: 800, fontSize: '0.72rem', cursor: 'pointer' }}>
                        Confirm all
                      </button>
                    )}
                  </div>
                  <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                    {newBookings.length === 0 ? (
                      <p style={{ padding: '18px 14px', fontSize: '0.78rem', color: '#9E9E9E', textAlign: 'center' }}>No new bookings. All caught up!</p>
                    ) : (
                      newBookings.slice(0, 8).map((b) => (
                        <div key={b.id} style={{ padding: '10px 14px', borderBottom: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                          <div style={{ minWidth: 0 }}>
                            <strong style={{ fontSize: '0.8rem', color: '#101010', display: 'block' }}>{b.name}</strong>
                            <span style={{ fontSize: '0.7rem', color: '#9E9E9E' }}>{b.service} • {new Date(b.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <button onClick={() => confirmBooking(b.id)} style={{ flexShrink: 0, backgroundColor: '#6E42E5', color: '#FFFFFF', border: 'none', borderRadius: 8, padding: '5px 10px', fontWeight: 800, fontSize: '0.7rem', cursor: 'pointer' }}>
                            Confirm
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = '#/'; }} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#FFFFFF', textDecoration: 'none', backgroundColor: '#2A2A2A', padding: '8px 14px', borderRadius: 10, fontWeight: 800, fontSize: '0.8rem' }}>
              <ArrowLeft size={14} /> Website
            </a>
            <button onClick={() => setAuthed(false)} aria-label="Log out" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#FFFFFF', textDecoration: 'none', backgroundColor: '#B91C1C', padding: '8px 14px', borderRadius: 10, fontWeight: 800, fontSize: '0.8rem', border: 'none', cursor: 'pointer' }}>
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* ===== Toasts ===== */}
      <div style={{ position: 'fixed', top: 74, right: 16, zIndex: 3000, display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320 }}>
        {toasts.map((t) => (
          <div key={t.id} style={{ backgroundColor: '#101010', color: '#FFFFFF', borderRadius: 12, padding: '12px 14px', boxShadow: '0 8px 24px rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', gap: 10, animation: 'slideIn 0.3s ease' }}>
            <span style={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: '#FF5A1F', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Bell size={15} />
            </span>
            <div style={{ minWidth: 0 }}>
              <strong style={{ fontSize: '0.8rem', display: 'block' }}>New booking received</strong>
              <span style={{ fontSize: '0.72rem', color: '#B0B0B0' }}>{t.name} • {t.service}</span>
            </div>
            <button onClick={() => { confirmBooking(t.id); setToasts((ts) => ts.filter((x) => x.id !== t.id)); }} style={{ flexShrink: 0, marginLeft: 'auto', backgroundColor: '#6E42E5', color: '#FFFFFF', border: 'none', borderRadius: 8, padding: '5px 10px', fontWeight: 800, fontSize: '0.7rem', cursor: 'pointer' }}>
              Confirm
            </button>
          </div>
        ))}
      </div>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 16px 60px' }}>
        {cleared && (
          <div style={{ marginBottom: 14, padding: '12px 16px', borderRadius: 10, backgroundColor: '#D1FAE5', color: '#047857', fontWeight: 700, fontSize: '0.85rem' }}>
            All bookings cleared.
          </div>
        )}

        {/* ===== Stats / filters ===== */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 10, marginBottom: 18 }}>
          {statCards.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              style={{
                backgroundColor: filter === key ? '#6E42E5' : '#FFFFFF',
                color: filter === key ? '#FFFFFF' : '#101010',
                border: filter === key ? 'none' : '1px solid #E0E0E0',
                borderRadius: 12,
                padding: '12px 10px',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div style={{ fontSize: '1.4rem', fontWeight: 900, lineHeight: 1 }}>{stats[key]}</div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, marginTop: 3, opacity: 0.85 }}>{label}</div>
            </button>
          ))}
        </div>

        {/* ===== Toolbar ===== */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 220 }}>
            <Search size={15} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9E9E9E' }} />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, phone, ID, service…"
              style={{ ...inputStyle, width: '100%', paddingLeft: 34 }}
            />
          </div>
          <button onClick={exportCurrent} style={{ ...inputStyle, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, color: '#101010' }}>
            <Download size={15} /> Export CSV
          </button>
          <button onClick={handleClearAll} style={{ ...inputStyle, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, color: '#B91C1C', border: '1px solid #FECACA' }}>
            <Trash2 size={15} /> Clear All
          </button>
        </div>

        {/* ===== Monthly Report ===== */}
        <section style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: 18, border: '1px solid #E5E7EB', marginBottom: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CalendarDays size={18} color="#6E42E5" />
              <h2 style={{ fontSize: '1rem', fontWeight: 900, color: '#101010', margin: 0 }}>Monthly Report</h2>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <input
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                style={{ ...inputStyle, fontSize: '0.8rem', cursor: 'pointer' }}
                aria-label="Select report month"
              />
              <button onClick={exportMonthlyReport} style={{ backgroundColor: '#6E42E5', color: '#FFFFFF', border: 'none', padding: '9px 14px', borderRadius: 10, fontWeight: 900, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Download size={15} /> Download Report
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10, marginBottom: 16 }}>
            {[
              { label: 'Bookings', value: String(report.total) },
              { label: 'Revenue', value: formatMoney(report.revenue) },
              { label: 'Completed', value: String(report.completed) },
              { label: 'Cancelled', value: String(report.cancelled) },
              { label: 'Avg / day', value: report.perDay.toFixed(1) },
            ].map((s) => (
              <div key={s.label} style={{ backgroundColor: '#F5F5F7', borderRadius: 12, padding: '12px 14px' }}>
                <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#101010', lineHeight: 1.1 }}>{s.value}</div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#757575', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {report.serviceRows.length > 0 ? (
            <div>
              <h3 style={{ fontSize: '0.82rem', fontWeight: 800, color: '#424242', marginBottom: 10 }}>Top Services Booked</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {report.serviceRows.map(([service, count]) => (
                  <div key={service} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: '0.75rem', color: '#424242', width: '38%', minWidth: 130, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{service}</span>
                    <div style={{ flex: 1, backgroundColor: '#F0EAFB', borderRadius: 6, height: 12, overflow: 'hidden' }}>
                      <div style={{ width: `${(count / report.maxCount) * 100}%`, backgroundColor: '#6E42E5', height: '100%', borderRadius: 6 }} />
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#101010', width: 28, textAlign: 'right' }}>{count}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p style={{ fontSize: '0.8rem', color: '#9E9E9E' }}>No bookings in this month yet.</p>
          )}
        </section>

        {/* ===== Booking list ===== */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 900, color: '#101010', margin: 0 }}>
            {filter === 'Today' ? "Today's Bookings" : filter === 'All' ? 'All Bookings' : `${filter} Bookings`}
            <span style={{ color: '#9E9E9E', fontWeight: 700, marginLeft: 6 }}>({filtered.length})</span>
          </h2>
          <span style={{ fontSize: '0.72rem', color: '#9E9E9E' }}>
            <TrendingUp size={13} style={{ verticalAlign: 'middle', marginRight: 3 }} /> Sorted newest first
          </span>
        </div>

        {filtered.length === 0 ? (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, padding: 40, textAlign: 'center', border: '1px dashed #D0D5DD' }}>
            <p style={{ color: '#9E9E9E', fontWeight: 700 }}>No bookings found.</p>
            <p style={{ fontSize: '0.78rem', color: '#9E9E9E', marginTop: 4 }}>
              Bookings made on the website appear here automatically.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map((b) => {
              const st = STATUS_STYLES[b.status];
              return (
                <div key={b.id} style={{ backgroundColor: '#FFFFFF', borderRadius: 14, padding: 14, border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, flexWrap: 'wrap' }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <strong style={{ fontSize: '0.92rem', color: '#101010' }}>{b.name}</strong>
                        <span style={{ fontSize: '0.72rem', color: '#9E9E9E' }}>{b.id}</span>
                        <span style={{ fontSize: '0.72rem', color: '#9E9E9E' }}>• {new Date(b.createdAt).toLocaleString('en-IN')}</span>
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#424242', marginTop: 6, fontWeight: 700 }}>{b.service} <span style={{ color: '#6E42E5', fontWeight: 900 }}>({b.price})</span></div>
                      <div style={{ fontSize: '0.8rem', color: '#616161', marginTop: 4 }}>
                        📅 {b.date} &nbsp; ⏰ {b.timeSlot} &nbsp; 📞 <a href={`tel:${b.phone}`} style={{ color: '#6E42E5', textDecoration: 'none' }}>{b.phone}</a>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#616161', marginTop: 4 }}>📍 {b.address}</div>
                      {b.notes && <div style={{ fontSize: '0.78rem', color: '#757575', marginTop: 4, fontStyle: 'italic' }}>Note: {b.notes}</div>}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
                      <span style={{ backgroundColor: st.bg, color: st.color, fontSize: '0.72rem', fontWeight: 900, padding: '4px 10px', borderRadius: 12, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                        {st.icon} {b.status}
                      </span>
                      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                        <select
                          value={b.status}
                          onChange={(e) => changeStatus(b.id, e.target.value as BookingStatus)}
                          style={{ ...inputStyle, padding: '6px 8px', fontSize: '0.75rem', cursor: 'pointer' }}
                          aria-label={`Update status for ${b.name}`}
                        >
                          {STATUS_ORDER.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <button onClick={() => removeBooking(b.id)} aria-label={`Delete booking ${b.id}`} style={{ background: 'none', border: 'none', color: '#B91C1C', cursor: 'pointer', padding: 6 }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, textAlign: 'center', fontSize: '0.72rem', color: '#9E9E9E', backgroundColor: '#FFFFFF', borderTop: '1px solid #E5E7EB', padding: '10px 16px' }}>
        Admin Panel — bookings stored in this browser (localStorage). Connect a backend for production use.
      </div>
    </div>
  );
}
