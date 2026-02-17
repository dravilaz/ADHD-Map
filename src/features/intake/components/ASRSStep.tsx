import type { ASRSData, ASRSItem, ASRSFrequency } from '@/types'

interface ASRSStepProps {
  data: ASRSData
  onChange: (data: ASRSData) => void
}

const FREQUENCY_OPTIONS: { value: ASRSFrequency | ''; labelHe: string }[] = [
  { value: '', labelHe: 'בחר/י' },
  { value: 'never', labelHe: 'אף פעם' },
  { value: 'rarely', labelHe: 'לעיתים רחוקות' },
  { value: 'sometimes', labelHe: 'לפעמים' },
  { value: 'often', labelHe: 'לעיתים קרובות' },
  { value: 'veryOften', labelHe: 'לעיתים קרובות מאוד' },
]

function scoreValue(freq: ASRSFrequency | ''): number {
  const map: Record<string, number> = { never: 0, rarely: 1, sometimes: 2, often: 3, veryOften: 4 }
  return map[freq] ?? 0
}

export function ASRSStep({ data, onChange }: ASRSStepProps) {
  const updateItem = (index: number, response: ASRSFrequency) => {
    const updated = data.items.map((item, i) =>
      i === index ? { ...item, response } : item
    )
    const allAnswered = updated.every((item) => item.response !== '')
    onChange({
      ...data,
      items: updated,
      completedAt: allAnswered ? new Date().toISOString() : null,
    })
  }

  const partA = data.items.filter((item) => item.part === 'A')
  const partB = data.items.filter((item) => item.part === 'B')

  const partAAnswered = partA.filter((item) => item.response !== '')
  const partAScore = partAAnswered.reduce((sum, item) => sum + scoreValue(item.response), 0)

  const allAnswered = data.items.filter((item) => item.response !== '')
  const totalScore = allAnswered.reduce((sum, item) => sum + scoreValue(item.response), 0)

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-text-secondary leading-relaxed">
        שאלון ASRS (Adult ADHD Self-Report Scale) הוא כלי סקירה מוכר לאבחון ADHD במבוגרים.
        יש לענות על כל שאלה לפי התדירות שבה חווית את התופעה ב-6 החודשים האחרונים.
      </p>

      {/* Part A */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-clinical-700">חלק א׳ — שאלות סקירה</h4>
          {partAAnswered.length > 0 && (
            <span className="text-xs text-text-muted">
              ציון: {partAScore}/{partAAnswered.length * 4}
            </span>
          )}
        </div>
        {partA.map((item) => {
          const globalIndex = data.items.findIndex((i) => i.id === item.id)
          return (
            <QuestionRow
              key={item.id}
              item={item}
              onChange={(resp) => updateItem(globalIndex, resp)}
            />
          )
        })}
      </div>

      {/* Part B */}
      <div className="flex flex-col gap-3">
        <h4 className="text-sm font-semibold text-clinical-700">חלק ב׳ — שאלות נוספות</h4>
        {partB.map((item) => {
          const globalIndex = data.items.findIndex((i) => i.id === item.id)
          return (
            <QuestionRow
              key={item.id}
              item={item}
              onChange={(resp) => updateItem(globalIndex, resp)}
            />
          )
        })}
      </div>

      {/* Score summary */}
      {allAnswered.length > 0 && (
        <div className="rounded-xl border border-clinical-200 bg-clinical-50 p-3 text-center">
          <p className="text-sm text-clinical-800">
            נענו {allAnswered.length} מתוך {data.items.length} שאלות
            {' — '}
            ציון כולל: <span className="font-bold">{totalScore}</span>/{allAnswered.length * 4}
          </p>
        </div>
      )}
    </div>
  )
}

function QuestionRow({
  item,
  onChange,
}: {
  item: ASRSItem
  onChange: (response: ASRSFrequency) => void
}) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-border p-3">
      <p className="text-sm leading-relaxed text-text-primary">{item.questionHe}</p>
      <div className="flex flex-wrap gap-1.5">
        {FREQUENCY_OPTIONS.filter((o) => o.value !== '').map((opt) => {
          const isSelected = item.response === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value as ASRSFrequency)}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                isSelected
                  ? 'bg-clinical-600 text-white'
                  : 'bg-surface-bright text-text-secondary hover:bg-clinical-100'
              }`}
            >
              {opt.labelHe}
            </button>
          )
        })}
      </div>
    </div>
  )
}
