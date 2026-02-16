import type { ExecutiveFunctionScores, NetworkNode, NetworkEdge, TimelineMilestone, PatientRoadmap } from '@/types'

/** Demo data for visualization — replaced with real data once Supabase is connected */

export const DEMO_EF_SCORES: ExecutiveFunctionScores = {
  activation: 4.2,
  focus: 3.1,
  effort: 5.0,
  emotion: 3.8,
  memory: 4.5,
  action: 6.2,
}

export const DEMO_NODES: NetworkNode[] = [
  { id: 's1', label: 'Procrastination', labelHe: 'דחיינות', type: 'symptom', severity: 8 },
  { id: 's2', label: 'Difficulty focusing', labelHe: 'קושי במיקוד', type: 'symptom', severity: 7 },
  { id: 's3', label: 'Emotional dysregulation', labelHe: 'חוסר ויסות רגשי', type: 'symptom', severity: 6 },
  { id: 's4', label: 'Forgetfulness', labelHe: 'שכחנות', type: 'symptom', severity: 7 },
  { id: 'i1', label: 'Work underperformance', labelHe: 'תת-ביצוע בעבודה', type: 'impact', severity: 8 },
  { id: 'i2', label: 'Relationship strain', labelHe: 'מתח בזוגיות', type: 'impact', severity: 6 },
  { id: 'i3', label: 'Low self-esteem', labelHe: 'דימוי עצמי נמוך', type: 'impact', severity: 7 },
  { id: 'i4', label: 'Missed appointments', labelHe: 'החמצת תורים', type: 'impact', severity: 5 },
  { id: 'n1', label: 'CBT Therapy', labelHe: 'טיפול CBT', type: 'intervention', severity: 0 },
  { id: 'n2', label: 'Methylphenidate', labelHe: 'מתילפנידאט', type: 'intervention', severity: 0 },
]

export const DEMO_EDGES: NetworkEdge[] = [
  { id: 'e1', source: 's1', target: 'i1', weight: 0.9, reasoning: 'דחיינות מובילה ישירות לתת-ביצוע בעבודה בשל אי-עמידה בלוחות זמנים' },
  { id: 'e2', source: 's2', target: 'i1', weight: 0.7, reasoning: 'קושי במיקוד מפחית את איכות העבודה ומגדיל טעויות' },
  { id: 'e3', source: 's3', target: 'i2', weight: 0.8, reasoning: 'תגובות רגשיות חזקות יוצרות מתח בין-אישי עם בן/בת הזוג' },
  { id: 'e4', source: 's1', target: 'i3', weight: 0.6, reasoning: 'דפוס חוזר של דחיינות מחזק תחושת כישלון ופוגע בדימוי העצמי' },
  { id: 'e5', source: 's4', target: 'i4', weight: 0.85, reasoning: 'שכחנות גורמת ישירות להחמצת תורים ופגישות' },
  { id: 'e6', source: 's4', target: 'i2', weight: 0.5, reasoning: 'שכחנות של ימי הולדת ומטלות משפחתיות יוצרת תחושת זלזול' },
  { id: 'e7', source: 'n1', target: 's1', weight: 0.7, reasoning: 'טיפול CBT מספק כלים פרקטיים להתמודדות עם דחיינות' },
  { id: 'e8', source: 'n2', target: 's2', weight: 0.8, reasoning: 'מתילפנידאט משפר ישירות את יכולת הריכוז והקשב' },
]

export const DEMO_TIMELINE: TimelineMilestone[] = [
  {
    id: 't1', date: '2025-01-15',
    title: 'Initial Assessment', titleHe: 'אבחון ראשוני',
    description: 'ביצוע אבחון מקיף לרבות ASRS, שאלוני דיווח עצמי ומבחני ביצוע',
    category: 'milestone',
    efScoresSnapshot: { activation: 3.5, focus: 2.8, effort: 4.2, emotion: 3.2, memory: 4.0, action: 5.5 },
  },
  {
    id: 't2', date: '2025-02-01',
    title: 'Started Methylphenidate', titleHe: 'התחלת מתילפנידאט',
    description: 'התחלת טיפול תרופתי — 10 מ"ג בבוקר, טיטרציה הדרגתית',
    category: 'medication',
  },
  {
    id: 't3', date: '2025-03-01',
    title: 'CBT Session Block 1', titleHe: 'CBT — בלוק ראשון',
    description: '8 מפגשים ממוקדים בארגון, ניהול זמן ואסטרטגיות התמודדות',
    category: 'therapy',
  },
  {
    id: 't4', date: '2025-04-15',
    title: 'Exercise Routine Adopted', titleHe: 'אימוץ שגרת פעילות גופנית',
    description: 'הליכה יומית של 30 דקות + אימון כוח פעמיים בשבוע',
    category: 'lifestyle',
  },
  {
    id: 't5', date: '2025-06-01',
    title: '3-Month Reassessment', titleHe: 'הערכה מחדש — 3 חודשים',
    description: 'שיפור ניכר ב-Focus וב-Activation. המשך מעקב',
    category: 'milestone',
    efScoresSnapshot: { activation: 4.2, focus: 3.1, effort: 5.0, emotion: 3.8, memory: 4.5, action: 6.2 },
  },
]

export const DEMO_ROADMAP: PatientRoadmap = {
  patientId: 'demo-patient',
  efScores: DEMO_EF_SCORES,
  network: { nodes: DEMO_NODES, edges: DEMO_EDGES },
  timeline: DEMO_TIMELINE,
  corrections: [],
  lastUpdated: new Date().toISOString(),
}
