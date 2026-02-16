import { useMemo } from 'react'
import type { NetworkNode, NetworkEdge } from '@/types'

interface NetworkMapProps {
  nodes: NetworkNode[]
  edges: NetworkEdge[]
  onNodeClick?: (nodeId: string) => void
  onEdgeClick?: (edgeId: string) => void
}

const NODE_COLORS: Record<NetworkNode['type'], { bg: string; border: string; text: string }> = {
  symptom:      { bg: '#fee2e2', border: '#ef4444', text: '#991b1b' },
  impact:       { bg: '#ffedd5', border: '#f97316', text: '#9a3412' },
  intervention: { bg: '#ccfbf1', border: '#14b8a6', text: '#115e59' },
}

const TYPE_LABELS: Record<NetworkNode['type'], string> = {
  symptom: 'תסמין',
  impact: 'השפעה',
  intervention: 'התערבות',
}

/** Simple force-directed-ish layout: circular arrangement by type */
function layoutNodes(nodes: NetworkNode[]) {
  const groups: Record<string, NetworkNode[]> = { symptom: [], impact: [], intervention: [] }
  nodes.forEach((n) => groups[n.type]?.push(n))

  const centerX = 300
  const centerY = 200
  const positioned: Record<string, { x: number; y: number }> = {}

  // Symptoms on left arc, impacts on right arc, interventions on top
  const arcs: [string, number, number, number][] = [
    ['symptom', 120, centerY, 130],
    ['impact', 480, centerY, 130],
    ['intervention', centerX, 60, 100],
  ]

  arcs.forEach(([type, cx, cy, radius]) => {
    const group = groups[type] ?? []
    group.forEach((node, i) => {
      const angle = ((i - (group.length - 1) / 2) * Math.PI) / Math.max(group.length, 3)
      positioned[node.id] = {
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
      }
    })
  })

  return positioned
}

export function NetworkMap({ nodes, edges, onNodeClick, onEdgeClick }: NetworkMapProps) {
  const positions = useMemo(() => layoutNodes(nodes), [nodes])

  return (
    <div className="w-full overflow-x-auto" style={{ direction: 'ltr' }}>
      <svg viewBox="0 0 600 400" className="w-full min-w-[500px]">
        {/* Edges */}
        {edges.map((edge) => {
          const from = positions[edge.source]
          const to = positions[edge.target]
          if (!from || !to) return null
          return (
            <g key={edge.id}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="#94a3b8"
                strokeWidth={edge.weight * 3 + 0.5}
                strokeOpacity={0.5}
                className="cursor-pointer hover:stroke-[#3b82f6] transition-colors"
                onClick={() => onEdgeClick?.(edge.id)}
              />
            </g>
          )
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const pos = positions[node.id]
          if (!pos) return null
          const colors = NODE_COLORS[node.type]
          const radius = 18 + (node.severity / 10) * 12

          return (
            <g
              key={node.id}
              className="cursor-pointer"
              onClick={() => onNodeClick?.(node.id)}
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r={radius}
                fill={colors.bg}
                stroke={colors.border}
                strokeWidth={2}
                className="transition-all hover:brightness-95"
              />
              <text
                x={pos.x}
                y={pos.y - 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={colors.text}
                fontSize={9}
                fontWeight={600}
                className="pointer-events-none"
              >
                {node.labelHe.length > 12 ? node.labelHe.slice(0, 12) + '…' : node.labelHe}
              </text>
              <text
                x={pos.x}
                y={pos.y + 10}
                textAnchor="middle"
                fill={colors.text}
                fontSize={7}
                opacity={0.7}
                className="pointer-events-none"
              >
                {TYPE_LABELS[node.type]}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-2" style={{ direction: 'rtl' }}>
        {Object.entries(TYPE_LABELS).map(([type, label]) => {
          const colors = NODE_COLORS[type as NetworkNode['type']]
          return (
            <div key={type} className="flex items-center gap-1.5">
              <div
                className="h-3 w-3 rounded-full border"
                style={{ backgroundColor: colors.bg, borderColor: colors.border }}
              />
              <span className="text-xs text-text-secondary">{label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
