import type { TherapistSummary } from '@/types'
import { FormField, Input, TextArea } from '@/components/ui/FormField'

interface TherapistSummaryStepProps {
  data: TherapistSummary
  onChange: (data: TherapistSummary) => void
}

export function TherapistSummaryStep({ data, onChange }: TherapistSummaryStepProps) {
  const updateField = <K extends keyof TherapistSummary>(field: K, value: TherapistSummary[K]) => {
    const updated = { ...data, [field]: value }
    // Auto-set writtenAt when text is first entered
    if (field === 'text' && value && !data.writtenAt) {
      updated.writtenAt = new Date().toISOString()
    }
    onChange(updated)
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-text-secondary leading-relaxed">
        סיכום קליני של המטפל — התרשמות ראשונית, תצפיות, ונקודות מרכזיות מהפגישה הראשונה.
        סיכום זה ישמר כחלק ממצב הפתיחה של המטופל.
      </p>

      <FormField label="שם המטפל/ת">
        <Input
          value={data.therapistName}
          onChange={(e) => updateField('therapistName', e.target.value)}
          placeholder="ד״ר / מר / גב׳..."
        />
      </FormField>

      <FormField
        label="סיכום קליני"
        hint="תאר/י את התרשמותך הראשונית, תצפיות מרכזיות, ונקודות שעלו בפגישה"
      >
        <TextArea
          value={data.text}
          onChange={(e) => updateField('text', e.target.value)}
          placeholder="התרשמות ראשונית מהמטופל, תצפיות קליניות, נושאים מרכזיים שעלו..."
          className="!min-h-[200px]"
        />
      </FormField>

      {data.writtenAt && (
        <p className="text-xs text-text-muted text-start">
          נכתב: {new Date(data.writtenAt).toLocaleDateString('he-IL')}
        </p>
      )}
    </div>
  )
}
