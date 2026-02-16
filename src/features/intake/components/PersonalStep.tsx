import type { PersonalDetails } from '@/types'
import { FormField, Input, Select } from '@/components/ui/FormField'

interface PersonalStepProps {
  data: PersonalDetails
  onChange: (data: PersonalDetails) => void
}

export function PersonalStep({ data, onChange }: PersonalStepProps) {
  const update = (field: keyof PersonalDetails, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-text-secondary leading-relaxed">
        נא למלא את הפרטים האישיים. המידע ישמש לצורך התהליך הטיפולי בלבד ומאובטח בהתאם לתקנות HIPAA.
      </p>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="שם פרטי" required>
          <Input
            value={data.firstName}
            onChange={(e) => update('firstName', e.target.value)}
            placeholder="שם פרטי"
          />
        </FormField>

        <FormField label="שם משפחה" required>
          <Input
            value={data.lastName}
            onChange={(e) => update('lastName', e.target.value)}
            placeholder="שם משפחה"
          />
        </FormField>
      </div>

      <FormField label="תעודת זהות" required>
        <Input
          value={data.idNumber}
          onChange={(e) => update('idNumber', e.target.value)}
          placeholder="מספר ת.ז."
          inputMode="numeric"
        />
      </FormField>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="תאריך לידה" required>
          <Input
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => update('dateOfBirth', e.target.value)}
          />
        </FormField>

        <FormField label="מגדר">
          <Select value={data.gender} onChange={(e) => update('gender', e.target.value)}>
            <option value="">בחר/י</option>
            <option value="male">זכר</option>
            <option value="female">נקבה</option>
            <option value="other">אחר</option>
          </Select>
        </FormField>
      </div>

      <FormField label="טלפון נייד" required>
        <Input
          type="tel"
          value={data.phone}
          onChange={(e) => update('phone', e.target.value)}
          placeholder="050-0000000"
          inputMode="tel"
          dir="ltr"
        />
      </FormField>

      <FormField label="דוא״ל">
        <Input
          type="email"
          value={data.email}
          onChange={(e) => update('email', e.target.value)}
          placeholder="email@example.com"
          dir="ltr"
        />
      </FormField>

      <FormField label="כתובת מגורים">
        <Input
          value={data.address}
          onChange={(e) => update('address', e.target.value)}
          placeholder="רחוב ומספר"
        />
      </FormField>

      <FormField label="עיר">
        <Input
          value={data.city}
          onChange={(e) => update('city', e.target.value)}
          placeholder="עיר"
        />
      </FormField>

      <FormField label="מקצוע / עיסוק">
        <Input
          value={data.occupation}
          onChange={(e) => update('occupation', e.target.value)}
          placeholder="מקצוע נוכחי"
        />
      </FormField>

      <FormField label="מקור הפנייה">
        <Input
          value={data.referralSource}
          onChange={(e) => update('referralSource', e.target.value)}
          placeholder="מי הפנה אותך?"
        />
      </FormField>
    </div>
  )
}
