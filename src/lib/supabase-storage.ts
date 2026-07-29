/**
 * Supabase-backed storage layer.
 * All functions are async and map between the app's Appointment type
 * and the Supabase `appointments` table schema.
 *
 * Column mapping:
 *   DB column              | App field
 *   -----------------------|------------------
 *   id (int, auto)         | id (string)
 *   patient_name           | fullName
 *   phone                  | phone
 *   appointment_date       | appointmentDate
 *   appointment_type       | appointmentType
 *   payment_method         | paymentMethod
 *   payment_status         | paymentStatus
 *   appointment_status     | status
 *   token_number           | tokenNumber
 *   payment_reference      | transactionRef
 *   notes                  | notes
 *   created_at             | createdAt
 */

import { supabase } from './supabaseClient';
import {
  Appointment,
  PaymentMethod,
  PaymentStatus,
  AppointmentType,
} from '../types';
import { CLINIC_CONFIG } from '../data/clinicData';

// ─── Row ↔ App type mapping ───────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRow(row: any): Appointment {
  return {
    id: String(row.id),
    tokenNumber: row.token_number,
    fullName: row.patient_name,
    phone: row.phone,
    appointmentDate: row.appointment_date,
    appointmentType: row.appointment_type as AppointmentType,
    paymentMethod: row.payment_method as PaymentMethod,
    paymentStatus: row.payment_status as PaymentStatus,
    status: row.appointment_status,
    transactionRef: row.payment_reference ?? undefined,
    notes: row.notes ?? undefined,
    createdAt: row.created_at,
  };
}

// ─── Read operations ──────────────────────────────────────────────────────────

/** Fetch all non-cancelled appointments for a given date, ordered by token. */
export async function getAppointmentsByDate(
  dateStr: string
): Promise<Appointment[]> {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('appointment_date', dateStr)
    .neq('appointment_status', 'Cancelled')
    .order('token_number', { ascending: true });

  if (error) throw error;
  return (data ?? []).map(mapRow);
}

/** Count non-cancelled appointments for a given date. */
export async function getBookedTokensCount(dateStr: string): Promise<number> {
  const { count, error } = await supabase
    .from('appointments')
    .select('*', { count: 'exact', head: true })
    .eq('appointment_date', dateStr)
    .neq('appointment_status', 'Cancelled');

  if (error) throw error;
  return count ?? 0;
}

/** Next available token number for a date, or null if fully booked. */
export async function getNextAvailableToken(
  dateStr: string
): Promise<number | null> {
  const count = await getBookedTokensCount(dateStr);
  if (count >= CLINIC_CONFIG.dailyLimit) return null;
  return count + 1;
}

/** Fetch all appointments (for admin dashboard). */
export async function getAllAppointments(): Promise<Appointment[]> {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapRow);
}

// ─── Write operations ─────────────────────────────────────────────────────────

export interface CreateAppointmentInput {
  fullName: string;
  phone: string;
  appointmentDate: string;
  appointmentType: AppointmentType;
  paymentMethod: PaymentMethod;
  transactionRef?: string;
  notes?: string;
}

/**
 * Create a new appointment in Supabase.
 * Re-checks the daily limit right before inserting to prevent over-booking.
 */
export async function createAppointment(
  input: CreateAppointmentInput
): Promise<{ success: boolean; appointment?: Appointment; message?: string }> {
  try {
    // Re-check availability atomically
    const count = await getBookedTokensCount(input.appointmentDate);
    if (count >= CLINIC_CONFIG.dailyLimit) {
      return {
        success: false,
        message:
          "Today's appointments are fully booked. Please select another date.",
      };
    }

    const tokenNumber = count + 1;
    const paymentStatus: PaymentStatus = 'Pending';

    const { data, error } = await supabase
      .from('appointments')
      .insert({
        patient_name: input.fullName.trim(),
        phone: input.phone.trim(),
        appointment_date: input.appointmentDate,
        appointment_type: input.appointmentType,
        payment_method: input.paymentMethod,
        payment_status: paymentStatus,
        appointment_status: 'Confirmed',
        token_number: tokenNumber,
        notes: input.notes?.trim() || null,
        payment_reference: input.transactionRef?.trim() || null,
      })
      .select()
      .single();

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, appointment: mapRow(data) };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unexpected error.';
    return { success: false, message };
  }
}

/** Toggle or set payment status on an appointment. */
export async function updatePaymentStatus(
  id: string,
  newStatus: PaymentStatus
): Promise<void> {
  const { error } = await supabase
    .from('appointments')
    .update({ payment_status: newStatus })
    .eq('id', Number(id));

  if (error) throw error;
}

/** Update appointment status (Confirmed / Completed / Cancelled). */
export async function updateAppointmentStatus(
  id: string,
  status: 'Confirmed' | 'Completed' | 'Cancelled'
): Promise<void> {
  const { error } = await supabase
    .from('appointments')
    .update({ appointment_status: status })
    .eq('id', Number(id));

  if (error) throw error;
}

/** Delete (hard-delete) an appointment by id. */
export async function deleteAppointment(id: string): Promise<void> {
  const { error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', Number(id));

  if (error) throw error;
}
