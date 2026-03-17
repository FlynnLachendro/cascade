# Cascade — GxP Change Impact Analyzer

Model regulated manufacturing workflows as interactive graphs, simulate a process change, and trace cascading impacts across SOPs, training records, validation protocols, and regulatory submissions — with AI-powered regulatory analysis.

## Quick Start

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Click "Try the Demo" to load the pre-built CAR-T manufacturing template.

## Environment Variables

```
OPENROUTER_API_KEY=            # Required — for AI regulatory explanations
TURSO_DATABASE_URL=            # libsql://your-db.turso.io
TURSO_AUTH_TOKEN=              # Turso auth token
NEXT_PUBLIC_APP_URL=           # For shareable URLs and OG tags
```

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind v4 + Shadcn UI |
| Graph | @xyflow/react (React Flow) |
| API | GraphQL (Apollo Server + Client) |
| Database | Turso (LibSQL / SQLite edge) |
| AI | OpenRouter (Gemini 2.0 Flash) |
| Streaming | Web Streams API (SSE) |
| Deployment | Vercel |

## How It Works

1. **Build** — Drag 11 GxP document types onto the canvas and connect them to map manufacturing dependencies
2. **Simulate** — Click a process step, select a change, classify it as Minor/Moderate/Major per FDA SUPAC
3. **Trace** — Watch severity badges appear on affected nodes with AI-generated regulatory analysis

## Cascade Rules

~36 category-aware rules mapping (source type, target type, change category) → (severity, regulatory action). Rules are hardcoded — AI only generates explanations. Change categories follow FDA SUPAC classification:

- **Minor** — Within validated range, Annual Report filing
- **Moderate** — May affect quality, CBE-30 supplement
- **Major** — Significant impact, Prior Approval Supplement (PAS)

## Node Types

Process Step, SOP, Training Record, Batch Record, Equipment Qualification, Validation Protocol, CAPA, Regulatory Submission, Specification, Stability Protocol, Raw Material

## Template

Pre-built CAR-T Cell Therapy Manufacturing workflow: 17 nodes, 28 edges, 7 predefined changes with default categories.

## Deployment

Connected to Vercel — auto-deploys from `main`.

## No Tests

This is a demo project. No test runner, no CI.
