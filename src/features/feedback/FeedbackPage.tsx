import { useRoadmap } from '@/hooks/useRoadmap'
import { PageShell } from '@/components/ui/PageShell'
import { ReasoningChain } from './components/ReasoningChain'
import { CorrectionPanel } from './components/CorrectionPanel'
import { CorrectionHistory } from './components/CorrectionHistory'
import type { ClinicalCorrection } from '@/types'

export function FeedbackPage() {
  const { roadmap, addCorrection } = useRoadmap()

  const handleCorrection = (correction: ClinicalCorrection) => {
    addCorrection(correction)
    // In production: await saveCorrection(roadmapId, correction)
  }

  return (
    <PageShell title="לולאת משוב" subtitle="כלים קליניים — תיקון, הסבר ולמידה">
      <div className="flex flex-col gap-6">
        {/* Reasoning Chain */}
        <section>
          <ReasoningChain
            edges={roadmap.network.edges}
            nodes={roadmap.network.nodes}
          />
        </section>

        {/* Correction Interface */}
        <section>
          <CorrectionPanel
            nodes={roadmap.network.nodes}
            edges={roadmap.network.edges}
            onSubmitCorrection={handleCorrection}
          />
        </section>

        {/* History */}
        <section>
          <CorrectionHistory corrections={roadmap.corrections} />
        </section>
      </div>
    </PageShell>
  )
}
