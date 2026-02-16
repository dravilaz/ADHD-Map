import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Database schema for Supabase (to be applied via SQL migrations):
 *
 * -- Patients
 * CREATE TABLE patients (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   clinician_id UUID REFERENCES auth.users(id),
 *   intake_data JSONB NOT NULL DEFAULT '{}',
 *   intake_status TEXT CHECK (intake_status IN ('draft','in_progress','completed')) DEFAULT 'draft',
 *   created_at TIMESTAMPTZ DEFAULT now(),
 *   updated_at TIMESTAMPTZ DEFAULT now()
 * );
 *
 * -- Roadmaps
 * CREATE TABLE roadmaps (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
 *   ef_scores JSONB NOT NULL DEFAULT '{}',
 *   network JSONB NOT NULL DEFAULT '{"nodes":[],"edges":[]}',
 *   timeline JSONB NOT NULL DEFAULT '[]',
 *   created_at TIMESTAMPTZ DEFAULT now(),
 *   updated_at TIMESTAMPTZ DEFAULT now()
 * );
 *
 * -- Clinical corrections (for prompt-tuning)
 * CREATE TABLE corrections (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   roadmap_id UUID REFERENCES roadmaps(id) ON DELETE CASCADE,
 *   clinician_id UUID REFERENCES auth.users(id),
 *   target_type TEXT CHECK (target_type IN ('node','edge','score')),
 *   target_id TEXT NOT NULL,
 *   previous_value TEXT,
 *   new_value TEXT,
 *   explanation TEXT NOT NULL,
 *   created_at TIMESTAMPTZ DEFAULT now()
 * );
 *
 * -- Row Level Security
 * ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE roadmaps ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE corrections ENABLE ROW LEVEL SECURITY;
 *
 * CREATE POLICY "Clinicians see own patients"
 *   ON patients FOR ALL
 *   USING (clinician_id = auth.uid());
 *
 * CREATE POLICY "Clinicians see own roadmaps"
 *   ON roadmaps FOR ALL
 *   USING (patient_id IN (SELECT id FROM patients WHERE clinician_id = auth.uid()));
 *
 * CREATE POLICY "Clinicians see own corrections"
 *   ON corrections FOR ALL
 *   USING (clinician_id = auth.uid());
 */
