/**
 * Intake form data types based on שאלון-קבלה ראשוני (Initial Intake Questionnaire)
 * Covers: Demographics, Family, Medical History, Addictions/Habits
 */

export interface PersonalDetails {
  firstName: string
  lastName: string
  idNumber: string
  dateOfBirth: string
  gender: 'male' | 'female' | 'other' | ''
  phone: string
  email: string
  address: string
  city: string
  occupation: string
  referralSource: string
}

export interface FamilyMember {
  name: string
  relation: string
  age: number | null
  hasADHD: boolean | null
  notes: string
}

export interface FamilyContext {
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed' | ''
  spouseName: string
  spousePhone: string
  numberOfChildren: number | null
  children: FamilyMember[]
  familyADHDHistory: string
  familyNotes: string
}

export interface MedicalCondition {
  id: string
  label: string
  labelHe: string
  present: boolean | null
  details: string
}

export interface MedicalHistory {
  conditions: MedicalCondition[]
  currentMedications: string
  pastMedications: string
  allergies: string
  previousDiagnoses: string
  currentTherapist: string
  psychiatristName: string
  additionalNotes: string
}

export interface HabitEntry {
  id: string
  label: string
  labelHe: string
  frequency: 'never' | 'rarely' | 'sometimes' | 'often' | 'daily' | ''
  details: string
}

export interface HabitsAndAddictions {
  habits: HabitEntry[]
  sleepQuality: 'good' | 'fair' | 'poor' | ''
  averageSleepHours: number | null
  exerciseFrequency: 'never' | 'rarely' | 'weekly' | 'daily' | ''
  screenTimeHours: number | null
  additionalNotes: string
}

export interface IntakeFormData {
  personalDetails: PersonalDetails
  familyContext: FamilyContext
  medicalHistory: MedicalHistory
  habitsAndAddictions: HabitsAndAddictions
  completedAt: string | null
  status: 'draft' | 'in_progress' | 'completed'
}

export type IntakeStep = 'personal' | 'family' | 'medical' | 'habits' | 'review'

export const INTAKE_STEPS: { key: IntakeStep; label: string; labelHe: string }[] = [
  { key: 'personal', label: 'Personal Details', labelHe: 'פרטים אישיים' },
  { key: 'family', label: 'Family Context', labelHe: 'הקשר משפחתי' },
  { key: 'medical', label: 'Medical History', labelHe: 'היסטוריה רפואית' },
  { key: 'habits', label: 'Habits & Lifestyle', labelHe: 'הרגלים ואורח חיים' },
  { key: 'review', label: 'Review & Submit', labelHe: 'סקירה ושליחה' },
]
