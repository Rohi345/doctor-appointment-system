import React from 'react';
import { PATIENT_TESTIMONIALS } from '../data/clinicData';
import { Star, Quote, MapPin, CheckCircle2, User } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-slate-50 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
            <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span>Real Patient Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif tracking-tight">
            Trusted by <span className="text-sky-700">1,000+ Patients</span> in Dera Ismail Khan
          </h2>
          <p className="text-base text-slate-600">
            Read real feedback from patients treated by Dr. Rohail Danish at Al Khair Skin Clinic.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {PATIENT_TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
            >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-sky-100" />
                </div>

                {/* Condition Treated Badge */}
                <span className="inline-block px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-bold mb-3 border border-sky-100">
                  Treatment: {testimonial.condition}
                </span>

                {/* Comment */}
                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{testimonial.comment}"
                </p>
              </div>

              {/* Patient Info Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center border border-slate-200">
                    <User className="w-5 h-5 text-slate-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 font-serif text-sm">{testimonial.patientName}</h4>
                    <p className="text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-sky-600" />
                      {testimonial.location}
                    </p>
                  </div>
                </div>

                <div className="text-right text-slate-400 font-medium">
                  <span className="flex items-center gap-1 text-emerald-600 text-[11px] font-semibold mb-0.5">
                    <CheckCircle2 className="w-3 h-3" /> Verified Patient
                  </span>
                  <span>{testimonial.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
