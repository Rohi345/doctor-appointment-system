import React, { useState } from 'react';
import { MEDICAL_SERVICES } from '../data/clinicData';
import { MedicalService } from '../types';
import { Sparkles, ShieldAlert, Sparkle, HeartHandshake, Activity, ShieldCheck, Eye, Stethoscope, ArrowRight, CheckCircle2, X, Calendar } from 'lucide-react';

interface ServicesSectionProps {
  onBookService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onBookService }) => {
  const [selectedService, setSelectedService] = useState<MedicalService | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-sky-600" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-rose-600" />;
      case 'Sparkle':
        return <Sparkle className="w-6 h-6 text-amber-600" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-teal-600" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-indigo-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      case 'Eye':
        return <Eye className="w-6 h-6 text-purple-600" />;
      default:
        return <Stethoscope className="w-6 h-6 text-sky-700" />;
    }
  };

  return (
    <section id="services" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold">
            <Stethoscope className="w-3.5 h-3.5 text-sky-600" />
            <span>Dermatology Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif tracking-tight">
            Comprehensive <span className="text-sky-700">Skin & Hair Care</span> Services
          </h2>
          <p className="text-base text-slate-600">
            Evidence-based medical treatments and personalized dermatological procedures delivered with utmost care.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MEDICAL_SERVICES.map((service) => (
            <div
              key={service.id}
              className="group relative bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-sky-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Badge & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                    {getServiceIcon(service.iconName)}
                  </div>
                  {service.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full">
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Title & Desc */}
                <h3 className="text-lg font-bold text-slate-900 font-serif mb-2 group-hover:text-sky-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {service.shortDesc}
                </p>

                {/* Key Symptoms */}
                <div className="space-y-1 mb-4">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Treated Symptoms:</p>
                  <ul className="text-xs text-slate-700 space-y-1">
                    {service.symptoms.slice(0, 2).map((symptom, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-semibold text-sky-700 hover:text-sky-900 flex items-center gap-1"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onBookService(service.title)}
                  className="text-xs font-medium bg-sky-700 hover:bg-sky-800 text-white px-3 py-1.5 rounded-lg transition-colors"
                >
                  Book Token
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center">
                {getServiceIcon(selectedService.iconName)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-serif">{selectedService.title}</h3>
                <p className="text-xs text-sky-700 font-semibold">Al Khair Skin Clinic • Dr. Rohail Danish</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {selectedService.fullDesc}
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Primary Symptoms Treated:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedService.symptoms.map((sym, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>{sym}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Clinical Treatment Approach:</h4>
                <div className="space-y-1.5">
                  {selectedService.treatments.map((tr, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                      <span>{tr}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-between mb-6 text-xs text-slate-700">
              <div>
                <span className="font-semibold block text-slate-900">Consultation Fee</span>
                <span>PKR 1,000 (Covers clinical checkup)</span>
              </div>
              <div className="text-right">
                <span className="font-semibold block text-slate-900">Daily Capacity</span>
                <span className="text-sky-800 font-medium">30 Tokens Limit</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const title = selectedService.title;
                  setSelectedService(null);
                  onBookService(title);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold shadow-md transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Token for {selectedService.title}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
