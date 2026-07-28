import React from 'react';
import { Appointment } from '../types';
import { CLINIC_CONFIG } from '../data/clinicData';
import { CheckCircle, Download, MessageCircle, X, Calendar, Phone, MapPin, User, Ticket, CreditCard, ShieldCheck, Printer } from 'lucide-react';

interface SuccessReceiptModalProps {
  appointment: Appointment;
  onClose: () => void;
}

export const SuccessReceiptModal: React.FC<SuccessReceiptModalProps> = ({ appointment, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const whatsappMessage = `Assalam-o-Alaikum Dr. Rohail Danish, my appointment token is confirmed at Al Khair Skin Clinic!
- Token #: ${appointment.tokenNumber}
- Patient: ${appointment.fullName}
- Phone: ${appointment.phone}
- Date: ${appointment.appointmentDate}
- Concern: ${appointment.appointmentType}
- Payment Status: ${appointment.paymentStatus}`;

  const whatsappUrl = `https://wa.me/923209830583?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative my-8 print:shadow-none print:border-0 print:p-0">
        {/* Close button (Hidden during print) */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Printable Voucher Box */}
        <div id="printable-receipt" className="space-y-6">
          {/* Header Badge */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              Appointment Confirmed
            </span>
            <h2 className="text-2xl font-black text-slate-900 font-serif tracking-tight">
              {CLINIC_CONFIG.name}
            </h2>
            <p className="text-xs text-sky-800 font-semibold">{CLINIC_CONFIG.doctorName} • {CLINIC_CONFIG.doctorTitle}</p>
          </div>

          {/* Big Token Number Callout Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-900 via-teal-900 to-sky-950 text-white text-center shadow-lg relative overflow-hidden">
            <span className="text-xs text-cyan-200 font-medium tracking-widest uppercase block">Official Consultation Token</span>
            <div className="text-4xl sm:text-5xl font-black text-white font-serif my-1">
              TOKEN #{appointment.tokenNumber}
            </div>
            <p className="text-xs text-cyan-100">
              {CLINIC_CONFIG.timings.days} (4:00 PM – 9:00 PM)
            </p>
          </div>

          {/* Appointment Details Grid */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-slate-500 font-medium">Token ID:</span>
              <span className="font-mono font-bold text-slate-900">{appointment.id}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-sky-600" />
                Patient Name:
              </span>
              <span className="font-bold text-slate-900 text-sm">{appointment.fullName}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-sky-600" />
                Phone Number:
              </span>
              <span className="font-semibold text-slate-800">{appointment.phone}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-sky-600" />
                Appointment Date:
              </span>
              <span className="font-bold text-sky-800 text-sm">{appointment.appointmentDate}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium flex items-center gap-1">
                <Ticket className="w-3.5 h-3.5 text-sky-600" />
                Appointment Type:
              </span>
              <span className="font-semibold text-slate-800">{appointment.appointmentType}</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <span className="text-slate-500 font-medium flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-sky-600" />
                Consultation Fee:
              </span>
              <span className="font-extrabold text-slate-900 text-sm">PKR 1,000</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Payment Method & Status:</span>
              <span className="flex items-center gap-1.5">
                <span className="text-slate-700 font-medium">{appointment.paymentMethod}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    appointment.paymentStatus === 'Paid'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}
                >
                  {appointment.paymentStatus}
                </span>
              </span>
            </div>
          </div>

          {/* Location & Instructions */}
          <div className="p-3 rounded-xl bg-sky-50 border border-sky-100 text-slate-700 text-[11px] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-sky-900">
              <MapPin className="w-3.5 h-3.5 text-sky-700" />
              Location: Near Hayat Medical Complex Area, Dera Ismail Khan
            </div>
            <p className="text-slate-600">
              Please arrive 10-15 minutes prior to 4:00 PM on your appointment date. Present this token number at reception.
            </p>
          </div>
        </div>

        {/* Action Buttons (Hidden during printing) */}
        <div className="mt-6 space-y-3 print:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Download / Print Receipt</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Clinic</span>
            </a>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-colors"
          >
            Done & Return to Website
          </button>
        </div>
      </div>
    </div>
  );
};
