import { useState } from 'react'
import type { FamilyContext, FamilyMember } from '@/types'
import { FormField, Input, Select, TextArea } from '@/components/ui/FormField'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Plus, X } from 'lucide-react'

interface FamilyStepProps {
  data: FamilyContext
  onChange: (data: FamilyContext) => void
}

const EMPTY_CHILD: FamilyMember = { name: '', relation: 'child', age: null, hasADHD: null, notes: '' }

export function FamilyStep({ data, onChange }: FamilyStepProps) {
  const [showAddChild, setShowAddChild] = useState(false)

  const update = <K extends keyof FamilyContext>(field: K, value: FamilyContext[K]) => {
    onChange({ ...data, [field]: value })
  }

  const addChild = () => {
    update('children', [...data.children, { ...EMPTY_CHILD }])
    setShowAddChild(false)
  }

  const removeChild = (index: number) => {
    update('children', data.children.filter((_, i) => i !== index))
  }

  const updateChild = (index: number, field: keyof FamilyMember, value: string | number | boolean | null) => {
    const updated = data.children.map((child, i) =>
      i === index ? { ...child, [field]: value } : child
    )
    update('children', updated)
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-text-secondary leading-relaxed">
        ההקשר המשפחתי חשוב להבנת ההשפעה של ADHD על חיי היומיום. כל מידע שתשתף/י יטופל ברגישות מלאה.
      </p>

      <FormField label="מצב משפחתי">
        <Select
          value={data.maritalStatus}
          onChange={(e) => update('maritalStatus', e.target.value as FamilyContext['maritalStatus'])}
        >
          <option value="">בחר/י</option>
          <option value="single">רווק/ה</option>
          <option value="married">נשוי/אה</option>
          <option value="divorced">גרוש/ה</option>
          <option value="widowed">אלמן/ה</option>
        </Select>
      </FormField>

      {data.maritalStatus === 'married' && (
        <div className="grid grid-cols-2 gap-3">
          <FormField label="שם בן/בת הזוג">
            <Input
              value={data.spouseName}
              onChange={(e) => update('spouseName', e.target.value)}
              placeholder="שם"
            />
          </FormField>
          <FormField label="טלפון בן/בת הזוג">
            <Input
              type="tel"
              value={data.spousePhone}
              onChange={(e) => update('spousePhone', e.target.value)}
              placeholder="050-0000000"
              dir="ltr"
            />
          </FormField>
        </div>
      )}

      <FormField label="מספר ילדים">
        <Input
          type="number"
          min={0}
          max={20}
          value={data.numberOfChildren ?? ''}
          onChange={(e) => update('numberOfChildren', e.target.value ? parseInt(e.target.value) : null)}
          inputMode="numeric"
        />
      </FormField>

      {/* Children list */}
      {data.children.length > 0 && (
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-medium text-text-secondary">פרטי ילדים</h4>
          {data.children.map((child, i) => (
            <Card key={i} className="relative">
              <button
                type="button"
                onClick={() => removeChild(i)}
                className="absolute top-2 left-2 p-1 text-text-muted hover:text-alert-500 transition-colors"
              >
                <X size={16} />
              </button>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="שם">
                  <Input
                    value={child.name}
                    onChange={(e) => updateChild(i, 'name', e.target.value)}
                    placeholder="שם הילד/ה"
                  />
                </FormField>
                <FormField label="גיל">
                  <Input
                    type="number"
                    min={0}
                    max={50}
                    value={child.age ?? ''}
                    onChange={(e) => updateChild(i, 'age', e.target.value ? parseInt(e.target.value) : null)}
                    inputMode="numeric"
                  />
                </FormField>
              </div>
              <div className="mt-2">
                <FormField label="אבחון ADHD?">
                  <Select
                    value={child.hasADHD === null ? '' : child.hasADHD ? 'yes' : 'no'}
                    onChange={(e) =>
                      updateChild(i, 'hasADHD', e.target.value === '' ? null : e.target.value === 'yes')
                    }
                  >
                    <option value="">לא ידוע</option>
                    <option value="yes">כן</option>
                    <option value="no">לא</option>
                  </Select>
                </FormField>
              </div>
            </Card>
          ))}
        </div>
      )}

      {!showAddChild ? (
        <Button variant="ghost" onClick={() => { setShowAddChild(true); addChild() }}>
          <Plus size={16} />
          הוסף ילד/ה
        </Button>
      ) : null}

      <FormField label="היסטוריית ADHD במשפחה" hint="האם יש בני משפחה נוספים עם אבחנת ADHD?">
        <TextArea
          value={data.familyADHDHistory}
          onChange={(e) => update('familyADHDHistory', e.target.value)}
          placeholder="ספר/י על בני משפחה עם ADHD, למידה, או קשב..."
        />
      </FormField>

      <FormField label="הערות נוספות">
        <TextArea
          value={data.familyNotes}
          onChange={(e) => update('familyNotes', e.target.value)}
          placeholder="כל מידע נוסף שנראה לך רלוונטי..."
        />
      </FormField>
    </div>
  )
}
