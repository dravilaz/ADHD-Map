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

/**
 * ASRS v1.1 (Adult ADHD Self-Report Scale)
 * Part A: 6 screening questions
 * Part B: 12 additional diagnostic questions
 * Each rated on frequency: never(0) / rarely(1) / sometimes(2) / often(3) / veryOften(4)
 */
export type ASRSFrequency = 'never' | 'rarely' | 'sometimes' | 'often' | 'veryOften' | ''

export interface ASRSItem {
  id: string
  questionHe: string
  part: 'A' | 'B'
  response: ASRSFrequency
}

export interface ASRSData {
  items: ASRSItem[]
  completedAt: string | null
}

/**
 * Therapist clinical summary written at intake
 */
export interface TherapistSummary {
  text: string
  therapistName: string
  writtenAt: string | null
}

export interface IntakeFormData {
  personalDetails: PersonalDetails
  familyContext: FamilyContext
  medicalHistory: MedicalHistory
  habitsAndAddictions: HabitsAndAddictions
  asrs: ASRSData
  therapistSummary: TherapistSummary
  completedAt: string | null
  status: 'draft' | 'in_progress' | 'completed'
}

export type IntakeStep = 'personal' | 'family' | 'medical' | 'habits' | 'asrs' | 'summary' | 'review'

export const INTAKE_STEPS: { key: IntakeStep; label: string; labelHe: string }[] = [
  { key: 'personal', label: 'Personal Details', labelHe: 'פרטים אישיים' },
  { key: 'family', label: 'Family Context', labelHe: 'הקשר משפחתי' },
  { key: 'medical', label: 'Medical History', labelHe: 'היסטוריה רפואית' },
  { key: 'habits', label: 'Habits & Lifestyle', labelHe: 'הרגלים ואורח חיים' },
  { key: 'asrs', label: 'ASRS Questionnaire', labelHe: 'שאלון ASRS' },
  { key: 'summary', label: 'Therapist Summary', labelHe: 'סיכום מטפל' },
  { key: 'review', label: 'Review & Submit', labelHe: 'סקירה ושליחה' },
]
