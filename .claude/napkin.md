# Napkin — Seal

## Corrections
| Date | Source | What Went Wrong | What To Do Instead |
|------|--------|----------------|-------------------|

## User Preferences
- uv for Python package management, no venvs
- FastAPI + SQLAlchemy 2.0 async + Pydantic + mypy + ruff + pytest + loguru
- Tests alongside features from day one
- Concise commit messages, no Co-Authored-By lines
- Wait for explicit approval before commits, pushes, PRs

## Patterns That Work
- stateRef pattern: expose React Flow nodes/edges to parent via useRef + useEffect sync
- NodeEditorPanel: floating panel at bottom-center, appears on click for non-process-step nodes
- MobileBlock: fixed z-50 overlay with md:hidden — simple CSS-only responsive gate
- OG image: Next.js opengraph-image.tsx with ImageResponse — auto-wires og:image meta tags
- ChangeSelector: modal overlay for process steps, textarea fallback for custom nodes

## Patterns That Don't Work
- (accumulate as work progresses)

## Domain Notes
- Cascade is a GxP Change Impact Analyzer — demonstrates systems thinking to Seal CEO Will Moss
- Stack matches Seal's: Next.js 15, TS strict, GraphQL (Apollo), Tailwind v4 + Shadcn, React Flow
- DB: Turso (LibSQL/SQLite edge) — file:local.db for dev, libsql:// for prod
- AI: OpenRouter + Gemini 2.0 Flash for regulatory explanations
- Cascade rules are hardcoded (not AI-dependent) — AI only generates explanations
- Rules are now category-aware: Minor/Moderate/Major per FDA SUPAC, ~36 rules with regulatoryAction strings
- Pre-built CAR-T template: 17 nodes (added Specification + Stability Protocol), 28 edges, 7 pre-defined changes with defaultCategory
- ChangeCategory enum (MINOR/MODERATE/MAJOR) drives severity differentiation per source→target pair
- 3 new NodeTypes: SPECIFICATION, STABILITY_PROTOCOL, RAW_MATERIAL
- AI prompt references 21 CFR 314.70, SUPAC, ICH Q12, ICH Q8(R2) — removed EU GMP Annex 11 and Part 11
- CascadeEdge softened: dash 6 6, speed 1s, opacity 60%
- SimulationPanel shows "Filing:" line with regulatory action from cascade rules
- No auth, no tests, no test runner, no CI — pure demo
- Flynn's hosting defaults: Vercel (FE), Supabase not used here (Turso instead)
