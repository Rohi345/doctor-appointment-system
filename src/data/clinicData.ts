import { ClinicConfig, MedicalService, PatientTestimonial, FaqItem, Appointment } from '../types';
import heroImage from '../assets/images/clinic_hero_banner_1785247361331.jpg';
const drImage = heroImage;
const treatmentImage = heroImage;

export const CLINIC_CONFIG: ClinicConfig & { doctorImg: string; heroImg: string; treatmentImg: string } = {
  name: 'AL KHAIR SKIN CLINIC',
  doctorName: 'Dr. Rohail Danish',
  doctorDegree: 'MBBS, FCPS (Dermatology)',
  doctorTitle: 'Consultant Dermatologist & Skin Specialist',
  consultationFee: 1000,
  dailyLimit: 30,
  phone: '0320-9830583',
  whatsapp: '0320-9830583',
  email: 'mr.niazi000@gmail.com',
  address: 'Near Hayat Medical Complex Area, Off Main University Road',
  city: 'Dera Ismail Khan',
  province: 'Khyber Pakhtunkhwa, Pakistan',
  timings: {
    days: 'Monday to Saturday',
    hours: '4:00 PM – 9:00 PM',
    sunday: 'Closed',
  },
  doctorImg: drImage,
  heroImg: heroImage,
  treatmentImg: treatmentImage,
};

export const PAYMENT_ACCOUNTS = {
  easypaisa: {
    title: 'Easypaisa Mobile Account',
    accountNumber: '0320-9830583',
    accountTitle: 'Dr. Rohail Danish / Al Khair Skin Clinic',
  },
  jazzcash: {
    title: 'JazzCash Mobile Account',
    accountNumber: '0320-9830583',
    accountTitle: 'Dr. Rohail Danish / Al Khair Skin Clinic',
  },
  bank: {
    title: 'Bank Transfer (Meezan Bank)',
    bankName: 'Meezan Bank Ltd, Dera Ismail Khan Branch',
    accountNumber: '0102-0104882910',
    iban: 'PK12MEZN0001020104882910',
    accountTitle: 'Al Khair Skin Clinic',
  },
};

