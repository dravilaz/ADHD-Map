import type { NetworkEdge, NetworkNode } from '@/types'
import { Card } from '@/components/ui/Card'
import { Lightbulb } from 'lucide-react'

interface ReasoningChainProps {
  edges: NetworkEdge[]
  nodes: NetworkNode[]
}

export function ReasoningChain({ edges, nodes }: ReasoningChainProps) {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]))

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-clinical-700">
        <Lightbulb size={18} />
        <h3 className="text-sm font-semibold">שרשרת ההסבר — למה הקשר הזה קיים?</h3>
      </div>
      <p className="text-xs text-text-muted">
        כל קשר במפה מלווה בהסבר מבוסס. ניתן לתקן, להסיר או להוסיף הסברים.
      </p>

      {edges.map((edge) => {
        const source = nodeMap.get(edge.source)
        const target = nodeMap.get(edge.target)
        if (!source || !target) return null

        return (
          <Card key={edge.id} className="border-r-4 border-r-clinical-400">
            <div className="flex items-center gap-2 text-xs text-text-muted mb-2">
              <span className="font-medium text-text-primary">{source.labelHe}</span>
              <span>←</span>
              <span className="font-medium text-text-primary">{target.labelHe}</span>
              <span className="mr-auto bg-clinical-100 text-clinical-700 rounded-full px-2 py-0.5 text-[10px] font-medium">
                {Math.round(edge.weight * 100)}%
              </span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              {edge.reasoning}
            </p>
          </Card>
        )
      })}
    </div>
  )
}
