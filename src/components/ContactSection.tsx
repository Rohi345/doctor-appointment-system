import React from 'react';
import { CLINIC_CONFIG } from '../data/clinicData';
import { Phone, MessageCircle, Mail, MapPin, Clock, Calendar, Navigation, Building } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 lg:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800">
                Clinic Location & Hours
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white tracking-tight mt-3">
                Visit <span className="text-cyan-400">{CLINIC_CONFIG.name}</span>
              </h2>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                Consult with <strong>{CLINIC_CONFIG.doctorName}</strong> in a clean, modern private medical setup in Dera Ismail Khan.
              </p>
            </div>

            {/* Direct Contact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone Card */}
              <a
                href={`tel:${CLINIC_CONFIG.phone}`}
                className="p-5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-xs text-slate-400 font-medium block">Phone Call</span>
                <span className="text-base font-bold text-white font-mono">{CLINIC_CONFIG.phone}</span>
              </a>

              {/* WhatsApp Card */}
              <a
                href={`https://wa.me/923209830583?text=${encodeURIComponent('Hello Dr. Rohail Danish, I want to inquire about appointment timings.')}`}
                target="_blank"
                rel="noreferrer"
                className="p-5 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/60 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="text-xs text-emerald-300/80 font-medium block">WhatsApp Chat</span>
                <span className="text-base font-bold text-emerald-200 font-mono">{CLINIC_CONFIG.whatsapp}</span>
              </a>

              {/* Email Card */}
              <a
                href={`mailto:${CLINIC_CONFIG.email}`}
                className="p-5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-xs text-slate-400 font-medium block">Email Address</span>
                <span className="text-sm font-bold text-white truncate block">{CLINIC_CONFIG.email}</span>
              </a>

              {/* Address Card */}
              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                  <Building className="w-5 h-5" />
                </div>
                <span className="text-xs text-slate-400 font-medium block">Target Location</span>
                <span className="text-sm font-bold text-white block">{CLINIC_CONFIG.city}, KP</span>
              </div>
            </div>

            {/* Timings Table */}
            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Clinic Operating Schedule</span>
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-700/60">
                  <span className="text-slate-300">Monday – Saturday</span>
                  <span className="font-bold text-cyan-300 font-mono">4:00 PM – 9:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-400">Sunday</span>
                  <span className="font-bold text-rose-400 bg-rose-950/60 px-2.5 py-0.5 rounded-full border border-rose-800/60">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Location Map & Landmarks */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white font-serif">Dera Ismail Khan Clinic Map</h3>
                  <p className="text-xs text-slate-400">Hayat Medical Complex Vicinity</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Dera+Ismail+Khan+Hayat+Medical+Complex"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                </a>
              </div>

              {/* Styled Interactive Map Placeholder */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 h-64 bg-slate-950 flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>

                <div>
                  <h4 className="font-bold text-white text-base font-serif">{CLINIC_CONFIG.name}</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm">
                    {CLINIC_CONFIG.address}, {CLINIC_CONFIG.city}, Khyber Pakhtunkhwa, Pakistan.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap justify-center gap-2 text-[11px] font-medium text-cyan-300">
                  <span className="bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-700">Near Hayat Medical Complex</span>
                  <span className="bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-700">Main University Road Area</span>
                </div>
              </div>

              {/* Patient Note */}
              <p className="text-xs text-slate-400 leading-relaxed italic">
                Tip: If arriving from outside D.I. Khan (e.g. Kulachi, Tank, or Bannu road), navigate towards University Road or Hayat Medical Complex area. Free patient parking available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
