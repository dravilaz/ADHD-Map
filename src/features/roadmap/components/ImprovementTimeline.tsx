import type { TimelineMilestone } from '@/types'
import { Pill, Brain, Dumbbell, Flag } from 'lucide-react'

interface ImprovementTimelineProps {
  milestones: TimelineMilestone[]
}

const CATEGORY_CONFIG: Record<TimelineMilestone['category'], { icon: typeof Pill; color: string; bg: string }> = {
  medication: { icon: Pill, color: 'text-action-600', bg: 'bg-action-50' },
  therapy:    { icon: Brain, color: 'text-clinical-600', bg: 'bg-clinical-50' },
  lifestyle:  { icon: Dumbbell, color: 'text-warm-600', bg: 'bg-warm-50' },
  milestone:  { icon: Flag, color: 'text-clinical-800', bg: 'bg-clinical-100' },
}

export function ImprovementTimeline({ milestones }: ImprovementTimelineProps) {
  const sorted = [...milestones].sort((a, b) => a.date.localeCompare(b.date))

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute right-4 top-0 bottom-0 w-0.5 bg-border" />

      <div className="flex flex-col gap-6">
        {sorted.map((milestone) => {
          const config = CATEGORY_CONFIG[milestone.category]
          const Icon = config.icon

          return (
            <div key={milestone.id} className="relative flex gap-4 pr-4">
              {/* Dot on timeline */}
              <div
                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${config.bg}`}
              >
                <Icon size={16} className={config.color} />
              </div>

              {/* Content */}
              <div className="flex-1 pb-2">
                <div className="flex items-baseline gap-2">
                  <h4 className="text-sm font-semibold text-text-primary">
                    {milestone.titleHe}
                  </h4>
                  <time className="text-xs text-text-muted" dir="ltr">
                    {new Date(milestone.date).toLocaleDateString('he-IL')}
                  </time>
                </div>
                <p className="mt-1 text-xs text-text-secondary leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
