import { useState, useEffect } from 'react'
import type { IntakeFormData, ASRSFrequency } from '@/types'
import { PageShell } from '@/components/ui/PageShell'
import { Card, CardTitle } from '@/components/ui/Card'

const STORAGE_KEY = 'adhd-map-intake'

const FREQ_LABELS: Record<ASRSFrequency, string> = {
  never: 'אף פעם',
  rarely: 'לעיתים רחוקות',
  sometimes: 'לפעמים',
  often: 'לעיתים קרובות',
  veryOften: 'לעיתים קרובות מאוד',
  '': '',
}

function scoreValue(freq: ASRSFrequency | ''): number {
  const map: Record<string, number> = { never: 0, rarely: 1, sometimes: 2, often: 3, veryOften: 4 }
  return map[freq] ?? 0
}

function loadFromStorage(): IntakeFormData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as IntakeFormData
  } catch {
    return null
  }
}

function hasAnyData(data: IntakeFormData): boolean {
  const p = data.personalDetails
  const hasPersonal = !!(p.firstName || p.lastName || p.phone || p.email)
  const hasFamily = !!(data.familyContext.maritalStatus || data.familyContext.spouseName)
  const hasMedical = data.medicalHistory.conditions.some((c) => c.present) || !!data.medicalHistory.currentMedications
  const hasHabits = data.habitsAndAddictions.habits.some((h) => h.frequency && h.frequency !== 'never') || !!data.habitsAndAddictions.sleepQuality
  const hasASRS = data.asrs.items.some((item) => item.response !== '')
  const hasSummary = !!data.therapistSummary.text
  return hasPersonal || hasFamily || hasMedical || hasHabits || hasASRS || hasSummary
}

