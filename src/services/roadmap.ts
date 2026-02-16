import type { PatientRoadmap, ClinicalCorrection } from '@/types'
import { supabase } from './supabase'

export async function loadRoadmap(patientId: string): Promise<PatientRoadmap | null> {
  const { data, error } = await supabase
    .from('roadmaps')
    .select('*')
    .eq('patient_id', patientId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error) throw error
  if (!data) return null

  const { data: corrections } = await supabase
    .from('corrections')
    .select('*')
    .eq('roadmap_id', data.id)
    .order('created_at', { ascending: false })

  return {
    patientId,
    efScores: data.ef_scores,
    network: data.network,
    timeline: data.timeline,
    corrections: (corrections ?? []) as ClinicalCorrection[],
    lastUpdated: data.updated_at,
  }
}

export async function saveCorrection(
  roadmapId: string,
  correction: Omit<ClinicalCorrection, 'id' | 'timestamp'>
) {
  const { error } = await supabase.from('corrections').insert({
    roadmap_id: roadmapId,
    clinician_id: correction.clinicianId,
    target_type: correction.targetType,
    target_id: correction.targetId,
    previous_value: correction.previousValue,
    new_value: correction.newValue,
    explanation: correction.explanation,
  })

  if (error) throw error
}
