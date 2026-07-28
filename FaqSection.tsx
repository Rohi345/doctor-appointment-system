import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/clinicData';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif tracking-tight">
            Frequently Asked <span className="text-sky-700">Questions</span>
          </h2>
          <p className="text-base text-slate-600">
            Clear information regarding appointments, fees, payments, and clinic operations.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-bold text-slate-900 text-base sm:text-lg font-serif">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-500">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-sky-700" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-slate-600 border-t border-slate-200/60 leading-relaxed bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
