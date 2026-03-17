# Napkin — Cascade

## Corrections
| Date | Source | What Went Wrong | What To Do Instead |
|------|--------|----------------|-------------------|
| 2026-03-17 | Flynn | Node color changes during simulation confused identity | Badge-only approach — keep type colors, add severity badge below divider |
| 2026-03-17 | Flynn | Category picker used jargon (SUPAC/CBE-30) with no context | Plain-English descriptions first, filing type as small label below |
| 2026-03-17 | Flynn | Legend positioned at bottom-left, hidden behind zoom controls & off-screen | Always position overlay UI at top of canvas, zoom controls top-right |

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
- ChangeSelector: modal overlay with numbered steps + progressive disclosure for process steps, textarea fallback for custom nodes
- Badge-only severity: keep node type colors constant, add severity badge in footer + subtle ring outline
- SimulationLegend: collapsible panel at top-left with grid layout (80px badge column + description) explaining severity, edges, trigger in plain English
- GraphGuide: pre-simulation collapsible panel explaining the graph (node types, connections, how to start). Swaps to SimulationLegend on simulation start
- React Flow Controls at top-right, legend/guide at top-left — always visible regardless of graph size

## Patterns That Don't Work
- Changing node colors to indicate severity — destroys node type identity, confusing for non-domain users
- Positioning overlay UI at bottom of React Flow canvas — large graphs push controls off-screen
- Jargon-only labels (SUPAC, CBE-30, PAS) without plain-English explanation — users get stuck

## Domain Notes
- Cascade is a GxP Change Impact Analyzer — demonstrates systems thinking to Seal CEO Will Moss
- Stack matches Seal's: Next.js 16, TS strict, GraphQL (Apollo), Tailwind v4 + Shadcn, React Flow
- DB: Turso (LibSQL/SQLite edge) — file:local.db for dev, libsql:// for prod
- AI: OpenRouter + Gemini 2.0 Flash for regulatory explanations
- Cascade rules are hardcoded (not AI-dependent) — AI only generates explanations
- Rules are category-aware: Minor/Moderate/Major per FDA SUPAC, ~36 rules with regulatoryAction strings
- Pre-built CAR-T template: 18 nodes (added Raw Material: PBS Buffer), 30 edges, 7 pre-defined changes with defaultCategory
- ChangeCategory enum (MINOR/MODERATE/MAJOR) drives severity differentiation per source→target pair
- 11 NodeTypes: original 8 + SPECIFICATION, STABILITY_PROTOCOL, RAW_MATERIAL
- AI prompt references 21 CFR 314.70, SUPAC, ICH Q12, ICH Q8(R2), ICH Q1A/Q5C
- CascadeEdge: dash 6 6, speed 1s, opacity 60%
- SimulationPanel shows "Filing:" line with regulatory action from cascade rules
- Markdown export includes change category (FDA SUPAC) and Filing lines per impact
- No auth, no tests, no test runner, no CI — pure demo
- Hosting: Vercel, auto-deploys from main
