export type AppointmentType = 
  | 'Dermatology Consultation'
  | 'Acne & Pimple Care'
  | 'Skin Allergy Treatment'
  | 'Hair Loss Consultation'
  | 'Eczema & Psoriasis'
  | 'Skin Infection & Procedures'
  | 'Follow-up Visit';

export type PaymentMethod = 'EasyPaisa' | 'JazzCash' | 'Cash at Clinic';

export type PaymentStatus = 'Pending' | 'Paid' | 'Rejected';

export type AppointmentStatus = 'Confirmed' | 'Completed' | 'Cancelled';

export interface Appointment {
  id: string;
  tokenNumber: number;
  fullName: string;
  phone: string;
  email?: string;
  appointmentDate: string; // YYYY-MM-DD
  appointmentType: AppointmentType;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: AppointmentStatus;
  transactionRef?: string;
  notes?: string;
  createdAt: string;
}

export interface MedicalService {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  symptoms: string[];
  treatments: string[];
  recommendedSessions?: string;
  badge?: string;
}

export interface PatientTestimonial {
  id: string;
  patientName: string;
  location: string;
  condition: string;
  comment: string;
  rating: number;
  date: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Booking & Fees' | 'Timings' | 'Treatments';
}

export interface ClinicConfig {
  name: string;
  doctorName: string;
  doctorDegree: string;
  doctorTitle: string;
  consultationFee: number; // PKR
  dailyLimit: number; // 30
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  province: string;
  timings: {
    days: string;
    hours: string;
    sunday: string;
  };
}
