import { useState } from 'react'
import type { ClinicalCorrection, NetworkNode, NetworkEdge } from '@/types'
import { Card, CardTitle } from '@/components/ui/Card'
import { FormField, Select, TextArea, Input } from '@/components/ui/FormField'
import { Button } from '@/components/ui/Button'
import { PenLine, Save } from 'lucide-react'

interface CorrectionPanelProps {
  nodes: NetworkNode[]
  edges: NetworkEdge[]
  onSubmitCorrection: (correction: ClinicalCorrection) => void
}

export function CorrectionPanel({ nodes, edges, onSubmitCorrection }: CorrectionPanelProps) {
  const [targetType, setTargetType] = useState<'node' | 'edge' | 'score'>('node')
  const [targetId, setTargetId] = useState('')
  const [newValue, setNewValue] = useState('')
  const [explanation, setExplanation] = useState('')

  const targets = targetType === 'node'
    ? nodes.map((n) => ({ id: n.id, label: n.labelHe }))
    : targetType === 'edge'
    ? edges.map((e) => {
        const src = nodes.find((n) => n.id === e.source)
        const tgt = nodes.find((n) => n.id === e.target)
        return { id: e.id, label: `${src?.labelHe ?? e.source} ← ${tgt?.labelHe ?? e.target}` }
      })
    : [
        { id: 'activation', label: 'הפעלה' },
        { id: 'focus', label: 'מיקוד' },
        { id: 'effort', label: 'מאמץ' },
        { id: 'emotion', label: 'רגש' },
        { id: 'memory', label: 'זיכרון' },
        { id: 'action', label: 'פעולה' },
      ]

  const handleSubmit = () => {
    if (!targetId || !explanation.trim()) return

    const target =
      targetType === 'node'
        ? nodes.find((n) => n.id === targetId)
        : targetType === 'edge'
        ? edges.find((e) => e.id === targetId)
        : null

    const correction: ClinicalCorrection = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      clinicianId: 'current-clinician', // replaced with auth context
      targetType,
      targetId,
      previousValue: target ? JSON.stringify(target) : '',
      newValue,
      explanation,
    }

    onSubmitCorrection(correction)
    setTargetId('')
    setNewValue('')
    setExplanation('')
  }

  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <PenLine size={18} className="text-action-600" />
        <CardTitle>תיקון המפה</CardTitle>
      </div>

      <p className="text-xs text-text-muted mb-4">
        בחר/י את הרכיב שברצונך לתקן, ציין/י את הערך החדש, והסבר/י את הסיבה. ההסבר ישמש ללמידה מתמשכת של המערכת.
      </p>

      <div className="flex flex-col gap-3">
        <FormField label="סוג הרכיב">
          <Select
            value={targetType}
            onChange={(e) => {
              setTargetType(e.target.value as 'node' | 'edge' | 'score')
              setTargetId('')
            }}
          >
            <option value="node">צומת (תסמין / השפעה)</option>
            <option value="edge">קשר</option>
            <option value="score">ציון תפקוד ניהולי</option>
          </Select>
        </FormField>

        <FormField label="רכיב ספציפי">
          <Select value={targetId} onChange={(e) => setTargetId(e.target.value)}>
            <option value="">בחר/י רכיב</option>
            {targets.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label="ערך חדש" hint="ניקוד, תיאור, או שם מעודכן">
          <Input
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="הערך המתוקן..."
          />
        </FormField>

        <FormField label="הסבר לתיקון (ללמידה)" required hint="ההסבר ישמש ללימוד וכיוונון הנחיות — היה/הייה ספציפי/ת">
          <TextArea
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="למה ביצעת את התיקון הזה? מה המערכת פספסה?"
            className="min-h-[100px]"
          />
        </FormField>

        <Button
          onClick={handleSubmit}
          disabled={!targetId || !explanation.trim()}
          fullWidth
        >
          <Save size={16} />
          שמור תיקון
        </Button>
      </div>
    </Card>
  )
}
