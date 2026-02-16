import { PageShell } from '@/components/ui/PageShell'
import { Card, CardTitle } from '@/components/ui/Card'
import { User, Shield, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function ProfilePage() {
  return (
    <PageShell title="פרופיל" subtitle="ניהול חשבון ואבטחה">
      <div className="flex flex-col gap-4">
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-clinical-100 text-clinical-700">
              <User size={24} />
            </div>
            <div>
              <CardTitle>ד״ר ישראל ישראלי</CardTitle>
              <p className="text-xs text-text-muted">dr.israeli@clinic.co.il</p>
            </div>
          </div>
          <p className="text-sm text-text-secondary">
            תפקיד: מטפל/ת ראשי/ת
          </p>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-3">
            <Shield size={18} className="text-clinical-600" />
            <CardTitle>אבטחה ופרטיות</CardTitle>
          </div>
          <ul className="text-sm text-text-secondary flex flex-col gap-2">
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-clinical-400" />
              הצפנת נתונים בתעבורה ובמנוחה
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-clinical-400" />
              Row Level Security (RLS) פעיל
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-clinical-400" />
              תואם HIPAA — גישה מבוססת תפקיד
            </li>
          </ul>
        </Card>

        <Button variant="ghost" fullWidth className="text-alert-500">
          <LogOut size={16} />
          התנתקות
        </Button>
      </div>
    </PageShell>
  )
}
