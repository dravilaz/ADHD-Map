import { useLocation, useNavigate } from 'react-router-dom'
import { ClipboardList, BarChart3, MessageSquare, User } from 'lucide-react'

const NAV_ITEMS = [
  { path: '/intake', labelHe: 'קליטה', icon: ClipboardList },
  { path: '/dashboard', labelHe: 'מפה', icon: BarChart3 },
  { path: '/feedback', labelHe: 'משוב', icon: MessageSquare },
  { path: '/profile', labelHe: 'פרופיל', icon: User },
] as const

export function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-surface/95 backdrop-blur-sm pb-safe-bottom">
      <div className="mx-auto flex max-w-lg items-center justify-around py-2">
        {NAV_ITEMS.map(({ path, labelHe, icon: Icon }) => {
          const isActive = location.pathname.startsWith(path)
          return (
            <button
              key={path}
              type="button"
              onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${
                isActive
                  ? 'text-clinical-600'
                  : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className={`text-[10px] ${isActive ? 'font-semibold' : ''}`}>
                {labelHe}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
