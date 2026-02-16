import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { BottomNav } from '@/components/ui/BottomNav'
import { IntakePage } from '@/features/intake/IntakePage'
import { DashboardPage } from '@/features/roadmap/DashboardPage'
import { FeedbackPage } from '@/features/feedback/FeedbackPage'
import { ProfilePage } from '@/features/profile/ProfilePage'

export default function App() {
  return (
    <BrowserRouter>
      <div dir="rtl" className="min-h-screen bg-surface-dim font-sans text-text-primary">
        <Routes>
          <Route path="/" element={<Navigate to="/intake" replace />} />
          <Route path="/intake" element={<IntakePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}
