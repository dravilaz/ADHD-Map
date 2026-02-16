import { useState } from 'react'
import { useRoadmap } from '@/hooks/useRoadmap'
import { PageShell } from '@/components/ui/PageShell'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { EFRadarChart } from './components/EFRadarChart'
import { NetworkMap } from './components/NetworkMap'
import { ImprovementTimeline } from './components/ImprovementTimeline'

type SelectedItem = { type: 'node' | 'edge'; id: string } | null

export function DashboardPage() {
  const { roadmap } = useRoadmap()
  const [selected, setSelected] = useState<SelectedItem>(null)

  const selectedNode = selected?.type === 'node'
    ? roadmap.network.nodes.find((n) => n.id === selected.id)
    : null

  const selectedEdge = selected?.type === 'edge'
    ? roadmap.network.edges.find((e) => e.id === selected.id)
    : null

  // Get earliest snapshot as "previous" scores
  const earliestSnapshot = roadmap.timeline
    .filter((m) => m.efScoresSnapshot)
    .sort((a, b) => a.date.localeCompare(b.date))[0]?.efScoresSnapshot

  const previousScores = earliestSnapshot
    ? {
        activation: earliestSnapshot.activation ?? roadmap.efScores.activation,
        focus: earliestSnapshot.focus ?? roadmap.efScores.focus,
        effort: earliestSnapshot.effort ?? roadmap.efScores.effort,
        emotion: earliestSnapshot.emotion ?? roadmap.efScores.emotion,
        memory: earliestSnapshot.memory ?? roadmap.efScores.memory,
        action: earliestSnapshot.action ?? roadmap.efScores.action,
      }
    : undefined

  return (
    <PageShell title="מפת הדרכים" subtitle="תמונה מקיפה של הפרופיל הנוירוקוגניטיבי">
      {/* Executive Function Radar */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>פרופיל תפקודים ניהוליים</CardTitle>
          <p className="text-xs text-text-muted mt-1">
            ניקוד 0–10 עבור כל אחד מששת עמודי התפקוד הניהולי
          </p>
        </CardHeader>
        <EFRadarChart scores={roadmap.efScores} previousScores={previousScores} />
      </Card>

      {/* Network Map */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>מפת תסמינים ← השפעות</CardTitle>
          <p className="text-xs text-text-muted mt-1">
            לחץ/י על צומת או קשר כדי לראות פרטים והסבר
          </p>
        </CardHeader>
        <NetworkMap
          nodes={roadmap.network.nodes}
          edges={roadmap.network.edges}
          onNodeClick={(id) => setSelected({ type: 'node', id })}
          onEdgeClick={(id) => setSelected({ type: 'edge', id })}
        />

        {/* Detail panel */}
        {selectedNode && (
          <div className="mt-3 rounded-xl border border-clinical-200 bg-clinical-50 p-3">
            <h4 className="text-sm font-semibold text-clinical-800">{selectedNode.labelHe}</h4>
            <p className="text-xs text-text-secondary mt-1">
              סוג: {selectedNode.type === 'symptom' ? 'תסמין' : selectedNode.type === 'impact' ? 'השפעה' : 'התערבות'} |
              חומרה: {selectedNode.severity}/10
            </p>
          </div>
        )}
        {selectedEdge && (
          <div className="mt-3 rounded-xl border border-action-200 bg-action-50 p-3">
            <h4 className="text-sm font-semibold text-action-800">הסבר הקשר</h4>
            <p className="text-xs text-text-secondary mt-1">{selectedEdge.reasoning}</p>
            <p className="text-xs text-text-muted mt-1">
              חוזק הקשר: {Math.round(selectedEdge.weight * 100)}%
            </p>
          </div>
        )}
      </Card>

      {/* Improvement Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>דרך השיפור</CardTitle>
          <p className="text-xs text-text-muted mt-1">
            ציר הזמן מציג אבני דרך, שינויים תרופתיים, טיפוליים ואורח חיים
          </p>
        </CardHeader>
        <ImprovementTimeline milestones={roadmap.timeline} />
      </Card>
    </PageShell>
  )
}
