import type { HabitsAndAddictions, HabitEntry } from '@/types'
import { FormField, Input, Select, TextArea } from '@/components/ui/FormField'

interface HabitsStepProps {
  data: HabitsAndAddictions
  onChange: (data: HabitsAndAddictions) => void
}

const FREQUENCY_OPTIONS = [
  { value: '', labelHe: 'בחר/י' },
  { value: 'never', labelHe: 'אף פעם' },
  { value: 'rarely', labelHe: 'לעיתים רחוקות' },
  { value: 'sometimes', labelHe: 'לפעמים' },
  { value: 'often', labelHe: 'לעיתים קרובות' },
  { value: 'daily', labelHe: 'יומיומי' },
]

export function HabitsStep({ data, onChange }: HabitsStepProps) {
  const updateHabit = (index: number, field: keyof HabitEntry, value: string) => {
    const updated = data.habits.map((h, i) =>
      i === index ? { ...h, [field]: value } : h
    )
    onChange({ ...data, habits: updated })
  }

  const updateField = <K extends keyof HabitsAndAddictions>(field: K, value: HabitsAndAddictions[K]) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-text-secondary leading-relaxed">
        הרגלי יומיום משפיעים ישירות על תסמיני ADHD. מידע זה יעזור לנו להבין את התמונה המלאה — ללא שיפוט.
      </p>

      {/* Habits/Addictions */}
      <div className="flex flex-col gap-3">
        <h4 className="text-sm font-medium text-text-secondary">הרגלים וחומרים</h4>
        {data.habits.map((habit, i) => (
          <div key={habit.id} className="flex flex-col gap-1.5 rounded-xl border border-border p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium">{habit.labelHe}</span>
              <Select
                value={habit.frequency}
                onChange={(e) => updateHabit(i, 'frequency', e.target.value)}
                className="!w-32 !py-1.5 text-xs"
              >
                {FREQUENCY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.labelHe}
                  </option>
                ))}
              </Select>
            </div>
            {habit.frequency && habit.frequency !== 'never' && (
              <Input
                value={habit.details}
                onChange={(e) => updateHabit(i, 'details', e.target.value)}
                placeholder="פרטים נוספים..."
                className="text-xs"
              />
            )}
          </div>
        ))}
      </div>

      {/* Sleep */}
      <div className="grid grid-cols-2 gap-3">
        <FormField label="איכות שינה">
          <Select
            value={data.sleepQuality}
            onChange={(e) =>
              updateField('sleepQuality', e.target.value as HabitsAndAddictions['sleepQuality'])
            }
          >
            <option value="">בחר/י</option>
            <option value="good">טובה</option>
            <option value="fair">סבירה</option>
            <option value="poor">לקויה</option>
          </Select>
        </FormField>

        <FormField label="שעות שינה ממוצעות">
          <Input
            type="number"
            min={0}
            max={24}
            step={0.5}
            value={data.averageSleepHours ?? ''}
            onChange={(e) =>
              updateField('averageSleepHours', e.target.value ? parseFloat(e.target.value) : null)
            }
            inputMode="decimal"
          />
        </FormField>
      </div>

      {/* Exercise */}
      <FormField label="תדירות פעילות גופנית">
        <Select
          value={data.exerciseFrequency}
          onChange={(e) =>
            updateField('exerciseFrequency', e.target.value as HabitsAndAddictions['exerciseFrequency'])
          }
        >
          <option value="">בחר/י</option>
          <option value="never">לא מתאמן/ת</option>
          <option value="rarely">לעיתים רחוקות</option>
          <option value="weekly">כמה פעמים בשבוע</option>
          <option value="daily">כמעט כל יום</option>
        </Select>
      </FormField>

      {/* Screen time */}
      <FormField label="שעות מסך יומיות (משוערות)" hint="לא כולל שעות עבודה">
        <Input
          type="number"
          min={0}
          max={24}
          step={0.5}
          value={data.screenTimeHours ?? ''}
          onChange={(e) =>
            updateField('screenTimeHours', e.target.value ? parseFloat(e.target.value) : null)
          }
          inputMode="decimal"
        />
      </FormField>

      <FormField label="הערות נוספות">
        <TextArea
          value={data.additionalNotes}
          onChange={(e) => updateField('additionalNotes', e.target.value)}
          placeholder="כל מידע נוסף על אורח חיים שנראה לך רלוונטי..."
        />
      </FormField>
    </div>
  )
}
