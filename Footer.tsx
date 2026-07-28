import React from 'react';
import { CLINIC_CONFIG } from '../data/clinicData';
import { Shield, Phone, Mail, MapPin, MessageCircle, Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-teal-500 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Shield className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif text-white tracking-tight">
                  AL KHAIR <span className="text-cyan-400">SKIN CLINIC</span>
                </h3>
                <p className="text-xs text-sky-400 font-medium">Professional Dermatology Care</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Specialized dermatological consultations and scientific treatments by <strong>{CLINIC_CONFIG.doctorName}</strong> ({CLINIC_CONFIG.doctorDegree}), Consultant Dermatologist in Dera Ismail Khan, KP, Pakistan.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs">
              <span className="bg-slate-900 border border-slate-800 text-cyan-300 px-3 py-1 rounded-full font-semibold">
                Daily Token Capacity: 30 Max
              </span>
              <span className="bg-slate-900 border border-slate-800 text-emerald-400 px-3 py-1 rounded-full font-semibold">
                Fee: PKR 1,000
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-serif">Quick Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <a href="#hero" className="hover:text-cyan-400 transition-colors">
                  Home Overview
                </a>
              </li>
              <li>
                <a href="#doctor" className="hover:text-cyan-400 transition-colors">
                  About Dr. Rohail Danish
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Dermatology Treatments
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-cyan-400 transition-colors">
                  Book Online Token
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-cyan-400 transition-colors">
                  Patient Feedback
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-cyan-400 transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-serif">Clinic Contacts</h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{CLINIC_CONFIG.address}, {CLINIC_CONFIG.city}, {CLINIC_CONFIG.province}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`tel:${CLINIC_CONFIG.phone}`} className="hover:text-cyan-400 font-mono font-bold">
                  {CLINIC_CONFIG.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/923209830583`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 font-mono font-bold"
                >
                  WhatsApp: {CLINIC_CONFIG.whatsapp}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`mailto:${CLINIC_CONFIG.email}`} className="hover:text-teal-400">
                  {CLINIC_CONFIG.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {CLINIC_CONFIG.name}. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span>Dera Ismail Khan, Khyber Pakhtunkhwa</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
