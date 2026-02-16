import type { IntakeFormData } from '@/types'
import { supabase } from './supabase'

export async function saveIntake(patientId: string, data: IntakeFormData) {
  const { error } = await supabase
    .from('patients')
    .update({
      intake_data: data,
      intake_status: data.status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', patientId)

  if (error) throw error
}

export async function loadIntake(patientId: string): Promise<IntakeFormData | null> {
  const { data, error } = await supabase
    .from('patients')
    .select('intake_data, intake_status')
    .eq('id', patientId)
    .single()

  if (error) throw error
  if (!data) return null

  return {
    ...(data.intake_data as IntakeFormData),
    status: data.intake_status,
  }
}

export async function createPatient(clinicianId: string): Promise<string> {
  const { data, error } = await supabase
    .from('patients')
    .insert({ clinician_id: clinicianId })
    .select('id')
    .single()

  if (error) throw error
  return data.id
}