export const MEDICAL_SERVICES: MedicalService[] = [
  {
    id: 'acne-treatment',
    title: 'Acne & Pimple Treatment',
    shortDesc: 'Comprehensive clinical evaluation and treatment for stubborn hormonal, cystic, or teenage acne.',
    fullDesc: 'Customized topical regimen, systemic therapy, and prescription solutions tailored to clear inflamed breakouts, balance sebum production, and prevent post-inflammatory hyperpigmentation.',
    iconName: 'Sparkles',
    symptoms: ['Cystic acne', 'Blackheads & whiteheads', 'Acne redness', 'Hormonal breakouts'],
    treatments: ['Custom topical prescriptions', 'Oral retinoid guidance', 'Chemical peeling', 'Anti-scarring management'],
    badge: 'Popular',
  },
  {
    id: 'skin-allergy',
    title: 'Skin Allergy & Urticaria',
    shortDesc: 'Targeted diagnosis for sudden hives, contact dermatitis, itching, and chronic skin allergies.',
    fullDesc: 'Expert allergen identification, anti-histamine therapy, soothing barrier creams, and personalized triggers counseling for fast itch relief and skin barrier restoration.',
    iconName: 'ShieldAlert',
    symptoms: ['Severe itching (Pruritus)', 'Hives & red welts', 'Rashes from cosmetics/metals', 'Allergic contact flares'],
    treatments: ['Targeted antihistamines', 'Topical immunomodulators', 'Barrier repair therapy', 'Allergen patch guidance'],
  },
  {
    id: 'hair-loss',
    title: 'Hair Loss & Scalp Consultation',
    shortDesc: 'Medical assessment for hair thinning, male/female pattern baldness, alopecia, and dandruff.',
    fullDesc: 'In-depth trichological analysis, scalp dermoscopy, nutritional assessment, and evidence-based medical therapies to stimulate hair regrowth and arrest active hair fall.',
    iconName: 'Sparkle',
    symptoms: ['Excessive hair shedding', 'Receding hairline', 'Scalp itching & flakes', 'Alopecia patches'],
    treatments: ['Minoxidil & peptide therapy', 'PRP counseling', 'Scalp detox treatments', 'Vitamin deficiency correction'],
    badge: 'High Demand',
  },
  {
    id: 'eczema-care',
    title: 'Eczema (Atopic Dermatitis) Care',
    shortDesc: 'Specialized management for dry, scaling, cracked, and intensely itchy skin flares.',
    fullDesc: 'Comprehensive care focusing on intense hydration, prescription anti-inflammatory agents, itch reduction, and long-term flare prevention strategies for kids and adults.',
    iconName: 'HeartHandshake',
    symptoms: ['Dry, scaly patches', 'Intense nighttime itching', 'Cracked skin on hands/flexures', 'Thickened skin'],
    treatments: ['Non-steroidal creams', 'Hydrating emollient routine', 'Steroid-sparing agents', 'Secondary infection control'],
  },
  {
    id: 'psoriasis-treatment',
    title: 'Psoriasis Management',
    shortDesc: 'Evidence-based treatment for silver scaly plaques, scalp psoriasis, and chronic flares.',
    fullDesc: 'Advanced systemic and topical therapies designed to slow down rapid skin cell buildup, relieve scaling plaques, and minimize joint discomfort or cosmetic distress.',
    iconName: 'Activity',
    symptoms: ['Silver scaly plaques', 'Thickened fingernails', 'Red inflamed patches', 'Scalp plaque buildup'],
    treatments: ['Topical calcineurin inhibitors', 'Systemic immune therapy', 'Keratolytic agents', 'Lifestyle flare management'],
  },
  {
    id: 'skin-infections',
    title: 'Skin Infection Treatment',
    shortDesc: 'Fast-acting clinical care for fungal ringworm (tinea), bacterial impetigo, or viral warts.',
    fullDesc: 'Microbial evaluation and potent target antimicrobial treatments to swiftly eradicate fungal infections, athlete’s foot, fungal nail conditions, and bacterial sores.',
    iconName: 'ShieldCheck',
    symptoms: ['Fungal ringworm (Dhad/Kalaf)', 'Fungal nail discoloration', 'Bacterial boils (Bal tod)', 'Viral skin lesions'],
    treatments: ['Antifungal regimens', 'Targeted antibiotics', 'Sterilizing antiseptic care', 'Prevention protocols'],
  },
  {
    id: 'mole-wart',
    title: 'Mole & Wart Evaluation',
    shortDesc: 'Dermatoscopic screening for skin tags, seborrheic keratosis, moles, and viral warts.',
    fullDesc: 'Precise non-invasive dermoscopy checkup to screen moles for safety and recommend safe chemical or clinical removal options for uncomfortable skin tags and warts.',
    iconName: 'Eye',
    symptoms: ['Growing or itching moles', 'Facial or neck skin tags', 'Painful plantar warts', 'Dark skin spots'],
    treatments: ['Dermatoscopy evaluation', 'Cryotherapy / cautery referral', 'Topical wart removers', 'Melanoma safety check'],
  },
  {
    id: 'general-consultation',
    title: 'General Dermatology Consultation',
    shortDesc: 'Complete skin checkup, hyperpigmentation (Chaiyan), dark spots, and general skin wellness.',
    fullDesc: 'Thorough head-to-toe consultation for skin glowing advice, melasma/pigmentation reduction, sun protection regimens, and preventive skin health tailored for local climate.',
    iconName: 'Stethoscope',
    symptoms: ['Melasma (Freckles/Chaiyan)', 'Sun damage & dark spots', 'Uneven skin tone', 'General skin concerns'],
    treatments: ['Customized depigmenting creams', 'Sunscreen selection', 'Oral antioxidants', 'Skin health routine'],
    badge: 'Essential',
  },
];

