# System One — ADHD Roadmap Platform

## Phase 1: Web MVP (Current)

### Architecture

```
src/
├── components/ui/       # Reusable UI primitives (Card, Button, FormField, etc.)
├── features/
│   ├── intake/          # Multi-step intake questionnaire wizard
│   │   └── components/  # PersonalStep, FamilyStep, MedicalStep, HabitsStep, ReviewStep
│   ├── roadmap/         # Visualization dashboard
│   │   └── components/  # EFRadarChart, NetworkMap, ImprovementTimeline
│   ├── feedback/        # Active clinician feedback loop
│   │   └── components/  # ReasoningChain, CorrectionPanel, CorrectionHistory
│   └── profile/         # User profile & security info
├── hooks/               # useIntakeForm, useRoadmap
├── services/            # Supabase client, intake API, roadmap API
├── types/               # TypeScript interfaces (IntakeFormData, PatientRoadmap, etc.)
└── lib/                 # Default data, demo data, utilities
```

### Tech Stack
- **Frontend**: React 19 + Vite + TypeScript + Tailwind CSS v4
- **Charts**: Recharts (Radar) + Custom SVG (Network Map)
- **Backend**: Supabase (Auth, PostgreSQL, Row Level Security)
- **Mobile**: Capacitor (config prepared, native builds Phase 2)
- **RTL**: Full Hebrew support, Heebo font family

### Data Schemas

#### Patients Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| clinician_id | UUID | FK → auth.users |
| intake_data | JSONB | Full IntakeFormData |
| intake_status | TEXT | draft / in_progress / completed |
| created_at | TIMESTAMPTZ | Auto |
| updated_at | TIMESTAMPTZ | Auto |

#### Roadmaps Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| patient_id | UUID | FK → patients |
| ef_scores | JSONB | ExecutiveFunctionScores (6 pillars) |
| network | JSONB | {nodes: NetworkNode[], edges: NetworkEdge[]} |
| timeline | JSONB | TimelineMilestone[] |
| created_at | TIMESTAMPTZ | Auto |
| updated_at | TIMESTAMPTZ | Auto |

#### Corrections Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| roadmap_id | UUID | FK → roadmaps |
| clinician_id | UUID | FK → auth.users |
| target_type | TEXT | node / edge / score |
| target_id | TEXT | ID of the corrected element |
| previous_value | TEXT | JSON of old state |
| new_value | TEXT | Corrected value |
| explanation | TEXT | Clinician reasoning (for prompt-tuning) |
| created_at | TIMESTAMPTZ | Auto |

### API Endpoints (Supabase REST)

```
GET    /rest/v1/patients?clinician_id=eq.{id}
POST   /rest/v1/patients
PATCH  /rest/v1/patients?id=eq.{id}

GET    /rest/v1/roadmaps?patient_id=eq.{id}
POST   /rest/v1/roadmaps
PATCH  /rest/v1/roadmaps?id=eq.{id}

GET    /rest/v1/corrections?roadmap_id=eq.{id}
POST   /rest/v1/corrections
```

---

## Phase 2: Clinical Integration

### Planned Features

1. **Supabase Auth Integration**
   - Email/password + magic link login
   - Role-based access (clinician, admin, patient-view)
   - Session management with JWT refresh

2. **ASRS Daily Log**
   - ASRS-v1.1 Screener as a quick daily self-report
   - Trend charts (weekly/monthly)
   - Push notification reminders (Capacitor)

3. **Titration Tracking Module**
   - Medication dosage timeline
   - Side-effect logging
   - Efficacy scoring per dose change
   - Integration with EF Radar (overlay pre/post dose change)

4. **AI-Assisted Analysis**
   - LLM-powered symptom → impact connection suggestions
   - Prompt-tuning pipeline using clinician corrections
   - Confidence scores on AI suggestions

5. **Native Mobile Build**
   - Capacitor → iOS (App Store) & Android (Google Play)
   - Push notifications for daily logs
   - Offline-first with sync queue
   - Biometric authentication (Face ID / fingerprint)

6. **Reporting & Export**
   - PDF report generation (patient summary)
   - Data export (CSV/JSON) for research
   - Clinician dashboard with multi-patient overview

### Phase 3: Scale & Research

- Multi-clinic deployment
- Anonymized research data pipeline
- A/B testing framework for intervention strategies
- Integration with external EHR systems (FHIR)
- Therapist collaboration features (shared patients)
