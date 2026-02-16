import { useState, useCallback } from 'react'
import type { PatientRoadmap, ClinicalCorrection, ExecutiveFunctionScores, NetworkNode, NetworkEdge } from '@/types'
import { DEMO_ROADMAP } from '@/lib/demo-data'

export function useRoadmap(initial?: PatientRoadmap) {
  const [roadmap, setRoadmap] = useState<PatientRoadmap>(initial ?? DEMO_ROADMAP)

  const updateEfScores = useCallback((scores: ExecutiveFunctionScores) => {
    setRoadmap((prev) => ({ ...prev, efScores: scores, lastUpdated: new Date().toISOString() }))
  }, [])

  const updateNode = useCallback((nodeId: string, updates: Partial<NetworkNode>) => {
    setRoadmap((prev) => ({
      ...prev,
      network: {
        ...prev.network,
        nodes: prev.network.nodes.map((n) => (n.id === nodeId ? { ...n, ...updates } : n)),
      },
      lastUpdated: new Date().toISOString(),
    }))
  }, [])

  const updateEdge = useCallback((edgeId: string, updates: Partial<NetworkEdge>) => {
    setRoadmap((prev) => ({
      ...prev,
      network: {
        ...prev.network,
        edges: prev.network.edges.map((e) => (e.id === edgeId ? { ...e, ...updates } : e)),
      },
      lastUpdated: new Date().toISOString(),
    }))
  }, [])

  const addCorrection = useCallback((correction: ClinicalCorrection) => {
    setRoadmap((prev) => ({
      ...prev,
      corrections: [correction, ...prev.corrections],
      lastUpdated: new Date().toISOString(),
    }))
  }, [])

  return {
    roadmap,
    setRoadmap,
    updateEfScores,
    updateNode,
    updateEdge,
    addCorrection,
  }
}
