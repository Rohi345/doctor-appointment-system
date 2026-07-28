import React, { useState } from 'react';
import { CLINIC_CONFIG } from '../data/clinicData';
import { Phone, MessageCircle, Calendar, Menu, X, Shield, Lock, Clock, UserCheck } from 'lucide-react';

interface HeaderProps {
  onBookClick: () => void;
  onAdminToggle: () => void;
  isAdminOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onBookClick, onAdminToggle, isAdminOpen }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if clinic is open right now (Mon-Sat 4-9 PM)
  const isCurrentlyOpen = (): boolean => {
    const now = new Date();
    const day = now.getDay(); // 0 is Sunday
    if (day === 0) return false;
    const hours = now.getHours();
    return hours >= 16 && hours < 21;
  };

  const openStatus = isCurrentlyOpen();

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-xs transition-all">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-cyan-900 via-sky-800 to-teal-900 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-white/10 border border-white/20">
              <Clock className="w-3 h-3 text-cyan-300" />
              {CLINIC_CONFIG.timings.days}: {CLINIC_CONFIG.timings.hours}
            </span>
            <span className="hidden sm:inline-block text-cyan-100">|</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-cyan-100">
              <span className={`w-2 h-2 rounded-full ${openStatus ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
              {openStatus ? 'Clinic Open Now in D.I. Khan' : 'Appointments Open for Online Token'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a
              href={`tel:${CLINIC_CONFIG.phone}`}
              className="inline-flex items-center gap-1 hover:text-cyan-200 transition-colors font-medium"
            >
              <Phone className="w-3 h-3" />
              {CLINIC_CONFIG.phone}
            </a>
            <a
              href={`https://wa.me/923209830583?text=${encodeURIComponent('Hello Dr. Rohail Danish, I want to inquire about appointment timings.')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 px-2 py-0.5 rounded-md border border-emerald-400/30 font-medium transition-colors"
            >
              <MessageCircle className="w-3 h-3 text-emerald-400" />
              WhatsApp Clinic
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Clinic Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-600 to-teal-500 p-0.5 shadow-md shadow-sky-500/20">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Shield className="w-6 h-6 text-sky-700" />
              </div>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 block leading-tight">
                Dermatology & Skin Center
              </span>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-serif">
                AL KHAIR <span className="text-sky-700">SKIN CLINIC</span>
              </h1>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button onClick={() => scrollToSection('hero')} className="hover:text-sky-700 transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection('doctor')} className="hover:text-sky-700 transition-colors">
              About Doctor
            </button>
            <button onClick={() => scrollToSection('services')} className="hover:text-sky-700 transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection('booking')} className="hover:text-sky-700 transition-colors">
              Book Token
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="hover:text-sky-700 transition-colors">
              Reviews
            </button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-sky-700 transition-colors">
              FAQ
            </button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-sky-700 transition-colors">
              Contact
            </button>
          </nav>

          {/* Action CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onAdminToggle}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all border ${
                isAdminOpen
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-amber-500" />
              {isAdminOpen ? 'Close Portal' : 'Admin Portal'}
            </button>

            <button
              onClick={onBookClick}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-medium text-sm px-4 py-2.5 rounded-xl shadow-md shadow-sky-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Token (PKR 1,000)</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onAdminToggle}
              className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg text-xs flex items-center gap-1 font-medium"
            >
              <Lock className="w-3.5 h-3.5 text-amber-500" />
              <span>Admin</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="flex flex-col gap-2 font-medium text-slate-700 text-base">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-left px-3 py-2 rounded-lg hover:bg-sky-50 hover:text-sky-700 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('doctor')}
              className="text-left px-3 py-2 rounded-lg hover:bg-sky-50 hover:text-sky-700 transition-colors"
            >
              About Dr. Rohail Danish
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-left px-3 py-2 rounded-lg hover:bg-sky-50 hover:text-sky-700 transition-colors"
            >
              Dermatology Services
            </button>
            <button
              onClick={() => scrollToSection('booking')}
              className="text-left px-3 py-2 rounded-lg hover:bg-sky-50 hover:text-sky-700 transition-colors text-sky-700 font-semibold"
            >
              Book Appointment Token
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-left px-3 py-2 rounded-lg hover:bg-sky-50 hover:text-sky-700 transition-colors"
            >
              Patient Reviews
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-left px-3 py-2 rounded-lg hover:bg-sky-50 hover:text-sky-700 transition-colors"
            >
              Frequently Asked Questions
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left px-3 py-2 rounded-lg hover:bg-sky-50 hover:text-sky-700 transition-colors"
            >
              Contact & Location (D.I. Khan)
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full py-3 bg-gradient-to-r from-sky-600 to-teal-600 text-white font-semibold rounded-xl text-center shadow-md flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Book Online Appointment (Token 1-30)
            </button>
            <a
              href={`https://wa.me/923209830583?text=${encodeURIComponent('Hello Dr. Rohail Danish, I would like to consult with you.')}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 bg-emerald-600 text-white font-medium rounded-xl text-center flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Consult via WhatsApp (0320-9830583)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
