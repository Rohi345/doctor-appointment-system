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
import { Footer } from './components/Footer';
import { Appointment } from './types';
import { getBookedTokensCount } from './lib/supabase-storage';
import { CLINIC_CONFIG } from './data/clinicData';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string>('');

  // Calculate today's available tokens
  const getTodayString = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [todayAvailable, setTodayAvailable] = useState<number>(30);

  const updateTokensCount = async () => {
    const todayStr = getTodayString();
    try {
      const booked = await getBookedTokensCount(todayStr);
      setTodayAvailable(Math.max(0, CLINIC_CONFIG.dailyLimit - booked));
    } catch {
      // keep previous value on network error
    }
  };

  useEffect(() => {
    updateTokensCount();
  }, [confirmedAppointment, isAdminOpen]);

  const scrollToBooking = (serviceTitle?: string) => {
    if (serviceTitle) {
      setSelectedServiceForBooking(serviceTitle);
    }
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-sky-500 selection:text-white">
      {/* Navigation Header */}
      <Header
        onBookClick={() => scrollToBooking()}
        onAdminToggle={() => setIsAdminOpen(!isAdminOpen)}
        isAdminOpen={isAdminOpen}
      />

      {/* Main Landing Page Content */}
      <main>
        {/* 1. Hero Section */}
        <Hero
          onBookClick={() => scrollToBooking()}
          availableTokensToday={todayAvailable}
        />

        {/* 2. About Doctor Section */}
        <DoctorAbout onBookClick={() => scrollToBooking()} />

        {/* 3. Services Section */}
        <ServicesSection
          onBookService={(serviceTitle) => scrollToBooking(serviceTitle)}
        />

        {/* 4. Appointment Booking System */}
        <AppointmentBooking
          initialService={selectedServiceForBooking}
          onAppointmentCreated={(apt) => {
            setConfirmedAppointment(apt);
            updateTokensCount();
          }}
        />

        {/* 5. Testimonials Section */}
        <TestimonialsSection />

        {/* 6. FAQ Section */}
        <FaqSection />

        {/* 7. Contact & Location Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Animated WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Success Receipt Confirmation Modal */}
      {confirmedAppointment && (
        <SuccessReceiptModal
          appointment={confirmedAppointment}
          onClose={() => setConfirmedAppointment(null)}
        />
      )}

      {/* Doctor & Staff Admin Dashboard Overlay */}
      {isAdminOpen && (
        <AdminDashboard
          onClose={() => setIsAdminOpen(false)}
          onViewReceipt={(apt) => {
            setIsAdminOpen(false);
            setConfirmedAppointment(apt);
          }}
        />
      )}
    </div>
  );
}
