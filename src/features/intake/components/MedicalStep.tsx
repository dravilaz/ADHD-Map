import type { MedicalHistory, MedicalCondition } from '@/types'
import { FormField, Input, TextArea, Select } from '@/components/ui/FormField'

interface MedicalStepProps {
  data: MedicalHistory
  onChange: (data: MedicalHistory) => void
}

export function MedicalStep({ data, onChange }: MedicalStepProps) {
  const updateCondition = (index: number, field: keyof MedicalCondition, value: string | boolean | null) => {
    const updated = data.conditions.map((c, i) =>
      i === index ? { ...c, [field]: value } : c
    )
    onChange({ ...data, conditions: updated })
  }

  const updateField = (field: keyof MedicalHistory, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-text-secondary leading-relaxed">
        מידע רפואי נדרש לצורך בניית תוכנית טיפול בטוחה ומותאמת. אנא ענה/י בכנות — אין תשובות &quot;נכונות&quot; או &quot;לא נכונות&quot;.
      </p>

      {/* Medical conditions checklist */}
      <div className="flex flex-col gap-3">
        <h4 className="text-sm font-medium text-text-secondary">מצבים רפואיים</h4>
        {data.conditions.map((condition, i) => (
          <div key={condition.id} className="flex flex-col gap-1.5 rounded-xl border border-border p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium">{condition.labelHe}</span>
              <Select
                value={condition.present === null ? '' : condition.present ? 'yes' : 'no'}
                onChange={(e) =>
                  updateCondition(
                    i,
                    'present',
                    e.target.value === '' ? null : e.target.value === 'yes'
                  )
                }
                className="!w-24 !py-1.5 text-xs"
              >
                <option value="">—</option>
                <option value="yes">כן</option>
                <option value="no">לא</option>
              </Select>
            </div>
            {condition.present && (
              <Input
                value={condition.details}
                onChange={(e) => updateCondition(i, 'details', e.target.value)}
                placeholder="פרט/י..."
                className="text-xs"
              />
            )}
          </div>
        ))}
      </div>

      <FormField label="תרופות נוכחיות" hint="כולל ויטמינים ותוספי מזון">
        <TextArea
          value={data.currentMedications}
          onChange={(e) => updateField('currentMedications', e.target.value)}
          placeholder="שם התרופה, מינון ותדירות..."
        />
      </FormField>

      <FormField label="תרופות בעבר" hint="תרופות שנלקחו בעבר לטיפול ב-ADHD או מצבים קשורים">
        <TextArea
          value={data.pastMedications}
          onChange={(e) => updateField('pastMedications', e.target.value)}
          placeholder="תרופות שנוסו בעבר..."
        />
      </FormField>

      <FormField label="אלרגיות">
        <Input
          value={data.allergies}
          onChange={(e) => updateField('allergies', e.target.value)}
          placeholder="אלרגיות ידועות..."
        />
      </FormField>

      <FormField label="אבחנות קודמות" hint="כולל ליקויי למידה, חרדה, דיכאון וכו׳">
        <TextArea
          value={data.previousDiagnoses}
          onChange={(e) => updateField('previousDiagnoses', e.target.value)}
          placeholder="אבחנות קודמות..."
        />
      </FormField>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="שם מטפל/ת נוכחי/ת">
          <Input
            value={data.currentTherapist}
            onChange={(e) => updateField('currentTherapist', e.target.value)}
            placeholder="שם המטפל/ת"
          />
        </FormField>
        <FormField label="שם פסיכיאטר/ית">
          <Input
            value={data.psychiatristName}
            onChange={(e) => updateField('psychiatristName', e.target.value)}
            placeholder="שם הפסיכיאטר/ית"
          />
        </FormField>
      </div>

      <FormField label="הערות רפואיות נוספות">
        <TextArea
          value={data.additionalNotes}
          onChange={(e) => updateField('additionalNotes', e.target.value)}
          placeholder="מידע רפואי נוסף שחשוב לך לשתף..."
        />
      </FormField>
    </div>
  )
}
