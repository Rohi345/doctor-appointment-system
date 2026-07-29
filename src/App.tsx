import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DoctorAbout } from './components/DoctorAbout';
import { ServicesSection } from './components/ServicesSection';
import { AppointmentBooking } from './components/AppointmentBooking';
import { SuccessReceiptModal } from './components/SuccessReceiptModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLogin } from './components/AdminLogin';
import { Footer } from './components/Footer';
import { Appointment } from './types';
import { getBookedTokensCount } from './lib/supabase-storage';
import { CLINIC_CONFIG } from './data/clinicData';
import { useAuth } from './contexts/AuthContext';

// Three-state admin panel: nothing open | login overlay | dashboard overlay
type AdminView = 'closed' | 'login' | 'dashboard';

export default function App() {
  const { session, loading: authLoading } = useAuth();

  const [adminView, setAdminView] = useState<AdminView>('closed');
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string>('');

  // If a session disappears externally (token expired, signed out elsewhere),
  // close the dashboard immediately.
  useEffect(() => {
    if (!session && adminView === 'dashboard') {
      setAdminView('closed');
    }
  }, [session, adminView]);

  // ── Token counter for the hero section ──────────────────────────────────────
  const getTodayString = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [todayAvailable, setTodayAvailable] = useState<number>(CLINIC_CONFIG.dailyLimit);

  const updateTokensCount = async () => {
    try {
      const booked = await getBookedTokensCount(getTodayString());
      setTodayAvailable(Math.max(0, CLINIC_CONFIG.dailyLimit - booked));
    } catch {
      // keep previous value on network error
    }
  };

  useEffect(() => {
    updateTokensCount();
  }, [confirmedAppointment, adminView]);

  // ── Navigation ───────────────────────────────────────────────────────────────
  const scrollToBooking = (serviceTitle?: string) => {
    if (serviceTitle) setSelectedServiceForBooking(serviceTitle);
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Clicking "Admin Portal" in the header:
  //   • If something is already open → close it
  //   • If nothing is open → check auth and route appropriately
  const handleAdminToggle = () => {
    if (adminView !== 'closed') {
      setAdminView('closed');
      return;
    }
    if (session) {
      setAdminView('dashboard');
    } else {
      setAdminView('login');
    }
  };

  // Don't render the admin panel until we know the auth state,
  // to avoid a flash of the login screen for already-authenticated admins.
  const isAdminAreaOpen = adminView !== 'closed';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-sky-500 selection:text-white">
      {/* Navigation Header */}
      <Header
        onBookClick={() => scrollToBooking()}
        onAdminToggle={handleAdminToggle}
        isAdminOpen={isAdminAreaOpen}
      />

      {/* Main public landing page */}
      <main>
        <Hero
          onBookClick={() => scrollToBooking()}
          availableTokensToday={todayAvailable}
        />
        <DoctorAbout onBookClick={() => scrollToBooking()} />
        <ServicesSection onBookService={(t) => scrollToBooking(t)} />
        <AppointmentBooking
          initialService={selectedServiceForBooking}
          onAppointmentCreated={(apt) => {
            setConfirmedAppointment(apt);
            updateTokensCount();
          }}
        />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>

      <Footer />
      <FloatingWhatsApp />

      {/* Appointment success receipt */}
      {confirmedAppointment && (
        <SuccessReceiptModal
          appointment={confirmedAppointment}
          onClose={() => setConfirmedAppointment(null)}
        />
      )}

      {/* ── Admin login overlay ─────────────────────────────────────────────── */}
      {adminView === 'login' && !authLoading && (
        <AdminLogin
          onSuccess={() => setAdminView('dashboard')}
          onClose={() => setAdminView('closed')}
        />
      )}

      {/* ── Admin dashboard overlay (auth-gated) ────────────────────────────── */}
      {adminView === 'dashboard' && session && (
        <AdminDashboard
          onClose={() => setAdminView('closed')}
          onViewReceipt={(apt) => {
            setAdminView('closed');
            setConfirmedAppointment(apt);
          }}
          onLogout={() => setAdminView('closed')}
        />
      )}
    </div>
  );
}
