import React, { useState, useEffect } from 'react';
import { Appointment, PaymentStatus, AppointmentType, PaymentMethod } from '../types';
import {
  getAllAppointments,
  updatePaymentStatus,
  deleteAppointment,
  createAppointment,
} from '../lib/supabase-storage';
import { CLINIC_CONFIG } from '../data/clinicData';
import {
  Users,
  Calendar,
  CreditCard,
  Clock,
  Ticket,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
  Plus,
  RefreshCw,
  MessageCircle,
  Printer,
  Trash2,
  DollarSign,
  TrendingUp,
  SlidersHorizontal,
  Phone,
  User,
} from 'lucide-react';

interface AdminDashboardProps {
  onClose: () => void;
  onViewReceipt: (apt: Appointment) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose, onViewReceipt }) => {
  const getTodayString = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState<string>(getTodayString());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Paid' | 'Pending Payment'>('All');

  // Walk-in booking modal state
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientPhone, setNewPatientPhone] = useState('');
  const [newAptType, setNewAptType] = useState<AppointmentType>('Dermatology Consultation');
  const [newPaymentMethod, setNewPaymentMethod] = useState<PaymentMethod>('Pay at Clinic');
  const [addError, setAddError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const data = await getAllAppointments();
      setAppointments(data);
    } catch (err) {
      console.error('Failed to load appointments:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Filtered list by date, search, and payment status
  const appointmentsForSelectedDate = appointments.filter((a) => a.appointmentDate === selectedDate && a.status !== 'Cancelled');
  
  const filteredAppointments = appointmentsForSelectedDate.filter((apt) => {
    const matchesSearch =
      apt.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.phone.includes(searchQuery) ||
      apt.tokenNumber.toString() === searchQuery.trim();

    const matchesPayment = statusFilter === 'All' ? true : apt.paymentStatus === statusFilter;

    return matchesSearch && matchesPayment;
  });

  // KPI Computations
  const totalAllTime = appointments.length;
  const todayBooked = appointmentsForSelectedDate.length;
  const availableSlotsToday = Math.max(0, CLINIC_CONFIG.dailyLimit - todayBooked);
  const paidCount = appointmentsForSelectedDate.filter((a) => a.paymentStatus === 'Paid').length;
  const pendingCount = appointmentsForSelectedDate.filter((a) => a.paymentStatus === 'Pending Payment').length;
  const todayRevenue = paidCount * CLINIC_CONFIG.consultationFee;

  const handleTogglePaymentStatus = async (apt: Appointment) => {
    const nextStatus: PaymentStatus = apt.paymentStatus === 'Paid' ? 'Pending Payment' : 'Paid';
    try {
      await updatePaymentStatus(apt.id, nextStatus);
      await refreshData();
    } catch (err) {
      console.error('Failed to update payment status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to cancel this appointment token?')) {
      try {
        await deleteAppointment(id);
        await refreshData();
      } catch (err) {
        console.error('Failed to delete appointment:', err);
      }
    }
  };

  const handleAddWalkIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError(null);

    if (!newPatientName.trim() || !newPatientPhone.trim()) {
      setAddError('Patient Name and Phone Number are required.');
      return;
    }

    try {
      const res = await createAppointment({
        fullName: newPatientName,
        phone: newPatientPhone,
        appointmentDate: selectedDate,
        appointmentType: newAptType,
        paymentMethod: newPaymentMethod,
      });

      if (res.success) {
        await refreshData();
        setShowAddModal(false);
        setNewPatientName('');
        setNewPatientPhone('');
      } else {
        setAddError(res.message || 'Failed to issue token.');
      }
    } catch (err) {
      setAddError('Network error. Please try again.');
      console.error(err);
    }
  };

  const getWhatsAppReminderUrl = (apt: Appointment) => {
    const msg = `Assalam-o-Alaikum ${apt.fullName}, your token #${apt.tokenNumber} for Dr. Rohail Danish at Al Khair Skin Clinic is confirmed for ${apt.appointmentDate}. Payment status: ${apt.paymentStatus}. Fee: PKR 1,000.`;
    return `https://wa.me/92${apt.phone.replace(/^0/, '').replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex flex-col overflow-hidden">
      {/* Top Admin Navigation Header */}
      <div className="bg-slate-950 text-white px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-teal-500 flex items-center justify-center font-bold text-lg">
            AK
          </div>
          <div>
            <h2 className="text-lg font-bold font-serif text-white">Al Khair Skin Clinic Portal</h2>
            <p className="text-xs text-sky-400 font-medium">Doctor & Staff Management • Dr. Rohail Danish</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>+ New Walk-In Token</span>
          </button>

          <button
            onClick={() => refreshData()}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1"
            title="Reset Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors"
          >
            Close Dashboard
          </button>
        </div>
      </div>

      {/* Main Dashboard Scrollable Content */}
      <div className="flex-1 overflow-y-auto bg-slate-100 p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Date Selector & Search Filters Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
              <Calendar className="w-4 h-4 text-sky-700" />
              <span>Select Date:</span>
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-900 text-sm focus:ring-2 focus:ring-sky-500 bg-slate-50"
            />
            {selectedDate === getTodayString() && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
                Today
              </span>
            )}
          </div>

          {/* Search Box */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                placeholder="Search patient, phone, token..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-sky-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-white"
            >
              <option value="All">All Payments</option>
              <option value="Paid">Paid Only</option>
              <option value="Pending Payment">Pending Only</option>
            </select>
          </div>
        </div>

        {/* Analytics KPIs Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {/* KPI 1: Today's Booked Tokens */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today's Bookings</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif mt-1">
                {todayBooked} <span className="text-xs text-slate-400 font-normal">/ 30</span>
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center">
              <Ticket className="w-6 h-6" />
            </div>
          </div>

          {/* KPI 2: Available Slots */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Available Slots</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-teal-700 font-serif mt-1">
                {availableSlotsToday}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          {/* KPI 3: Paid Patients */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Paid Patients</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-serif mt-1">
                {paidCount}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          {/* KPI 4: Pending Payments */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Fee</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-serif mt-1">
                {pendingCount}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
          </div>

          {/* KPI 5: Estimated Revenue */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between col-span-2 md:col-span-1">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Collected Revenue</p>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif mt-1">
                PKR {todayRevenue.toLocaleString()}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Appointments Table Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-serif">
                Appointments List for <span className="text-sky-700">{selectedDate}</span>
              </h3>
              <p className="text-xs text-slate-500">
                Showing {filteredAppointments.length} token appointments (Daily limit 30)
              </p>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Issue New Token</span>
            </button>
          </div>

          {filteredAppointments.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-2">
              <Ticket className="w-12 h-12 mx-auto text-slate-300" />
              <p className="text-sm font-semibold text-slate-600">No appointments found for {selectedDate}.</p>
              <p className="text-xs">Select another date or click "+ New Walk-In Token" to register a patient.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3.5">Token #</th>
                    <th className="px-6 py-3.5">Patient Name</th>
                    <th className="px-6 py-3.5">Phone</th>
                    <th className="px-6 py-3.5">Appointment Type</th>
                    <th className="px-6 py-3.5">Payment Method</th>
                    <th className="px-6 py-3.5">Payment Status</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {filteredAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Token # */}
                      <td className="px-6 py-4 font-bold text-slate-900 font-mono text-sm">
                        <span className="inline-block px-2.5 py-1 rounded-lg bg-sky-100 text-sky-800 border border-sky-200">
                          #{apt.tokenNumber}
                        </span>
                      </td>

                      {/* Patient Name */}
                      <td className="px-6 py-4 font-bold text-slate-900 text-sm">
                        {apt.fullName}
                        {apt.email && <span className="block text-[11px] text-slate-400 font-normal">{apt.email}</span>}
                      </td>

                      {/* Phone */}
                      <td className="px-6 py-4 font-mono font-medium text-slate-700">{apt.phone}</td>

                      {/* Concern / Type */}
                      <td className="px-6 py-4 font-medium text-slate-700">{apt.appointmentType}</td>

                      {/* Payment Method */}
                      <td className="px-6 py-4 font-medium text-slate-600">
                        {apt.paymentMethod}
                        {apt.transactionRef && (
                          <span className="block text-[10px] text-slate-400 font-mono">Ref: {apt.transactionRef}</span>
                        )}
                      </td>

                      {/* Payment Status Toggle */}
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleTogglePaymentStatus(apt)}
                          className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-colors flex items-center gap-1 ${
                            apt.paymentStatus === 'Paid'
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200'
                              : 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200'
                          }`}
                          title="Click to toggle Paid / Pending Payment"
                        >
                          {apt.paymentStatus === 'Paid' ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                          ) : (
                            <AlertCircle className="w-3 h-3 text-amber-700" />
                          )}
                          <span>{apt.paymentStatus}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onViewReceipt(apt)}
                            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                            title="View / Print Token Slip"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>

                          <a
                            href={getWhatsAppReminderUrl(apt)}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800"
                            title="Send WhatsApp Reminder"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>

                          <button
                            onClick={() => handleDelete(apt.id)}
                            className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600"
                            title="Cancel Token"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Walk-in Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 font-serif">Issue Walk-In Token</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {addError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl">
                {addError}
              </div>
            )}

            <form onSubmit={handleAddWalkIn} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Appointment Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-bold"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Patient Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g., Tariq Mehmood"
                  value={newPatientName}
                  onChange={(e) => setNewPatientName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Phone Number *</label>
                <input
                  type="tel"
                  placeholder="0320-9830583"
                  value={newPatientPhone}
                  onChange={(e) => setNewPatientPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Appointment Type</label>
                <select
                  value={newAptType}
                  onChange={(e) => setNewAptType(e.target.value as AppointmentType)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                >
                  <option value="Dermatology Consultation">Dermatology Consultation</option>
                  <option value="Acne & Pimple Care">Acne & Pimple Care</option>
                  <option value="Skin Allergy Treatment">Skin Allergy Treatment</option>
                  <option value="Hair Loss Consultation">Hair Loss Consultation</option>
                  <option value="Eczema & Psoriasis">Eczema & Psoriasis</option>
                  <option value="Skin Infection & Procedures">Skin Infection & Procedures</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Payment Method</label>
                <select
                  value={newPaymentMethod}
                  onChange={(e) => setNewPaymentMethod(e.target.value as PaymentMethod)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium"
                >
                  <option value="Pay at Clinic">Pay at Clinic (Pending)</option>
                  <option value="Easypaisa">Easypaisa (Paid)</option>
                  <option value="JazzCash">JazzCash (Paid)</option>
                  <option value="Bank Transfer">Bank Transfer (Paid)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 font-semibold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold shadow-md"
                >
                  Issue Token
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
