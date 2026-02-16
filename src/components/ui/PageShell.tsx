import type { ReactNode } from 'react'

interface PageShellProps {
  title: string
  subtitle?: string
  children: ReactNode
}

export function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur-sm">
        <div className="mx-auto max-w-lg px-4 py-3">
          <h1 className="text-lg font-bold text-clinical-800">{title}</h1>
          {subtitle && (
            <p className="text-xs text-text-muted">{subtitle}</p>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-lg px-4 py-4">
        {children}
      </main>
    </div>
  )
}
