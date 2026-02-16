import { useState, useCallback } from 'react'
import type { IntakeFormData, IntakeStep } from '@/types'
import { INTAKE_STEPS } from '@/types'
import { DEFAULT_INTAKE } from '@/lib/intake-defaults'

export function useIntakeForm(initial?: Partial<IntakeFormData>) {
  const [formData, setFormData] = useState<IntakeFormData>({
    ...DEFAULT_INTAKE,
    ...initial,
  })

  const [currentStep, setCurrentStep] = useState<IntakeStep>('personal')

  const stepIndex = INTAKE_STEPS.findIndex((s) => s.key === currentStep)
  const isFirst = stepIndex === 0
  const isLast = stepIndex === INTAKE_STEPS.length - 1

  const goNext = useCallback(() => {
    if (!isLast) {
      setCurrentStep(INTAKE_STEPS[stepIndex + 1].key)
    }
  }, [stepIndex, isLast])

  const goPrev = useCallback(() => {
    if (!isFirst) {
      setCurrentStep(INTAKE_STEPS[stepIndex - 1].key)
    }
  }, [stepIndex, isFirst])

  const goToStep = useCallback((step: IntakeStep) => {
    setCurrentStep(step)
  }, [])

  const updateField = useCallback(
    <K extends keyof IntakeFormData>(section: K, value: IntakeFormData[K]) => {
      setFormData((prev) => ({ ...prev, [section]: value }))
    },
    []
  )

  const markCompleted = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      completedAt: new Date().toISOString(),
      status: 'completed' as const,
    }))
  }, [])

  return {
    formData,
    currentStep,
    stepIndex,
    isFirst,
    isLast,
    goNext,
    goPrev,
    goToStep,
    updateField,
    markCompleted,
    setFormData,
  }
}
