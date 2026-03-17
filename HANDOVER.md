# Handover — 2026-03-17 Session

## What was done

### GxP Accuracy Upgrade (8-step implementation)

The cascade rules engine was upgraded from flat severity mapping to FDA SUPAC category-aware rules. Previously, every process step change triggered the same severity regardless of magnitude. Now, changes are classified as Minor, Moderate, or Major — each producing different severity levels and regulatory filing requirements.

**Types & Enums** — Added `ChangeCategory` enum (MINOR/MODERATE/MAJOR), 3 new `NodeType` values (SPECIFICATION, STABILITY_PROTOCOL, RAW_MATERIAL), `regulatoryAction` field on `CascadeRule` and `SimulationImpact`, `defaultCategory` on `PredefinedChange`.

**Cascade Rules** — Replaced 9 flat rules with ~36 category-aware rules. Each rule now specifies source type, target type, category, severity, regulatory action string, and reason. New `findApplicableRule()` accepts a category parameter (defaults to MODERATE).

**Simulation Engine** — `runCascade()` accepts `changeCategory` and propagates `regulatoryAction` through the impact chain.

**API + AI Prompt** — `/api/simulate` accepts `changeCategory` from POST body. AI system prompt rewritten to reference 21 CFR 314.70, SUPAC, ICH Q12, ICH Q8(R2). Removed EU GMP Annex 11 and 21 CFR Part 11 (not relevant to change control filing). Prompt now includes change category and regulatory action context.

**CAR-T Template** — Added Specification node + Stability Protocol node (positioned at y=-200 above process steps). Replaced SOP→CAPA edges with PROCESS_STEP→CAPA direct edges. Added process step→spec, cryo→stability, spec/stab→regulatory edges. All 7 predefined changes have `defaultCategory`. Template now has 17 nodes, 28 edges.

**GraphQL Schema** — Added `specification`, `stability_protocol`, `raw_material` to NodeType enum.

### UX Improvements

**Badge-only severity indicators** — Nodes no longer change their background/border colors during simulation. Type identity (border color, label color) is preserved. Severity is shown via a badge in a footer section below a divider, plus a subtle ring outline in the severity color. Trigger node shows "CHANGE TRIGGERED" badge.

**Guided ChangeSelector** — The modal now has numbered steps: (1) "What's changing?" and (2) "How significant is this change?". Step 2 fades out until step 1 is completed (progressive disclosure). Category descriptions are plain English first ("Small tweak, still within the already-approved range"), with filing type as a small label below ("Annual Report"). An explainer paragraph explains why the category matters.

**Simulation Legend** — Collapsible "Reading the simulation" panel appears in the top-left of the canvas during simulation. Uses grid layout (80px badge column + description column) for clean alignment. Explains: severity levels in plain English, what animated dashed edges mean, what the trigger badge means.

**CascadeEdge softened** — strokeWidth stays 1.5, dash pattern 6 6, animation speed 1s, opacity 60%.

**SimulationPanel "Filing:" line** — Each impact card shows the regulatory action from the cascade rule (e.g., "CBE-30 supplement required per 21 CFR 314.70(c)").

**NodeIcon** — Added icons for Specification (clipboard-check), Stability Protocol (clock), Raw Material (cube).

**React Flow Controls** — Moved to top-right so they don't get hidden behind the graph on large canvases.

**Landing page** — Updated "Trace" walkthrough step to show badge-on-node pattern. Updated "Simulate" step to mention category picker. Stats updated: 11 document types, 36 cascade rules, 3 change categories.

## Current state

- App builds and deploys to Vercel on push to main
- All changes are on `main` branch
- No tests, no test runner, no CI — pure demo
- Vercel deployment is live and current

## Key UX decisions

| Decision | Why |
|----------|-----|
| Badge-only severity (no node recoloring) | Flynn tested it and couldn't tell what node types were anymore — recoloring destroyed identity |
| Plain-English category descriptions | Flynn got stuck on "SUPAC", "CBE-30", "PAS" — jargon without context is useless for non-GxP people |
| Progressive disclosure on category picker | Without numbered steps, it wasn't obvious that change + category are two independent choices |
| Simulation legend at top-left | Bottom-positioned UI gets hidden on large graphs — users have to scroll to find controls |
| Zoom controls at top-right | Same reason — always visible regardless of graph size |

## What could be done next

- Add a pre-simulation legend or tooltip on the static edges explaining what connections mean (Flynn noted the graph is confusing even before simulation)
- Consider adding the Raw Material node type to the CAR-T template (type exists but isn't used in template yet)
- The legend could potentially show before simulation too, with a simpler "what the graph shows" explanation
- Export could include change category and regulatory actions in the markdown output
- The landing page stats could link to anchor sections explaining each number