export const PATIENT_TESTIMONIALS: PatientTestimonial[] = [
  {
    id: 't1',
    patientName: 'Muhammad Tariq Khan',
    location: 'Dera Ismail Khan',
    condition: 'Severe Acne & Scars',
    comment: 'Dr. Rohail Danish treated my cystic acne when no other medicine worked. Within 6 weeks my skin cleared up dramatically. Very polite doctor with genuine care.',
    rating: 5,
    date: '12 July 2026',
  },
  {
    id: 't2',
    patientName: 'Fatima Zohra',
    location: 'Main Bazar, D.I. Khan',
    condition: 'Chronic Skin Allergy & Hives',
    comment: 'I was struggling with sudden allergic itching for 3 months. Dr. Rohail diagnosed the exact allergy trigger and prescribed affordable, highly effective medicines. Token system is very smooth!',
    rating: 5,
    date: '28 June 2026',
  },
  {
    id: 't3',
    patientName: 'Sardar Hamza Gandapur',
    location: 'Kulachi, KP',
    condition: 'Hair Loss & Scalp Care',
    comment: 'Booked online token via WhatsApp link. Fee PKR 1,000 is extremely reasonable for such high quality care. My hair thinning has stopped completely.',
    rating: 5,
    date: '04 July 2026',
  },
  {
    id: 't4',
    patientName: 'Dr. Rabia Khattak',
    location: 'Hayat Medical Area, D.I. Khan',
    condition: 'Melasma & Hyperpigmentation',
    comment: 'The best skin clinic in Dera Ismail Khan! Clean, hygienic environment, precise consultation, and no unnecessary expensive tests. Highly recommended.',
    rating: 5,
    date: '19 May 2026',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Booking & Fees',
    question: 'What is the consultation fee at Al Khair Skin Clinic?',
    answer: 'The consultation fee is fixed at PKR 1,000 per patient for a comprehensive clinical assessment with Dr. Rohail Danish.',
  },
  {
    id: 'faq-2',
    category: 'Booking & Fees',
    question: 'How does the daily appointment token system work?',
    answer: 'Dr. Rohail Danish attends a maximum of 30 patients per day to ensure full attention. Tokens are issued sequentially from Token #1 to Token #30. Once 30 tokens are issued, appointments for that date close automatically.',
  },
  {
    id: 'faq-3',
    category: 'Timings',
    question: 'What are the clinic timings and working days?',
    answer: 'The clinic is open Monday through Saturday from 4:00 PM to 9:00 PM. The clinic remains closed on Sunday.',
  },
  {
    id: 'faq-4',
    category: 'Booking & Fees',
    question: 'What online payment methods are accepted?',
    answer: 'We support Easypaisa, JazzCash, and direct Bank Transfer for instant online payment. You can also select "Pay at Clinic" to settle your fee upon arrival.',
  },
  {
    id: 'faq-5',
    category: 'General',
    question: 'Where is Al Khair Skin Clinic located in Dera Ismail Khan?',
    answer: 'The clinic is conveniently located near Hayat Medical Complex area, off Main University Road, Dera Ismail Khan, Khyber Pakhtunkhwa.',
  },
  {
    id: 'faq-6',
    category: 'Treatments',
    question: 'Do I need a prior appointment before coming to the clinic?',
    answer: 'Yes, booking online in advance guarantees your token number and saves long waiting times. Walk-ins are accommodated only if daily 30-token capacity is not full.',
  },
];

// Seed realistic initial appointments for today and upcoming dates
const getTodayFormatted = (): string => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const INITIAL_SEED_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-001',
    tokenNumber: 1,
    fullName: 'Shahzad Ahmad',
    phone: '0300-9123456',
    email: 'shahzad@gmail.com',
    appointmentDate: getTodayFormatted(),
    appointmentType: 'Acne & Pimple Care',
    paymentMethod: 'Easypaisa',
    paymentStatus: 'Paid',
    status: 'Confirmed',
    transactionRef: 'EP-8891023',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'apt-002',
    tokenNumber: 2,
    fullName: 'Amina Bibi',
    phone: '0313-8822119',
    appointmentDate: getTodayFormatted(),
    appointmentType: 'Skin Allergy Treatment',
    paymentMethod: 'Pay at Clinic',
    paymentStatus: 'Pending Payment',
    status: 'Confirmed',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'apt-003',
    tokenNumber: 3,
    fullName: 'Usman Ali Gandapur',
    phone: '0345-7766554',
    email: 'usman.ali@yahoo.com',
    appointmentDate: getTodayFormatted(),
    appointmentType: 'Hair Loss Consultation',
    paymentMethod: 'JazzCash',
    paymentStatus: 'Paid',
    status: 'Confirmed',
    transactionRef: 'JC-9920184',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'apt-004',
    tokenNumber: 4,
    fullName: 'Zubair Kundi',
    phone: '0333-5544332',
    appointmentDate: getTodayFormatted(),
    appointmentType: 'Dermatology Consultation',
    paymentMethod: 'Pay at Clinic',
    paymentStatus: 'Pending Payment',
    status: 'Confirmed',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'apt-005',
    tokenNumber: 5,
    fullName: 'Noreen Gul',
    phone: '0321-4433221',
    appointmentDate: getTodayFormatted(),
    appointmentType: 'Eczema & Psoriasis',
    paymentMethod: 'Bank Transfer',
    paymentStatus: 'Paid',
    status: 'Confirmed',
    transactionRef: 'MB-1029384',
    createdAt: new Date().toISOString(),
  },
];
