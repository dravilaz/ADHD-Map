import type { ClinicalCorrection } from '@/types'
import { Card } from '@/components/ui/Card'
import { History } from 'lucide-react'

interface CorrectionHistoryProps {
  corrections: ClinicalCorrection[]
}

const TARGET_TYPE_LABELS: Record<string, string> = {
  node: 'צומת',
  edge: 'קשר',
  score: 'ציון',
}

export function CorrectionHistory({ corrections }: CorrectionHistoryProps) {
  if (corrections.length === 0) {
    return (
      <div className="text-center py-8 text-text-muted">
        <History size={32} className="mx-auto mb-2 opacity-50" />
        <p className="text-sm">טרם בוצעו תיקונים. התיקונים יוצגו כאן כהיסטוריה.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-text-secondary flex items-center gap-2">
        <History size={16} />
        היסטוריית תיקונים ({corrections.length})
      </h3>
      {corrections.map((c) => (
        <Card key={c.id} className="text-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-text-primary">
              {TARGET_TYPE_LABELS[c.targetType] ?? c.targetType}: {c.targetId}
            </span>
            <time className="text-text-muted" dir="ltr">
              {new Date(c.timestamp).toLocaleDateString('he-IL')}
            </time>
          </div>
          {c.newValue && (
            <p className="text-text-secondary mb-1">ערך חדש: {c.newValue}</p>
          )}
          <p className="text-text-secondary bg-surface-bright rounded-lg p-2 mt-1 leading-relaxed">
            {c.explanation}
          </p>
        </Card>
      ))}
    </div>
  )
}
