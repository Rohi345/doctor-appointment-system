import React, { useState, useEffect } from 'react';
import { CLINIC_CONFIG, PAYMENT_ACCOUNTS } from '../data/clinicData';
import { AppointmentType, PaymentMethod, Appointment } from '../types';
import { getBookedTokensCount, createAppointment, getNextAvailableToken } from '../lib/storage';
import { Calendar, User, Phone, CheckCircle, AlertCircle, Clock, CreditCard, ShieldCheck, ArrowRight, Wallet, Building2, Ticket, CheckCircle2 } from 'lucide-react';

interface AppointmentBookingProps {
  initialService?: string;
  onAppointmentCreated: (appointment: Appointment) => void;
}

export const AppointmentBooking: React.FC<AppointmentBookingProps> = ({ initialService, onAppointmentCreated }) => {
  // Get default date as YYYY-MM-DD
  const getTodayString = (): string => {
    const today = new Date();
    // If today is Sunday, default to tomorrow (Monday)
    if (today.getDay() === 0) {
      today.setDate(today.getDate() + 1);
    }
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [appointmentDate, setAppointmentDate] = useState<string>(getTodayString());
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [appointmentType, setAppointmentType] = useState<AppointmentType>(
    (initialService as AppointmentType) || 'Dermatology Consultation'
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Easypaisa');
  const [transactionRef, setTransactionRef] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Dynamic token statistics for the chosen date
  const bookedCount = getBookedTokensCount(appointmentDate);
  const availableCount = Math.max(0, CLINIC_CONFIG.dailyLimit - bookedCount);
  const nextTokenNumber = getNextAvailableToken(appointmentDate);
  const isFullyBooked = bookedCount >= CLINIC_CONFIG.dailyLimit;

  // Check if selected date is a Sunday
  const isSundaySelected = (): boolean => {
    if (!appointmentDate) return false;
    const parts = appointmentDate.split('-');
    if (parts.length !== 3) return false;
    const dateObj = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    return dateObj.getDay() === 0;
  };

  const isSunday = isSundaySelected();

  useEffect(() => {
    if (initialService) {
      setAppointmentType(initialService as AppointmentType);
    }
  }, [initialService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!fullName.trim()) {
      setErrorMsg('Please enter patient full name.');
      return;
    }

    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid phone number (e.g., 0320-9830583).');
      return;
    }

    if (isSunday) {
      setErrorMsg('The clinic is closed on Sundays. Please select a Monday through Saturday date.');
      return;
    }

    if (isFullyBooked) {
      setErrorMsg("Today's appointments are fully booked. Please select another date.");
      return;
    }

    if (paymentMethod !== 'Pay at Clinic' && !transactionRef.trim()) {
      // Friendly prompt for transaction ID, or generate auto reference
      setTransactionRef('EP/JC-' + Math.floor(100000 + Math.random() * 900000));
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const res = createAppointment({
        fullName,
        phone,
        email,
        appointmentDate,
        appointmentType,
        paymentMethod,
        transactionRef: paymentMethod !== 'Pay at Clinic' ? (transactionRef || 'TRX-' + Date.now().toString().slice(-6)) : undefined,
        notes,
      });

      setIsSubmitting(false);

      if (res.success && res.appointment) {
        onAppointmentCreated(res.appointment);
        // Reset form
        setFullName('');
        setPhone('');
        setEmail('');
        setTransactionRef('');
        setNotes('');
      } else {
        setErrorMsg(res.message || 'Failed to generate token. Please try again.');
      }
    }, 400);
  };

  const appointmentTypeOptions: AppointmentType[] = [
    'Dermatology Consultation',
    'Acne & Pimple Care',
    'Skin Allergy Treatment',
    'Hair Loss Consultation',
    'Eczema & Psoriasis',
    'Skin Infection & Procedures',
    'Follow-up Visit',
  ];

  return (
    <section id="booking" className="py-16 lg:py-24 bg-gradient-to-b from-slate-50 via-sky-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
            <Ticket className="w-3.5 h-3.5 text-emerald-600" />
            <span>Real-time Token System (Max 30 Daily)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif tracking-tight">
            Book Appointment <span className="text-sky-700">Token</span>
          </h2>
          <p className="text-base text-slate-600">
            Select your preferred appointment date to reserve your official consultation token with Dr. Rohail Danish.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Token Live Counter & Payment Instructions */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Token Status Widget */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-5 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Selected Date</span>
                  <p className="text-lg font-bold text-slate-900 font-serif">{appointmentDate}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Daily Capacity</span>
                  <p className="text-lg font-bold text-teal-700 font-serif">{CLINIC_CONFIG.dailyLimit} Patients</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-600">Tokens Issued: <strong>{bookedCount} / 30</strong></span>
                  <span className={isFullyBooked ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}>
                    {isFullyBooked ? '0 Slots Available' : `${availableCount} Tokens Left`}
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isFullyBooked
                        ? 'bg-rose-500'
                        : bookedCount > 20
                        ? 'bg-amber-500'
                        : 'bg-gradient-to-r from-sky-500 to-teal-500'
                    }`}
                    style={{ width: `${Math.min(100, (bookedCount / CLINIC_CONFIG.dailyLimit) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Next Token Badge */}
              {!isSunday && !isFullyBooked && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-900 to-teal-900 text-white flex items-center justify-between shadow-md">
                  <div>
                    <span className="text-xs text-sky-200 uppercase tracking-wider block">Your Reserved Token</span>
                    <span className="text-2xl font-black text-white font-serif">TOKEN #{nextTokenNumber}</span>
                  </div>
                  <div className="text-right bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/20">
                    <span className="text-xs text-cyan-200 block">Fee: PKR {CLINIC_CONFIG.consultationFee.toLocaleString()}</span>
                  </div>
                </div>
              )}

              {/* Sunday Alert */}
              {isSunday && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm">Clinic Closed on Sundays</h4>
                    <p className="text-xs mt-0.5">Please select Monday to Saturday. Clinic hours: 4:00 PM – 9:00 PM.</p>
                  </div>
                </div>
              )}

              {/* Fully Booked Warning */}
              {isFullyBooked && !isSunday && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm">Appointments Fully Booked</h4>
                    <p className="text-xs mt-0.5">Today's appointments are fully booked. Please select another date.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Details Reference Box */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-sky-700" />
                <span>Online Payment Accounts</span>
              </h3>

              <div className="space-y-3 text-xs">
                {/* Easypaisa */}
                <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-1">
                  <div className="flex items-center justify-between font-bold text-emerald-900">
                    <span className="flex items-center gap-1.5">
                      <Wallet className="w-4 h-4 text-emerald-600" />
                      Easypaisa
                    </span>
                    <span className="text-emerald-700 font-mono text-sm">{PAYMENT_ACCOUNTS.easypaisa.accountNumber}</span>
                  </div>
                  <p className="text-slate-600">Title: {PAYMENT_ACCOUNTS.easypaisa.accountTitle}</p>
                </div>

                {/* JazzCash */}
                <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-100 space-y-1">
                  <div className="flex items-center justify-between font-bold text-rose-900">
                    <span className="flex items-center gap-1.5">
                      <Wallet className="w-4 h-4 text-rose-600" />
                      JazzCash
                    </span>
                    <span className="text-rose-700 font-mono text-sm">{PAYMENT_ACCOUNTS.jazzcash.accountNumber}</span>
                  </div>
                  <p className="text-slate-600">Title: {PAYMENT_ACCOUNTS.jazzcash.accountTitle}</p>
                </div>

                {/* Bank Transfer */}
                <div className="p-3 rounded-xl bg-sky-50/60 border border-sky-100 space-y-1">
                  <div className="flex items-center justify-between font-bold text-sky-900">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-sky-600" />
                      Meezan Bank
                    </span>
                    <span className="text-sky-800 font-mono text-xs">{PAYMENT_ACCOUNTS.bank.accountNumber}</span>
                  </div>
                  <p className="text-slate-600">IBAN: {PAYMENT_ACCOUNTS.bank.iban}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl relative">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-serif">Patient Booking Form</h3>
                  <p className="text-xs text-slate-500">Fill in patient information to receive instant token number.</p>
                </div>
                <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                  Fee: PKR 1,000
                </span>
              </div>

              {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Appointment Date */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    1. Appointment Date *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      min={getTodayString()}
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 font-medium text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-slate-50/50"
                      required
                    />
                  </div>
                </div>

                {/* Patient Full Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      2. Patient Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g., Muhammad Ali"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        required
                      />
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      3. Phone Number *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="0320-9830583"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        required
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    </div>
                  </div>
                </div>

                {/* Appointment Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    4. Appointment Type / Concern *
                  </label>
                  <select
                    value={appointmentType}
                    onChange={(e) => setAppointmentType(e.target.value as AppointmentType)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 font-medium text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
                  >
                    {appointmentTypeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Payment Options Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    5. Select Payment Option *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {(['Easypaisa', 'JazzCash', 'Bank Transfer', 'Pay at Clinic'] as PaymentMethod[]).map((pm) => (
                      <button
                        type="button"
                        key={pm}
                        onClick={() => setPaymentMethod(pm)}
                        className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all flex flex-col items-center justify-center gap-1 ${
                          paymentMethod === pm
                            ? 'border-sky-600 bg-sky-50 text-sky-900 shadow-xs ring-2 ring-sky-500/20'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <span>{pm}</span>
                        <span className={`text-[10px] font-medium ${pm === 'Pay at Clinic' ? 'text-amber-600' : 'text-emerald-600'}`}>
                          {pm === 'Pay at Clinic' ? 'Pending Payment' : 'Instant Paid'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transaction Ref / Note if online payment selected */}
                {paymentMethod !== 'Pay at Clinic' && (
                  <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-100 space-y-2">
                    <label className="block text-xs font-semibold text-slate-800">
                      Transaction ID / Reference Number (Optional):
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., TRX-992104"
                      value={transactionRef}
                      onChange={(e) => setTransactionRef(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white text-slate-900"
                    />
                    <p className="text-[11px] text-slate-500">
                      Status will be marked as <strong className="text-emerald-700">Paid</strong> upon submission.
                    </p>
                  </div>
                )}

                {paymentMethod === 'Pay at Clinic' && (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                    Status will be marked as <strong className="text-amber-800 font-bold">Pending Payment</strong>. You can settle PKR 1,000 cash at the clinic counter on arrival.
                  </div>
                )}

                {/* Additional Symptoms Notes */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    6. Additional Notes / Symptoms (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Brief description of skin or hair condition..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isSunday || isFullyBooked}
                  className={`w-full py-4 rounded-2xl font-bold text-base text-white shadow-xl transition-all flex items-center justify-center gap-2 ${
                    isSunday || isFullyBooked
                      ? 'bg-slate-300 cursor-not-allowed shadow-none'
                      : 'bg-gradient-to-r from-sky-600 via-teal-600 to-sky-700 hover:from-sky-700 hover:to-teal-700 hover:scale-[1.01] active:scale-[0.99] shadow-sky-600/30'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Generating Token...
                    </span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Confirm & Generate Token {nextTokenNumber ? `#${nextTokenNumber}` : ''}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
