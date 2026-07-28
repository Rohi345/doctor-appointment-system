import React from 'react';
import { CLINIC_CONFIG } from '../data/clinicData';
import { Calendar, MessageCircle, Award, Users, Clock, Star, MapPin, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
  availableTokensToday: number;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, availableTokensToday }) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-slate-50 to-white pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-80 h-80 bg-teal-200/40 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Location & Status Tag */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 border border-sky-200/80 text-sky-900 text-xs font-semibold shadow-xs">
              <span className="flex items-center gap-1 text-sky-700">
                <MapPin className="w-3.5 h-3.5 text-sky-600" />
                {CLINIC_CONFIG.city}, {CLINIC_CONFIG.province}
              </span>
              <span className="text-sky-300">•</span>
              <span className="text-teal-700 font-bold">Consultation Fee: PKR {CLINIC_CONFIG.consultationFee.toLocaleString()}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-serif">
              Professional Skin Care & <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-700 via-teal-600 to-sky-800">Dermatology Services</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed">
              Expert diagnosis, personalized treatment, and convenient online appointments with <strong className="text-slate-800 font-semibold">{CLINIC_CONFIG.doctorName}</strong> at <strong className="text-slate-800 font-semibold">{CLINIC_CONFIG.name}</strong>.
            </p>

            {/* Key Value Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Acne, Allergy, Hair Loss & Eczema Specialist</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Daily Token Limit (30 Patients Max)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Easypaisa, JazzCash & Bank Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Instant Token Receipt & WhatsApp Slips</span>
              </div>
            </div>

            {/* Call To Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onBookClick}
                className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-semibold text-base px-7 py-3.5 rounded-2xl shadow-lg shadow-sky-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Calendar className="w-5 h-5 text-sky-100" />
                <span>Book Appointment Token</span>
                <ArrowRight className="w-4 h-4 text-sky-200 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`https://wa.me/923209830583?text=${encodeURIComponent('Assalam-o-Alaikum Dr. Rohail Danish, I would like to book a skin consultation at Al Khair Skin Clinic.')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 border border-emerald-300 font-semibold text-base px-6 py-3.5 rounded-2xl shadow-xs transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600 fill-emerald-600/20" />
                <span>WhatsApp Consultation</span>
              </a>
            </div>

            {/* Live Token Status Alert */}
            <div className="p-3.5 rounded-xl bg-white/80 border border-slate-200/80 shadow-xs flex items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5 text-slate-700 font-medium">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span>Available Tokens Today:</span>
                <span className="font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-md">
                  {availableTokensToday > 0 ? `${availableTokensToday} / 30 Remaining` : 'Fully Booked Today'}
                </span>
              </div>
              <span className="text-slate-500 text-xs hidden sm:inline-block">Mon–Sat: 4 PM – 9 PM</span>
            </div>
          </div>

          {/* Right Hero Images & Glassmorphism Cards */}
          <div className="lg:col-span-5 relative">
            {/* Main Visual Container */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Doctor Portrait Image Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                <img
                  src={CLINIC_CONFIG.doctorImg}
                  alt={CLINIC_CONFIG.doctorName}
                  referrerPolicy="no-referrer"
                  className="w-full h-[420px] sm:h-[480px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

                {/* Overlay Doctor Name Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 font-serif">{CLINIC_CONFIG.doctorName}</h3>
                      <p className="text-xs font-semibold text-teal-700">{CLINIC_CONFIG.doctorDegree}</p>
                      <p className="text-xs text-slate-600">{CLINIC_CONFIG.doctorTitle}</p>
                    </div>
                    <div className="bg-sky-50 p-2 rounded-xl border border-sky-100 text-sky-700">
                      <Award className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Secondary Clinic Image Thumbnail */}
              <div className="absolute -bottom-6 -left-6 hidden sm:block w-48 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-white">
                <img
                  src={CLINIC_CONFIG.heroImg}
                  alt="Al Khair Skin Clinic Interior"
                  referrerPolicy="no-referrer"
                  className="w-full h-28 object-cover"
                />
                <div className="p-1.5 bg-slate-900 text-white text-[10px] text-center font-medium">
                  Al Khair Clinic Interior
                </div>
              </div>

              {/* Floating Patient Satisfaction Badge */}
              <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-100 shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                  <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <div className="flex items-center gap-1 font-bold text-slate-900 text-sm">
                    <span>4.9 / 5.0</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Patient Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Statistics Banner */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">5+ Years</div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Clinical Experience</p>
          </div>

          <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">1,000+</div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Patients Treated</p>
          </div>

          <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">30 Max</div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Daily Patient Tokens</p>
          </div>

          <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Star className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">99%</div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">High Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};
