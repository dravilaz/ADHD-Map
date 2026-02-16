import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import type { ExecutiveFunctionScores } from '@/types'
import { EF_LABELS } from '@/types'
import type { ExecutiveFunctionKey } from '@/types'

interface EFRadarChartProps {
  scores: ExecutiveFunctionScores
  previousScores?: ExecutiveFunctionScores
}

export function EFRadarChart({ scores, previousScores }: EFRadarChartProps) {
  const data = (Object.keys(scores) as ExecutiveFunctionKey[]).map((key) => ({
    subject: EF_LABELS[key].he,
    current: scores[key],
    previous: previousScores?.[key] ?? null,
    fullMark: 10,
  }))

  return (
    <div className="w-full" style={{ direction: 'ltr' }}>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fontSize: 12, fill: '#475569' }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 10]}
            tick={{ fontSize: 10, fill: '#94a3b8' }}
          />
          {previousScores && (
            <Radar
              name="קודם"
              dataKey="previous"
              stroke="#94a3b8"
              fill="#94a3b8"
              fillOpacity={0.1}
              strokeDasharray="5 5"
            />
          )}
          <Radar
            name="נוכחי"
            dataKey="current"
            stroke="#0d9488"
            fill="#14b8a6"
            fillOpacity={0.25}
            strokeWidth={2}
          />
          <Tooltip
            contentStyle={{
              direction: 'rtl',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              fontSize: '13px',
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
