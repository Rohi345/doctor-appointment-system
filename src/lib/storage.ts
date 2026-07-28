import { Appointment, PaymentMethod, PaymentStatus, AppointmentType } from '../types';
import { INITIAL_SEED_APPOINTMENTS, CLINIC_CONFIG } from '../data/clinicData';

const STORAGE_KEY = 'alkhair_appointments_v1';

export function getAppointmentsFromStorage(): Appointment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_APPOINTMENTS));
      return INITIAL_SEED_APPOINTMENTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_SEED_APPOINTMENTS;
  } catch (e) {
    console.error('Failed to load appointments from storage:', e);
    return INITIAL_SEED_APPOINTMENTS;
  }
}

export function saveAppointmentsToStorage(appointments: Appointment[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  } catch (e) {
    console.error('Failed to save appointments to storage:', e);
  }
}

export function getAppointmentsByDate(dateStr: string): Appointment[] {
  const all = getAppointmentsFromStorage();
  return all.filter((apt) => apt.appointmentDate === dateStr && apt.status !== 'Cancelled');
}

export function getBookedTokensCount(dateStr: string): number {
  return getAppointmentsByDate(dateStr).length;
}

export function isDateFullyBooked(dateStr: string): boolean {
  return getBookedTokensCount(dateStr) >= CLINIC_CONFIG.dailyLimit;
}

export function getNextAvailableToken(dateStr: string): number | null {
  const count = getBookedTokensCount(dateStr);
  if (count >= CLINIC_CONFIG.dailyLimit) {
    return null;
  }
  return count + 1;
}

export interface CreateAppointmentInput {
  fullName: string;
  phone: string;
  email?: string;
  appointmentDate: string;
  appointmentType: AppointmentType;
  paymentMethod: PaymentMethod;
  transactionRef?: string;
  notes?: string;
}

export function createAppointment(input: CreateAppointmentInput): { success: boolean; appointment?: Appointment; message?: string } {
  const dateAppointments = getAppointmentsByDate(input.appointmentDate);
  if (dateAppointments.length >= CLINIC_CONFIG.dailyLimit) {
    return {
      success: false,
      message: "Today's appointments are fully booked. Please select another date.",
    };
  }

  const nextToken = dateAppointments.length + 1;
  const paymentStatus: PaymentStatus = input.paymentMethod === 'Pay at Clinic' ? 'Pending Payment' : 'Paid';

  const newAppointment: Appointment = {
    id: 'apt-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    tokenNumber: nextToken,
    fullName: input.fullName.trim(),
    phone: input.phone.trim(),
    email: input.email ? input.email.trim() : undefined,
    appointmentDate: input.appointmentDate,
    appointmentType: input.appointmentType,
    paymentMethod: input.paymentMethod,
    paymentStatus,
    status: 'Confirmed',
    transactionRef: input.transactionRef ? input.transactionRef.trim() : undefined,
    notes: input.notes ? input.notes.trim() : undefined,
    createdAt: new Date().toISOString(),
  };

  const all = getAppointmentsFromStorage();
  all.push(newAppointment);
  saveAppointmentsToStorage(all);

  return {
    success: true,
    appointment: newAppointment,
  };
}

export function updatePaymentStatusInStorage(id: string, newStatus: PaymentStatus): void {
  const all = getAppointmentsFromStorage();
  const updated = all.map((apt) => (apt.id === id ? { ...apt, paymentStatus: newStatus } : apt));
  saveAppointmentsToStorage(updated);
}

export function updateAppointmentStatusInStorage(id: string, status: 'Confirmed' | 'Completed' | 'Cancelled'): void {
  const all = getAppointmentsFromStorage();
  const updated = all.map((apt) => (apt.id === id ? { ...apt, status } : apt));
  saveAppointmentsToStorage(updated);
}

export function deleteAppointmentFromStorage(id: string): void {
  const all = getAppointmentsFromStorage();
  const filtered = all.filter((apt) => apt.id !== id);
  saveAppointmentsToStorage(filtered);
}

export function resetToSeedData(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_APPOINTMENTS));
}
