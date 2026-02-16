import { useIntakeForm } from '@/hooks/useIntakeForm'
import { PageShell } from '@/components/ui/PageShell'
import { StepIndicator } from '@/components/ui/StepIndicator'
import { Button } from '@/components/ui/Button'
import { PersonalStep } from './components/PersonalStep'
import { FamilyStep } from './components/FamilyStep'
import { MedicalStep } from './components/MedicalStep'
import { HabitsStep } from './components/HabitsStep'
import { ReviewStep } from './components/ReviewStep'
import { ChevronRight, ChevronLeft, Send } from 'lucide-react'

export function IntakePage() {
  const {
    formData,
    currentStep,
    isFirst,
    isLast,
    goNext,
    goPrev,
    goToStep,
    updateField,
    markCompleted,
  } = useIntakeForm()

  const handleSubmit = () => {
    markCompleted()
    // In production: await saveIntake(patientId, formData)
  }

  return (
    <PageShell title="שאלון קליטה" subtitle="שאלון קבלה ראשוני — מערכת System One">
      <StepIndicator currentStep={currentStep} onStepClick={goToStep} />

      <div className="mt-4">
        {currentStep === 'personal' && (
          <PersonalStep
            data={formData.personalDetails}
            onChange={(d) => updateField('personalDetails', d)}
          />
        )}
        {currentStep === 'family' && (
          <FamilyStep
            data={formData.familyContext}
            onChange={(d) => updateField('familyContext', d)}
          />
        )}
        {currentStep === 'medical' && (
          <MedicalStep
            data={formData.medicalHistory}
            onChange={(d) => updateField('medicalHistory', d)}
          />
        )}
        {currentStep === 'habits' && (
          <HabitsStep
            data={formData.habitsAndAddictions}
            onChange={(d) => updateField('habitsAndAddictions', d)}
          />
        )}
        {currentStep === 'review' && <ReviewStep data={formData} />}
      </div>

      {/* Navigation buttons */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <Button
          variant="secondary"
          onClick={goPrev}
          disabled={isFirst}
        >
          <ChevronRight size={16} />
          הקודם
        </Button>

        {isLast ? (
          <Button onClick={handleSubmit}>
            <Send size={16} />
            שליחה
          </Button>
        ) : (
          <Button onClick={goNext}>
            הבא
            <ChevronLeft size={16} />
          </Button>
        )}
      </div>

      {formData.status === 'completed' && (
        <div className="mt-4 rounded-xl bg-clinical-50 border border-clinical-200 p-4 text-center">
          <p className="text-sm font-medium text-clinical-800">
            השאלון נשלח בהצלחה. תודה על שיתוף הפעולה.
          </p>
        </div>
      )}
    </PageShell>
  )
}
