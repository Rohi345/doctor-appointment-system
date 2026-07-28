import React, { useState } from 'react';
import { CLINIC_CONFIG } from '../data/clinicData';
import { MessageCircle, X, Send } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const handleSend = () => {
    const textToSend = customMsg.trim()
      ? customMsg
      : 'Hello Dr. Rohail Danish, I would like to inquire about skin consultation at Al Khair Skin Clinic.';
    const url = `https://wa.me/923209830583?text=${encodeURIComponent(textToSend)}`;
    window.open(url, '_blank');
    setIsOpen(false);
    setCustomMsg('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Quick Message Popup Dialog */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 p-5 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
                <MessageCircle className="w-6 h-6 fill-white/20" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm font-serif">Al Khair Skin Clinic</h4>
                <p className="text-[11px] text-emerald-600 font-medium">WhatsApp Direct: {CLINIC_CONFIG.whatsapp}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-3 text-xs text-slate-600 leading-relaxed">
            Assalam-o-Alaikum! Chat directly with <strong className="text-slate-800">{CLINIC_CONFIG.doctorName}</strong> on WhatsApp for quick inquiries, token updates, or directions.
          </div>

          <div className="space-y-3">
            <textarea
              rows={2}
              placeholder="Type your query (e.g., Is Token #12 available today?)..."
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 text-slate-900"
            />

            <button
              onClick={handleSend}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.01]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Start WhatsApp Chat ({CLINIC_CONFIG.whatsapp})</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl shadow-emerald-500/40 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        {/* Animated Glow Pulse Rings */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-40"></span>
        <MessageCircle className="w-7 h-7 relative z-10 fill-white/20" />

        {/* Tooltip on hover */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
          WhatsApp Clinic (0320-9830583)
        </span>
      </button>
    </div>
  );
};
