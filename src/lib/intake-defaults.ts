import type {
  IntakeFormData,
  PersonalDetails,
  FamilyContext,
  MedicalHistory,
  MedicalCondition,
  HabitsAndAddictions,
  HabitEntry,
  ASRSData,
  ASRSItem,
  TherapistSummary,
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

export const DEFAULT_ASRS_ITEMS: ASRSItem[] = [
  // Part A — 6 screening questions
  { id: 'a1', questionHe: 'כמה פעמים יש לך קושי לסיים את הפרטים האחרונים של פרויקט, לאחר שהחלקים המאתגרים כבר הושלמו?', part: 'A', response: '' },
  { id: 'a2', questionHe: 'כמה פעמים יש לך קושי לסדר דברים כשאתה צריך לבצע משימה שדורשת ארגון?', part: 'A', response: '' },
  { id: 'a3', questionHe: 'כמה פעמים יש לך בעיה לזכור פגישות או התחייבויות?', part: 'A', response: '' },
  { id: 'a4', questionHe: 'כשיש לך משימה שדורשת הרבה מחשבה, כמה פעמים אתה נמנע או מעכב את ההתחלה?', part: 'A', response: '' },
  { id: 'a5', questionHe: 'כמה פעמים אתה מתנועע או מתפתל עם הידיים או הרגליים כשאתה צריך לשבת לפרק זמן ארוך?', part: 'A', response: '' },
  { id: 'a6', questionHe: 'כמה פעמים אתה מרגיש פעיל מדי או מחויב לעשות דברים, כאילו מונע על ידי מנוע?', part: 'A', response: '' },
  // Part B — 12 additional diagnostic questions
  { id: 'b1', questionHe: 'כמה פעמים אתה עושה טעויות מחוסר זהירות כשאתה עובד על פרויקט משעמם או קשה?', part: 'B', response: '' },
  { id: 'b2', questionHe: 'כמה פעמים יש לך קושי לשמור על קשב כשאתה עושה עבודה משעממת או חזרתית?', part: 'B', response: '' },
  { id: 'b3', questionHe: 'כמה פעמים יש לך קושי להתרכז במה שאנשים אומרים לך, גם כשהם מדברים אליך ישירות?', part: 'B', response: '' },
  { id: 'b4', questionHe: 'כמה פעמים אתה שם לא במקום או מאבד חפצים בבית או בעבודה?', part: 'B', response: '' },
  { id: 'b5', questionHe: 'כמה פעמים אתה מוסח על ידי פעילות או רעש סביבך?', part: 'B', response: '' },
  { id: 'b6', questionHe: 'כמה פעמים אתה עוזב את מקומך בפגישות או במצבים אחרים שבהם צפוי שתישאר יושב?', part: 'B', response: '' },
  { id: 'b7', questionHe: 'כמה פעמים אתה מרגיש חוסר מנוחה או קושי להירגע?', part: 'B', response: '' },
  { id: 'b8', questionHe: 'כמה פעמים יש לך קושי להירגע ולנוח בזמן הפנוי שלך?', part: 'B', response: '' },
  { id: 'b9', questionHe: 'כמה פעמים אתה מוצא את עצמך מדבר יותר מדי במצבים חברתיים?', part: 'B', response: '' },
  { id: 'b10', questionHe: 'כמה פעמים אתה מוצא את עצמך מסיים את המשפטים של אנשים אחרים, לפני שהם מסיימים בעצמם?', part: 'B', response: '' },
  { id: 'b11', questionHe: 'כמה פעמים יש לך קושי לחכות לתורך כשהמצב דורש את זה?', part: 'B', response: '' },
  { id: 'b12', questionHe: 'כמה פעמים אתה קוטע אנשים אחרים כשהם עסוקים?', part: 'B', response: '' },
]

export const DEFAULT_ASRS: ASRSData = {
  items: DEFAULT_ASRS_ITEMS,
  completedAt: null,
}

export const DEFAULT_THERAPIST_SUMMARY: TherapistSummary = {
  text: '',
  therapistName: '',
  writtenAt: null,
}

export const DEFAULT_INTAKE: IntakeFormData = {
  personalDetails: DEFAULT_PERSONAL,
  familyContext: DEFAULT_FAMILY,
  medicalHistory: DEFAULT_MEDICAL,
  habitsAndAddictions: DEFAULT_HABITS_AND_ADDICTIONS,
  asrs: DEFAULT_ASRS,
  therapistSummary: DEFAULT_THERAPIST_SUMMARY,
  completedAt: null,
  status: 'draft',
}
