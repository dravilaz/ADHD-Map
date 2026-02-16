/**
 * Clinical data types for ADHD Roadmap visualization
 * Based on מצגת: מפת דרכים לטיפול ב-ADHD
 */

/** The 6 executive function pillars from the Barkley model */
export interface ExecutiveFunctionScores {
  activation: number    // הפעלה — Organizing, prioritizing, getting started
  focus: number         // מיקוד — Sustaining, shifting, dividing attention
  effort: number        // מאמץ — Regulating alertness, sustaining effort, processing speed
  emotion: number       // רגש — Managing frustration and modulating emotions
  memory: number        // זיכרון — Utilizing working memory and accessing recall
  action: number        // פעולה — Monitoring and self-regulating action
}

export type ExecutiveFunctionKey = keyof ExecutiveFunctionScores

export const EF_LABELS: Record<ExecutiveFunctionKey, { en: string; he: string; description: string }> = {
  activation: { en: 'Activation', he: 'הפעלה', description: 'ארגון, תעדוף והתחלת פעולה' },
  focus:      { en: 'Focus',      he: 'מיקוד', description: 'שימור, העברת והפניית קשב' },
  effort:     { en: 'Effort',     he: 'מאמץ', description: 'ויסות עוררות, קצב עיבוד ומאמץ מתמשך' },
  emotion:    { en: 'Emotion',    he: 'רגש',  description: 'ניהול תסכול ווויסות רגשי' },
  memory:     { en: 'Memory',     he: 'זיכרון', description: 'זיכרון עבודה ושליפה' },
  action:     { en: 'Action',     he: 'פעולה', description: 'ניטור ווויסות עצמי של פעולה' },
}

/** Symptom → Impact network node */
export interface NetworkNode {
  id: string
  label: string
  labelHe: string
  type: 'symptom' | 'impact' | 'intervention'
  severity: number // 0-10
  x?: number
  y?: number
}

/** Edge connecting symptom to impact */
export interface NetworkEdge {
  id: string
  source: string
  target: string
  weight: number // 0-1 strength of connection
  reasoning: string // AI explanation for this connection
}

/** A single milestone on the road of improvement */
export interface TimelineMilestone {
  id: string
  date: string
  title: string
  titleHe: string
  description: string
  category: 'medication' | 'therapy' | 'lifestyle' | 'milestone'
  efScoresSnapshot?: Partial<ExecutiveFunctionScores>
}

/** Clinician correction to the AI-generated map */
export interface ClinicalCorrection {
  id: string
  timestamp: string
  clinicianId: string
  targetType: 'node' | 'edge' | 'score'
  targetId: string
  previousValue: string
  newValue: string
  explanation: string // Free-text reasoning for prompt-tuning
}

/** Complete patient roadmap */
export interface PatientRoadmap {
  patientId: string
  efScores: ExecutiveFunctionScores
  network: {
    nodes: NetworkNode[]
    edges: NetworkEdge[]
  }
  timeline: TimelineMilestone[]
  corrections: ClinicalCorrection[]
  lastUpdated: string
}
