import type {
  IntakeFormData,
  PersonalDetails,
  FamilyContext,
  MedicalHistory,
  MedicalCondition,
  HabitsAndAddictions,
  HabitEntry,
} from '@/types'

export const DEFAULT_PERSONAL: PersonalDetails = {
  firstName: '',
  lastName: '',
  idNumber: '',
  dateOfBirth: '',
  gender: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  occupation: '',
  referralSource: '',
}

export const DEFAULT_FAMILY: FamilyContext = {
  maritalStatus: '',
  spouseName: '',
  spousePhone: '',
  numberOfChildren: null,
  children: [],
  familyADHDHistory: '',
  familyNotes: '',
}

export const DEFAULT_MEDICAL_CONDITIONS: MedicalCondition[] = [
  { id: 'epilepsy', label: 'Epilepsy', labelHe: 'אפילפסיה', present: null, details: '' },
  { id: 'heart', label: 'Heart Disease', labelHe: 'מחלות לב', present: null, details: '' },
  { id: 'thyroid', label: 'Thyroid Disorder', labelHe: 'הפרעות בלוטת התריס', present: null, details: '' },
  { id: 'diabetes', label: 'Diabetes', labelHe: 'סוכרת', present: null, details: '' },
  { id: 'hypertension', label: 'Hypertension', labelHe: 'לחץ דם גבוה', present: null, details: '' },
  { id: 'anxiety', label: 'Anxiety Disorder', labelHe: 'הפרעת חרדה', present: null, details: '' },
  { id: 'depression', label: 'Depression', labelHe: 'דיכאון', present: null, details: '' },
  { id: 'sleep_disorder', label: 'Sleep Disorder', labelHe: 'הפרעת שינה', present: null, details: '' },
  { id: 'tics', label: 'Tic Disorder / Tourette', labelHe: 'טיקים / טורט', present: null, details: '' },
  { id: 'learning_disability', label: 'Learning Disability', labelHe: 'לקות למידה', present: null, details: '' },
]

export const DEFAULT_MEDICAL: MedicalHistory = {
  conditions: DEFAULT_MEDICAL_CONDITIONS,
  currentMedications: '',
  pastMedications: '',
  allergies: '',
  previousDiagnoses: '',
  currentTherapist: '',
  psychiatristName: '',
  additionalNotes: '',
}

export const DEFAULT_HABITS: HabitEntry[] = [
  { id: 'smoking', label: 'Smoking', labelHe: 'עישון', frequency: '', details: '' },
  { id: 'alcohol', label: 'Alcohol', labelHe: 'אלכוהול', frequency: '', details: '' },
  { id: 'cannabis', label: 'Cannabis', labelHe: 'קנאביס', frequency: '', details: '' },
  { id: 'caffeine', label: 'Caffeine (excessive)', labelHe: 'קפאין (מופרז)', frequency: '', details: '' },
  { id: 'gambling', label: 'Gambling', labelHe: 'הימורים', frequency: '', details: '' },
  { id: 'gaming', label: 'Gaming (excessive)', labelHe: 'משחקים (מופרזים)', frequency: '', details: '' },
]

export const DEFAULT_HABITS_AND_ADDICTIONS: HabitsAndAddictions = {
  habits: DEFAULT_HABITS,
  sleepQuality: '',
  averageSleepHours: null,
  exerciseFrequency: '',
  screenTimeHours: null,
  additionalNotes: '',
}

export const DEFAULT_INTAKE: IntakeFormData = {
  personalDetails: DEFAULT_PERSONAL,
  familyContext: DEFAULT_FAMILY,
  medicalHistory: DEFAULT_MEDICAL,
  habitsAndAddictions: DEFAULT_HABITS_AND_ADDICTIONS,
  completedAt: null,
  status: 'draft',
}