export function BaselinePage() {
  const [data, setData] = useState<IntakeFormData | null>(null)

  useEffect(() => {
    setData(loadFromStorage())
  }, [])

  if (!data || !hasAnyData(data)) {
    return (
      <PageShell title="מצב פתיחה" subtitle="תמונת מצב ראשונית של המטופל">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-surface-bright p-4 mb-4">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted">
              <path d="M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-sm text-text-muted">
            אין נתונים שמורים עדיין. מלא/י את שאלון הקליטה כדי לראות את מצב הפתיחה.
          </p>
        </div>
      </PageShell>
    )
  }

  const p = data.personalDetails
  const f = data.familyContext
  const m = data.medicalHistory
  const h = data.habitsAndAddictions
  const a = data.asrs
  const ts = data.therapistSummary

  const genderMap: Record<string, string> = { male: 'זכר', female: 'נקבה', other: 'אחר' }
  const maritalMap: Record<string, string> = { single: 'רווק/ה', married: 'נשוי/אה', divorced: 'גרוש/ה', widowed: 'אלמן/ה' }

  const activeConditions = m.conditions.filter((c) => c.present)
  const asrsAnswered = a.items.filter((item) => item.response !== '')
  const asrsPartA = a.items.filter((item) => item.part === 'A' && item.response !== '')
  const asrsPartB = a.items.filter((item) => item.part === 'B' && item.response !== '')
  const asrsPartAScore = asrsPartA.reduce((sum, item) => sum + scoreValue(item.response), 0)
  const asrsPartBScore = asrsPartB.reduce((sum, item) => sum + scoreValue(item.response), 0)
  const asrsTotalScore = asrsAnswered.reduce((sum, item) => sum + scoreValue(item.response), 0)

  const hasPersonal = !!(p.firstName || p.lastName)
  const hasASRS = asrsAnswered.length > 0
  const hasSummary = !!ts.text

  return (
    <PageShell title="מצב פתיחה" subtitle="תמונת מצב ראשונית של המטופל">
      <div className="flex flex-col gap-4">

        {/* Patient header */}
        {hasPersonal && (
          <Card className="bg-clinical-50 border-clinical-200">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-clinical-600 text-white text-lg font-bold">
                {p.firstName.charAt(0)}{p.lastName.charAt(0)}
              </div>
              <div>
                <h2 className="text-base font-bold text-clinical-800">
                  {p.firstName} {p.lastName}
                </h2>
                {p.dateOfBirth && (
                  <p className="text-xs text-clinical-600">
                    תאריך לידה: {p.dateOfBirth}
                  </p>
                )}
                {p.phone && (
                  <p className="text-xs text-clinical-600" dir="ltr">
                    {p.phone}
                  </p>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Demographic info */}
        {(p.occupation || p.city || f.maritalStatus) && (
          <Card>
            <CardTitle className="text-base">פרטים דמוגרפיים</CardTitle>
            <dl className="mt-2 flex flex-col gap-1.5">
              {p.gender && (
                <DataRow label="מגדר" value={genderMap[p.gender] ?? ''} />
              )}
              {f.maritalStatus && (
                <DataRow label="מצב משפחתי" value={maritalMap[f.maritalStatus] ?? ''} />
              )}
              {f.numberOfChildren != null && (
                <DataRow label="ילדים" value={f.numberOfChildren.toString()} />
              )}
              {p.occupation && <DataRow label="מקצוע" value={p.occupation} />}
              {p.city && <DataRow label="עיר" value={p.city} />}
              {p.referralSource && <DataRow label="מקור הפנייה" value={p.referralSource} />}
            </dl>
          </Card>
        )}

        {/* Medical */}
        {(activeConditions.length > 0 || m.currentMedications || m.previousDiagnoses) && (
          <Card>
            <CardTitle className="text-base">רקע רפואי</CardTitle>
            {activeConditions.length > 0 && (
              <ul className="mt-2 flex flex-col gap-1">
                {activeConditions.map((c) => (
                  <li key={c.id} className="text-sm text-text-primary">
                    <span className="font-medium">{c.labelHe}</span>
                    {c.details && <span className="text-text-muted"> — {c.details}</span>}
                  </li>
                ))}
              </ul>
            )}
            {m.currentMedications && (
              <p className="mt-2 text-sm">
                <span className="text-text-muted">תרופות נוכחיות:</span> {m.currentMedications}
              </p>
            )}
            {m.previousDiagnoses && (
              <p className="mt-1 text-sm">
                <span className="text-text-muted">אבחנות קודמות:</span> {m.previousDiagnoses}
              </p>
            )}
          </Card>
        )}

        {/* Habits summary */}
        {(h.sleepQuality || h.habits.some((habit) => habit.frequency && habit.frequency !== 'never')) && (
          <Card>
            <CardTitle className="text-base">אורח חיים</CardTitle>
            <dl className="mt-2 flex flex-col gap-1.5">
              {h.sleepQuality && (
                <DataRow
                  label="שינה"
                  value={`${h.sleepQuality === 'good' ? 'טובה' : h.sleepQuality === 'fair' ? 'סבירה' : 'לקויה'}${h.averageSleepHours ? ` (${h.averageSleepHours} שעות)` : ''}`}
                />
              )}
              {h.exerciseFrequency && (
                <DataRow label="פעילות גופנית" value={h.exerciseFrequency} />
              )}
              {h.habits
                .filter((habit) => habit.frequency && habit.frequency !== 'never')
                .map((habit) => (
                  <DataRow key={habit.id} label={habit.labelHe} value={habit.frequency} />
                ))}
            </dl>
          </Card>
        )}

        {/* ASRS Results */}
        {hasASRS && (
          <Card>
            <CardTitle className="text-base">תוצאות ASRS</CardTitle>
            <div className="mt-3 flex flex-col gap-3">
              {/* Score overview */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-clinical-50 p-2.5">
                  <p className="text-lg font-bold text-clinical-700">{asrsPartAScore}</p>
                  <p className="text-[10px] text-clinical-600">חלק א׳ ({asrsPartA.length * 4} מקס׳)</p>
                </div>
                <div className="rounded-xl bg-clinical-50 p-2.5">
                  <p className="text-lg font-bold text-clinical-700">{asrsPartBScore}</p>
                  <p className="text-[10px] text-clinical-600">חלק ב׳ ({asrsPartB.length * 4} מקס׳)</p>
                </div>
                <div className="rounded-xl bg-clinical-100 p-2.5">
                  <p className="text-lg font-bold text-clinical-800">{asrsTotalScore}</p>
                  <p className="text-[10px] text-clinical-700">סה״כ ({asrsAnswered.length * 4} מקס׳)</p>
                </div>
              </div>

              {/* Individual answers */}
              <details className="group">
                <summary className="cursor-pointer text-sm text-clinical-600 hover:text-clinical-800">
                  הצג/י פירוט תשובות
                </summary>
                <div className="mt-2 flex flex-col gap-2">
                  {asrsAnswered.map((item) => (
                    <div key={item.id} className="flex justify-between gap-2 text-xs border-b border-border pb-1.5">
                      <span className="text-text-secondary leading-relaxed">{item.questionHe}</span>
                      <span className="whitespace-nowrap font-medium text-clinical-700">
                        {FREQ_LABELS[item.response]}
                      </span>
                    </div>
                  ))}
                </div>
              </details>

              {a.completedAt && (
                <p className="text-xs text-text-muted">
                  הושלם: {new Date(a.completedAt).toLocaleDateString('he-IL')}
                </p>
              )}
            </div>
          </Card>
        )}

        {/* Therapist Summary */}
        {hasSummary && (
          <Card className="border-action-200 bg-action-50">
            <CardTitle className="text-base">סיכום מטפל</CardTitle>
            <div className="mt-2 flex flex-col gap-2">
              {ts.therapistName && (
                <p className="text-sm">
                  <span className="text-text-muted">מטפל/ת:</span>{' '}
                  <span className="font-medium">{ts.therapistName}</span>
                </p>
              )}
              <p className="text-sm text-text-primary whitespace-pre-wrap leading-relaxed">
                {ts.text}
              </p>
              {ts.writtenAt && (
                <p className="text-xs text-text-muted">
                  נכתב: {new Date(ts.writtenAt).toLocaleDateString('he-IL')}
                </p>
              )}
            </div>
          </Card>
        )}

        {/* Family ADHD history */}
        {f.familyADHDHistory && (
          <Card>
            <CardTitle className="text-base">היסטוריית ADHD משפחתית</CardTitle>
            <p className="mt-2 text-sm text-text-primary whitespace-pre-wrap leading-relaxed">
              {f.familyADHDHistory}
            </p>
          </Card>
        )}

        {/* Timestamp */}
        {data.completedAt && (
          <p className="text-center text-xs text-text-muted py-2">
            שאלון הושלם: {new Date(data.completedAt).toLocaleDateString('he-IL')}
          </p>
        )}
      </div>
    </PageShell>
  )
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 text-sm">
      <dt className="text-text-muted min-w-[100px]">{label}:</dt>
      <dd className="text-text-primary">{value}</dd>
    </div>
  )
}
