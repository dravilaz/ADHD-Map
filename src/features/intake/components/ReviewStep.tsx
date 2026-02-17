import type { IntakeFormData, ASRSFrequency } from '@/types'
import { Card, CardTitle } from '@/components/ui/Card'

interface ReviewStepProps {
  data: IntakeFormData
}

function SectionSummary({ title, items }: { title: string; items: [string, string][] }) {
  const filled = items.filter(([, v]) => v && v.trim())
  return (
    <Card>
      <CardTitle className="text-base">{title}</CardTitle>
      {filled.length === 0 ? (
        <p className="text-sm text-text-muted">לא מולאו פרטים</p>
      ) : (
        <dl className="mt-2 flex flex-col gap-1.5">
          {filled.map(([label, value]) => (
            <div key={label} className="flex gap-2 text-sm">
              <dt className="text-text-muted min-w-[100px]">{label}:</dt>
              <dd className="text-text-primary">{value}</dd>
            </div>
          ))}
        </dl>
      )}
    </Card>
  )
}

function scoreValue(freq: ASRSFrequency | ''): number {
  const map: Record<string, number> = { never: 0, rarely: 1, sometimes: 2, often: 3, veryOften: 4 }
  return map[freq] ?? 0
}

export function ReviewStep({ data }: ReviewStepProps) {
  const genderMap: Record<string, string> = { male: 'זכר', female: 'נקבה', other: 'אחר' }
  const maritalMap: Record<string, string> = { single: 'רווק/ה', married: 'נשוי/אה', divorced: 'גרוש/ה', widowed: 'אלמן/ה' }

  const p = data.personalDetails
  const f = data.familyContext
  const m = data.medicalHistory
  const h = data.habitsAndAddictions
  const a = data.asrs
  const ts = data.therapistSummary

  const activeConditions = m.conditions.filter((c) => c.present)

  const asrsAnswered = a.items.filter((item) => item.response !== '')
  const asrsPartA = a.items.filter((item) => item.part === 'A' && item.response !== '')
  const asrsPartAScore = asrsPartA.reduce((sum, item) => sum + scoreValue(item.response), 0)
  const asrsTotalScore = asrsAnswered.reduce((sum, item) => sum + scoreValue(item.response), 0)

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-text-secondary leading-relaxed">
        אנא עיין/י בפרטים שמילאת. ניתן לחזור לכל שלב ולערוך. לאחר אישור, הנתונים ישמרו במערכת.
      </p>

      <SectionSummary
        title="פרטים אישיים"
        items={[
          ['שם מלא', `${p.firstName} ${p.lastName}`.trim()],
          ['ת.ז.', p.idNumber],
          ['תאריך לידה', p.dateOfBirth],
          ['מגדר', genderMap[p.gender] ?? ''],
          ['טלפון', p.phone],
          ['דוא״ל', p.email],
          ['כתובת', [p.address, p.city].filter(Boolean).join(', ')],
          ['מקצוע', p.occupation],
          ['מקור הפנייה', p.referralSource],
        ]}
      />

      <SectionSummary
        title="הקשר משפחתי"
        items={[
          ['מצב משפחתי', maritalMap[f.maritalStatus] ?? ''],
          ['בן/בת זוג', f.spouseName],
          ['מספר ילדים', f.numberOfChildren?.toString() ?? ''],
          ['היסטוריית ADHD', f.familyADHDHistory],
        ]}
      />

      <Card>
        <CardTitle className="text-base">היסטוריה רפואית</CardTitle>
        {activeConditions.length > 0 ? (
          <ul className="mt-2 flex flex-col gap-1">
            {activeConditions.map((c) => (
              <li key={c.id} className="text-sm text-text-primary">
                <span className="font-medium">{c.labelHe}</span>
                {c.details && <span className="text-text-muted"> — {c.details}</span>}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-text-muted">לא דווחו מצבים רפואיים</p>
        )}
        {m.currentMedications && (
          <p className="mt-2 text-sm"><span className="text-text-muted">תרופות נוכחיות:</span> {m.currentMedications}</p>
        )}
      </Card>

      <SectionSummary
        title="הרגלים ואורח חיים"
        items={[
          ['שינה', h.sleepQuality ? `${h.sleepQuality} (${h.averageSleepHours ?? '?'} שעות)` : ''],
          ['פעילות גופנית', h.exerciseFrequency ?? ''],
          ['שעות מסך', h.screenTimeHours?.toString() ?? ''],
          ...h.habits
            .filter((habit) => habit.frequency && habit.frequency !== 'never')
            .map((habit) => [habit.labelHe, habit.frequency] as [string, string]),
        ]}
      />

      {/* ASRS Summary */}
      <Card>
        <CardTitle className="text-base">שאלון ASRS</CardTitle>
        {asrsAnswered.length === 0 ? (
          <p className="mt-2 text-sm text-text-muted">לא מולא שאלון ASRS</p>
        ) : (
          <div className="mt-2 flex flex-col gap-2">
            <div className="flex gap-4 text-sm">
              <span className="text-text-muted">שאלות שנענו:</span>
              <span className="font-medium">{asrsAnswered.length}/{a.items.length}</span>
            </div>
            {asrsPartA.length > 0 && (
              <div className="flex gap-4 text-sm">
                <span className="text-text-muted">ציון חלק א׳:</span>
                <span className="font-medium">{asrsPartAScore}/{asrsPartA.length * 4}</span>
              </div>
            )}
            <div className="flex gap-4 text-sm">
              <span className="text-text-muted">ציון כולל:</span>
              <span className="font-medium">{asrsTotalScore}/{asrsAnswered.length * 4}</span>
            </div>
          </div>
        )}
      </Card>

      {/* Therapist Summary */}
      <Card>
        <CardTitle className="text-base">סיכום מטפל</CardTitle>
        {ts.text ? (
          <div className="mt-2 flex flex-col gap-2">
            {ts.therapistName && (
              <p className="text-sm">
                <span className="text-text-muted">מטפל/ת:</span>{' '}
                <span className="font-medium">{ts.therapistName}</span>
              </p>
            )}
            <p className="text-sm text-text-primary whitespace-pre-wrap leading-relaxed">{ts.text}</p>
            {ts.writtenAt && (
              <p className="text-xs text-text-muted">
                נכתב: {new Date(ts.writtenAt).toLocaleDateString('he-IL')}
              </p>
            )}
          </div>
        ) : (
          <p className="mt-2 text-sm text-text-muted">לא נכתב סיכום מטפל</p>
        )}
      </Card>
    </div>
  )
}
