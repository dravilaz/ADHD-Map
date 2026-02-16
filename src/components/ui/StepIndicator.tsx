import { INTAKE_STEPS } from '@/types'
import type { IntakeStep } from '@/types'

interface StepIndicatorProps {
  currentStep: IntakeStep
  onStepClick?: (step: IntakeStep) => void
}

export function StepIndicator({ currentStep, onStepClick }: StepIndicatorProps) {
  const currentIndex = INTAKE_STEPS.findIndex((s) => s.key === currentStep)

  return (
    <div className="flex items-center justify-between gap-1 px-2 py-3">
      {INTAKE_STEPS.map((step, i) => {
        const isActive = i === currentIndex
        const isCompleted = i < currentIndex
        const isClickable = !!onStepClick && (isCompleted || isActive)

        return (
          <button
            key={step.key}
            type="button"
            disabled={!isClickable}
            onClick={() => isClickable && onStepClick?.(step.key)}
            className="flex flex-1 flex-col items-center gap-1"
          >
            <div
              className={`
                flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors
                ${isActive ? 'bg-clinical-600 text-white' : ''}
                ${isCompleted ? 'bg-clinical-200 text-clinical-800' : ''}
                ${!isActive && !isCompleted ? 'bg-surface-bright text-text-muted' : ''}
              `}
            >
              {isCompleted ? '✓' : i + 1}
            </div>
            <span
              className={`text-[10px] leading-tight text-center ${
                isActive ? 'text-clinical-700 font-semibold' : 'text-text-muted'
              }`}
            >
              {step.labelHe}
            </span>
          </button>
        )
      })}
    </div>
  )
}
