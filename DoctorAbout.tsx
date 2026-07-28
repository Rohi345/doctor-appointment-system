import React from 'react';
import { CLINIC_CONFIG } from '../data/clinicData';
import { Award, CheckCircle2, Clock, MapPin, Sparkles, Stethoscope, ShieldCheck, Phone, Calendar } from 'lucide-react';

interface DoctorAboutProps {
  onBookClick: () => void;
}

export const DoctorAbout: React.FC<DoctorAboutProps> = ({ onBookClick }) => {
  const conditionsTreated = [
    { title: 'Acne & Pimples', desc: 'Hormonal, cystic, scar care & oil balancing' },
    { title: 'Skin Allergy & Hives', desc: 'Urticaria, contact rashes & itch relief' },
    { title: 'Eczema & Atopic Care', desc: 'Dry scaling, moisture barrier & flare repair' },
    { title: 'Psoriasis Treatment', desc: 'Silver plaque reduction & systemic care' },
    { title: 'Hair Loss & Alopecia', desc: 'Pattern baldness, thinning & scalp detox' },
    { title: 'Skin Infections', desc: 'Fungal (Dhad), bacterial & viral warts' },
    { title: 'Melasma & Chaiyan', desc: 'Hyperpigmentation & sun spot clearing' },
    { title: 'General Skin Conditions', desc: 'Routine dermatological checks & care' },
  ];

  return (
    <section id="doctor" className="py-16 lg:py-24 bg-slate-50 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Side - Doctor Profile & Consultation Room */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden bg-white p-3 shadow-xl border border-slate-200">
              <img
                src={CLINIC_CONFIG.doctorImg}
                alt={CLINIC_CONFIG.doctorName}
                referrerPolicy="no-referrer"
                className="w-full h-96 object-cover object-top rounded-2xl"
              />
              <div className="absolute top-6 right-6 bg-sky-900/90 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>FCPS Certified</span>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-sky-50/80 border border-sky-100/80">
                <div className="flex items-center justify-between text-slate-800">
                  <div>
                    <h4 className="font-bold font-serif text-lg text-slate-900">{CLINIC_CONFIG.doctorName}</h4>
                    <p className="text-xs text-sky-800 font-medium">{CLINIC_CONFIG.doctorTitle}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Consultation Fee</span>
                    <span className="text-base font-extrabold text-teal-700">PKR {CLINIC_CONFIG.consultationFee.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Treatment Room Preview */}
            <div className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-md bg-white p-3 flex items-center gap-4">
              <img
                src={CLINIC_CONFIG.treatmentImg}
                alt="Sterile Skin Treatment Room"
                referrerPolicy="no-referrer"
                className="w-24 h-20 rounded-xl object-cover shrink-0"
              />
              <div>
                <h5 className="font-semibold text-slate-900 text-sm">Sterile Diagnostics Suite</h5>
                <p className="text-xs text-slate-500 mt-0.5">Equipped for dermatoscopy, skin patch testing, and sterile minor skin procedures.</p>
              </div>
            </div>
          </div>

          {/* Right Details Side */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-semibold mb-3">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Expert Consultant Dermatologist</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif tracking-tight">
                About <span className="text-sky-700">{CLINIC_CONFIG.doctorName}</span>
              </h2>
              <p className="text-base text-slate-600 mt-3 leading-relaxed">
                Dr. Rohail Danish is a highly respected Consultant Dermatologist dedicated to providing scientific, compassionate, and result-oriented skin, hair, and nail treatments in Dera Ismail Khan.
              </p>
            </div>

            {/* Bio Details */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs text-sm text-slate-700 space-y-2">
              <p>
                At <strong>{CLINIC_CONFIG.name}</strong>, every patient receives a careful diagnostic evaluation without rushed consultations. Dr. Rohail Danish specializes in treating complex dermatological conditions tailored specifically to the climate and skin types of Khyber Pakhtunkhwa.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1 text-slate-800">
                  <Clock className="w-3.5 h-3.5 text-sky-600" />
                  Mon – Sat: 4:00 PM – 9:00 PM
                </span>
                <span className="flex items-center gap-1 text-slate-800">
                  <MapPin className="w-3.5 h-3.5 text-sky-600" />
                  Hayat Medical Complex Area, D.I. Khan
                </span>
              </div>
            </div>

            {/* Specialized Conditions Grid */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span>Specialized Medical Treatments</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {conditionsTreated.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 hover:border-sky-300 transition-colors flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Call To Action */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onBookClick}
                className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-medium text-sm px-6 py-3 rounded-xl shadow-md transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Token with Dr. Rohail Danish</span>
              </button>

              <a
                href={`tel:${CLINIC_CONFIG.phone}`}
                className="inline-flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium text-sm px-5 py-3 rounded-xl transition-all"
              >
                <Phone className="w-4 h-4 text-slate-700" />
                <span>Call Clinic ({CLINIC_CONFIG.phone})</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
