import type { IntakeFormData } from '@/types'
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

export function ReviewStep({ data }: ReviewStepProps) {
  const genderMap: Record<string, string> = { male: 'זכר', female: 'נקבה', other: 'אחר' }
  const maritalMap: Record<string, string> = { single: 'רווק/ה', married: 'נשוי/אה', divorced: 'גרוש/ה', widowed: 'אלמן/ה' }

  const p = data.personalDetails
  const f = data.familyContext
  const m = data.medicalHistory
  const h = data.habitsAndAddictions

  const activeConditions = m.conditions.filter((c) => c.present)

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
    </div>
  )
}
