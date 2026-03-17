# Cascade — Master Plan

## Purpose

A hail mary project for Seal (seal.run). Flynn was rejected by CEO Will Moss with the feedback: "as AI becomes better being able to understand how systems work at an abstract level is the most critical skill and I couldn't get to confidence there." This app directly refutes that objection.

Cascade is a GxP Change Impact Analyzer — a tool where users build regulated manufacturing workflows as interactive graphs, then simulate a change to any process step and watch the impact cascade through the entire system. Each impacted node gets an AI-generated explanation citing real regulatory frameworks.

The message to Will: "Hey, I wanted to prove I can think through systems. I built this." No pressure, just proof.

Also serves as a standalone portfolio piece for other regulated-industry roles.

## Timeline

3 days. Ship fast, ship clean.

## Deliverable

- Deployed app on Vercel
- Custom domain (Porkbun — something like cascadegxp.com, usecascade.app, getcascade.dev)
- Shareable workflow URLs (e.g., cascade.dev/w/abc123)
- Clean OG preview card for sharing on cord/LinkedIn

---

## Tech Stack

Deliberately matches Seal's stack to prove Flynn can work in it.

| Layer              | Technology                          |
|--------------------|-------------------------------------|
| Framework          | Next.js 15 (App Router)            |
| Language           | TypeScript (strict)                 |
| Styling            | Tailwind v4 + Shadcn UI            |
| Graph              | @xyflow/react (React Flow)         |
| API Layer          | GraphQL (Apollo Server + Apollo Client) |
| Database           | Turso (LibSQL / SQLite edge)        |
| LLM                | OpenRouter (Gemini 2.0 Flash)       |
| Streaming          | Web Streams API (ReadableStream) via Next.js API routes |
| Package Manager    | pnpm                                |
| Deployment         | Vercel                              |

### Why These Choices

- **Next.js** — API routes + React + Vercel deployment in one. No separate backend.
- **GraphQL** — Seal uses it. Flynn hasn't used it before. Building with it shows willingness to learn their stack.
- **Apollo Server/Client** — Most common Node.js GraphQL setup. Runs inside Next.js API route.
- **React Flow** — Already used successfully in Arbor. Proven for interactive node graphs.
- **Turso** — Free SQLite-at-the-edge database. Own project, own DB, no Supabase Pro upgrade needed. Works on Vercel serverless via LibSQL client.
- **Gemini 2.0 Flash via OpenRouter** — Same LLM pattern as Arbor and Lattice. Fast, cheap, good enough for regulatory explanations.

---

## Project Structure

```
Cascade/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── editor/page.tsx             # Main graph editor (blank canvas)
│   ├── w/[id]/page.tsx             # Shared workflow view (loaded from DB)
│   └── api/
│       ├── graphql/route.ts        # GraphQL endpoint (Apollo Server)
│       └── simulate/route.ts       # SSE streaming endpoint for cascade simulation
├── components/
│   ├── graph/
│   │   ├── CascadeCanvas.tsx       # React Flow canvas wrapper
│   │   ├── nodes/                  # Custom node components per type
│   │   │   ├── ProcessStepNode.tsx
│   │   │   ├── SOPNode.tsx
│   │   │   ├── TrainingRecordNode.tsx
│   │   │   ├── BatchRecordNode.tsx
│   │   │   ├── EquipmentQualNode.tsx
│   │   │   ├── ValidationProtocolNode.tsx
│   │   │   ├── CAPANode.tsx
│   │   │   └── RegulatorySubmissionNode.tsx
│   │   ├── edges/
│   │   │   └── CascadeEdge.tsx     # Animated edge for cascade visualization
│   │   └── NodeSidebar.tsx         # Draggable node type palette
│   ├── panels/
│   │   ├── NodeEditorPanel.tsx     # Edit node details (name, description, regulatory ref)
│   │   ├── SimulationPanel.tsx     # Right panel — streamed AI impact explanations
│   │   └── ChangeSelector.tsx      # Pre-defined change selection + confirmation modal
│   ├── landing/
│   │   ├── Hero.tsx                # Hero section with CTAs
│   │   ├── HowItWorks.tsx          # 3-step explanation
│   │   └── Footer.tsx              # Built by Flynn Lachendro
│   ├── mobile/
│   │   └── MobileBlock.tsx         # "Desktop only" message for mobile visitors
│   └── ui/                         # Shadcn components
├── lib/
│   ├── cascade/
│   │   ├── rules.ts                # Cascade rules engine (severity logic)
│   │   ├── types.ts                # CascadeRule, Impact, Severity types
│   │   └── simulate.ts             # Run cascade traversal on graph
│   ├── graphql/
│   │   ├── schema.ts               # GraphQL type definitions
│   │   ├── resolvers.ts            # Query/Mutation resolvers
│   │   └── client.ts               # Apollo Client setup
│   ├── db/
│   │   ├── client.ts               # Turso/LibSQL client init
│   │   └── queries.ts              # DB operations (save/load workflows, simulations)
│   ├── ai/
│   │   ├── prompt.ts               # System prompt + regulatory context for LLM
│   │   └── stream.ts               # OpenRouter streaming call
│   └── templates/
│       └── car-t-manufacturing.ts  # Pre-built CAR-T template (nodes + edges + changes)
├── types/
│   └── index.ts                    # Shared TypeScript types
├── public/
│   └── og.png                      # OG preview image
├── .env.local                      # OPENROUTER_API_KEY, TURSO_DATABASE_URL, TURSO_AUTH_TOKEN
└── next.config.ts
```

---

## Database Schema (Turso / SQLite)

### Table: `workflows`

| Column       | Type     | Notes                              |
|-------------|----------|-------------------------------------|
| id          | text (PK)| UUID generated in application      |
| name        | text     | Workflow name                       |
| description | text     | Optional description                |
| created_at  | text     | ISO 8601 timestamp                  |
| updated_at  | text     | ISO 8601 timestamp                  |

### Table: `nodes`

| Column      | Type     | Notes                              |
|------------|----------|-------------------------------------|
| id         | text (PK)| UUID generated in application      |
| workflow_id| text (FK)| References workflows.id            |
| type       | text     | Node type enum value                |
| label      | text     | Display name                        |
| description| text     | Node description                    |
| position_x | real     | Canvas X position                   |
| position_y | real     | Canvas Y position                   |
| metadata   | text     | JSON string (flexible config)       |

### Table: `edges`

| Column          | Type     | Notes                              |
|----------------|----------|-------------------------------------|
| id             | text (PK)| UUID generated in application      |
| workflow_id    | text (FK)| References workflows.id            |
| source_node_id | text (FK)| References nodes.id                |
| target_node_id | text (FK)| References nodes.id                |
| relationship   | text     | e.g., "governs", "requires", "references" |

### Table: `simulations`

| Column            | Type     | Notes                           |
|------------------|----------|----------------------------------|
| id               | text (PK)| UUID generated in application   |
| workflow_id      | text (FK)| References workflows.id         |
| trigger_node_id  | text     | The node the change was made to |
| change_description| text    | What was changed                 |
| created_at       | text     | ISO 8601 timestamp               |

### Table: `simulation_impacts`

| Column              | Type     | Notes                           |
|---------------------|----------|----------------------------------|
| id                  | text (PK)| UUID generated in application   |
| simulation_id       | text (FK)| References simulations.id       |
| node_id             | text     | References nodes.id             |
| severity            | text     | critical / high / medium / low  |
| ai_explanation      | text     | LLM-generated explanation       |
| regulation_reference| text     | e.g., "21 CFR 211.186"         |
| recommended_action  | text     | What to do about it             |

No auth — public demo app.

---

## Node Types (TypeScript Enum)

```typescript
enum NodeType {
  PROCESS_STEP = "process_step",
  SOP = "sop",
  TRAINING_RECORD = "training_record",
  BATCH_RECORD = "batch_record",
  EQUIPMENT_QUALIFICATION = "equipment_qualification",
  VALIDATION_PROTOCOL = "validation_protocol",
  CAPA = "capa",
  REGULATORY_SUBMISSION = "regulatory_submission",
  SPECIFICATION = "specification",
  STABILITY_PROTOCOL = "stability_protocol",
  RAW_MATERIAL = "raw_material",
}

enum ChangeCategory {
  MINOR = "minor",
  MODERATE = "moderate",
  MAJOR = "major",
}
```

Each type has:
- Display name
- Color (matching Seal's navy/white/green palette — type colors stay constant during simulation)
- Icon (SVG in NodeIcon.tsx)
- Description template
- Cascade rules (category-aware: Minor/Moderate/Major produce different severities per source→target pair)

---

## Cascade Rules Engine

Hardcoded rules config (~36 rules). When a node is impacted, the engine looks at all outgoing edges and applies severity rules based on (source type, target type, change category). Each rule includes a `regulatoryAction` string specifying the required FDA filing type.

### Rules Structure

Each rule maps `(sourceType, targetType, category)` → `(severity, regulatoryAction, reason)`.

Example for PROCESS_STEP → SOP:
| Category | Severity | Regulatory Action |
|----------|----------|-------------------|
| Minor | Medium | Annual Report per 21 CFR 314.70(d) |
| Moderate | High | CBE-30 supplement per 21 CFR 314.70(c) |
| Major | Critical | PAS per 21 CFR 314.70(b) — production hold |

Coverage: PROCESS_STEP → SOP, BATCH_RECORD, VALIDATION_PROTOCOL, EQUIPMENT_QUALIFICATION, CAPA, SPECIFICATION, STABILITY_PROTOCOL. SOP → TRAINING_RECORD. VALIDATION_PROTOCOL → REGULATORY_SUBMISSION. BATCH_RECORD → REGULATORY_SUBMISSION. EQUIPMENT_QUALIFICATION → VALIDATION_PROTOCOL. SPECIFICATION → REGULATORY_SUBMISSION.

### Cascade Algorithm

1. Mark trigger node as impacted (severity: "trigger")
2. BFS traversal from trigger node following outgoing edges
3. For each connected node, look up rule for (source.type, target.type, changeCategory)
4. If rule exists, mark node as impacted with that severity + regulatoryAction
5. Continue traversal from newly impacted nodes
6. Prevent cycles (don't revisit nodes)
7. Return ordered list of impacted nodes with severities and regulatory actions

### AI Explanation Layer

For each impacted node, send to Gemini 2.0 Flash via OpenRouter:

**Input:**
- The change description (e.g., "Changing cell washing temperature from 4°C to 8°C")
- The trigger node details
- The impacted node details
- The cascade rule that was triggered
- The severity level
- Relevant regulatory frameworks as context

**Output (structured JSON):**
- `explanation`: 2-3 sentences explaining why this node is impacted in plain language
- `regulation_reference`: Specific regulation citation (e.g., "21 CFR 211.186")
- `recommended_action`: What should be done (e.g., "Initiate SOP revision workflow")
- `severity_justification`: Why this severity level applies

**Regulatory Context Fed to LLM:**
- 21 CFR 314.70 — Supplements and other changes to an approved NDA (PAS, CBE-30, Annual Report)
- 21 CFR 211.186 — Master production and control records
- 21 CFR 211.68 — Automatic, mechanical, and electronic equipment
- 21 CFR 211.25 — Personnel qualifications and training
- 21 CFR 210/211 — Current Good Manufacturing Practice (cGMP)
- SUPAC — Scale-Up and Post-Approval Changes (change categories)
- ICH Q12 — Lifecycle Management (Established Conditions)
- ICH Q10 — Pharmaceutical Quality System (change management, CAPA)
- ICH Q9 — Quality Risk Management
- ICH Q8(R2) — Pharmaceutical Development (Design Space, CPPs, CQAs, PAR)
- ICH Q1A/Q5C — Stability testing requirements

---

## Pre-Built Template: CAR-T Cell Therapy Manufacturing

### Process Steps (Trigger-Capable Nodes)

**1. Cell Washing**
- Pre-defined changes:
  - "Change washing temperature (4°C → 8°C)"
  - "Change centrifugation speed (300g → 400g)"
  - "Substitute washing buffer supplier"

**2. Cell Expansion**
- Pre-defined changes:
  - "Extend culture duration (9 days → 12 days)"
  - "Change media formulation"

**3. Cryopreservation**
- Pre-defined changes:
  - "Change cryoprotectant concentration"
  - "Modify controlled-rate freezing profile"

### Supporting Nodes

- **SPEC-001:** Product Specification (in-process and release specs)
- **STAB-005:** Stability Protocol (ICH Q5C for cryopreserved product)
- **SOP-0042:** Cell Washing Procedure
- **SOP-0051:** Cell Expansion Protocol
- **SOP-0067:** Cryopreservation Procedure
- **TR-OPA:** Operator A Training Record
- **TR-OPB:** Operator B Training Record
- **TR-OPC:** Operator C Training Record
- **BT-2024-001:** Batch Record Template (Manufacturing)
- **VP-015:** Process Validation Protocol
- **EQ-009:** Centrifuge Operational Qualification
- **EQ-014:** Controlled-Rate Freezer Qualification
- **CAPA-2024-031:** Change Tracking CAPA
- **IND-2024-0012 §3.2.S.2:** Regulatory Submission (CMC Section)

### Template Graph Layout

Top-to-bottom tree layout. Specification + Stability Protocol at y=-200 above process steps. Process steps at the top row, downstream impacts flowing down. 17 nodes, 28 edges.

---

## User Experience Flow

### Landing Page

1. Hero section:
   - Headline: "See how one change ripples through your entire GxP system"
   - Subline: One sentence explaining the tool
   - CTA 1: "Try the demo" → loads pre-built CAR-T template in editor
   - CTA 2: "Build your own" → blank canvas editor
2. "How it works" section:
   - Step 1: Build your workflow (or load a template)
   - Step 2: Simulate a change to any process step
   - Step 3: Watch the impact cascade with AI-powered regulatory analysis
   - Written in professional biomedical/scientific tone
3. Footer: "Built by Flynn Lachendro" with subtle links

### Graph Editor

1. **Left sidebar:** Draggable node type palette — 11 node types with icons and labels. Drag onto canvas to create.
2. **Canvas (center):** React Flow graph. Click nodes to select, drag to move, drag handles between nodes to connect. Top-to-bottom layout.
3. **Node editing:** Click a node → editor panel appears (inline or modal) to set name, description, regulatory references.
4. **Edge creation:** Drag from source handle to target handle. Edge labeled with relationship type.
5. **Simulate Change button:** Appears when a Process Step node is selected. Click → ChangeSelector modal with pre-defined options (for template) or free-text (for custom). Confirmation step, then fires.

### Cascade Simulation

1. User selects a change + change category (Minor/Moderate/Major) via guided ChangeSelector
2. Trigger node gets "CHANGE TRIGGERED" badge (type colors preserved)
3. Edges animate outward (subtle dashed lines, 60% opacity, 1s speed)
4. Connected nodes get severity badges below a divider + subtle ring outline in severity color. Node type colors/borders stay constant — identity preserved:
   - Critical: deep red badge
   - High: red/orange badge
   - Medium: amber badge
   - Low: green badge
5. "Reading the simulation" legend panel appears top-left explaining badges, edges, and trigger
6. Right panel (SimulationPanel) slides in and streams AI explanations:
   - Each impacted node appears as a card
   - Cards stream in progressively as the LLM responds
   - Each card shows: node name, severity tag, explanation, regulation citation, "Filing:" line with regulatory action, recommended action
7. Animation is paced to feel deliberate (not instant), similar to Arbor's streaming UX

### Reset & Export

- "Clear simulation" button resets all nodes to default state
- One simulation at a time (simple)
- "Share" button saves workflow + simulation to DB, generates shareable URL
- "Export" button downloads simulation results as a markdown file

### Mobile

- Static "Desktop only" page for mobile visitors, similar to Arbor's approach

---

## Design Language

### Aesthetic

Matches Seal's visual identity but elevated — cleaner, more polished, less clunky.

- **Palette:** Dark navy (#0f172a range), white, green accent (Seal's brand green). Severity colors for cascade states.
- **Typography:** Clean sans-serif. Inter or similar.
- **Nodes:** Flat cards with colored left border (like Arbor). Icon + label + type tag. No gradients.
- **Edges:** Clean lines, animated dashes during cascade.
- **Panels:** Slide-in from right for simulation results. Clean card layout with streaming content.
- **Overall feel:** Professional, scientific, minimal. Feels like a real product feature, not a toy demo.

### OG Preview Card

- Title: "Cascade — GxP Change Impact Analyzer"
- Description: "See how one change ripples through your entire regulated workflow"
- Clean, minimal preview image (no logo, just typography on brand-color background)

---

## GraphQL Schema (Overview)

### Types

```graphql
type Workflow {
  id: ID!
  name: String!
  description: String
  nodes: [Node!]!
  edges: [Edge!]!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Node {
  id: ID!
  workflowId: ID!
  type: NodeType!
  label: String!
  description: String
  positionX: Float!
  positionY: Float!
  metadata: JSON
}

type Edge {
  id: ID!
  workflowId: ID!
  sourceNodeId: ID!
  targetNodeId: ID!
  relationship: String!
}

type Simulation {
  id: ID!
  workflowId: ID!
  triggerNodeId: ID!
  changeDescription: String!
  impacts: [SimulationImpact!]!
  createdAt: DateTime!
}

type SimulationImpact {
  id: ID!
  nodeId: ID!
  severity: Severity!
  aiExplanation: String!
  regulationReference: String!
  recommendedAction: String!
}
```

### Queries

```graphql
workflow(id: ID!): Workflow
simulation(id: ID!): Simulation
```

### Mutations

```graphql
createWorkflow(name: String!, description: String): Workflow!
saveWorkflow(id: ID!, nodes: [NodeInput!]!, edges: [EdgeInput!]!): Workflow!
deleteWorkflow(id: ID!): Boolean!
saveSimulation(workflowId: ID!, triggerNodeId: ID!, changeDescription: String!, impacts: [SimulationImpactInput!]!): Simulation!
```

### Note on Streaming

The cascade simulation with AI streaming does NOT go through GraphQL — it uses a separate SSE endpoint at `/api/simulate` since GraphQL subscriptions add complexity we don't need. GraphQL handles CRUD, SSE handles the real-time cascade.

---

## Environment Variables

```
TURSO_DATABASE_URL=            # libsql://your-db-name-your-org.turso.io
TURSO_AUTH_TOKEN=              # Turso auth token
OPENROUTER_API_KEY=
NEXT_PUBLIC_APP_URL=           # For shareable URLs and OG tags
```

---

## Deployment

- **Vercel:** Connect GitHub repo, auto-deploy from main
- **Custom domain:** Porkbun DNS → Vercel
- **Turso:** Free tier database (create at turso.tech, run migration)
- **No CI/CD, no tests, no analytics, no error tracking** — pure demo

---

## What This Proves to Will

1. **Systems thinking:** The entire app IS systems thinking — modeling dependencies, understanding cascading impacts, reasoning about regulatory interconnections
2. **Abstract understanding:** Built a tool FOR reasoning about systems at an abstract level, not just one hardcoded demo
3. **Their stack:** TypeScript, React, Node.js, GraphQL, PostgreSQL — all present
4. **Domain knowledge:** Real regulatory frameworks (21 CFR 314.70, SUPAC, ICH Q12, ICH Q8(R2)), real manufacturing scenarios (CAR-T), real GxP change control concepts (PAS/CBE-30/Annual Report, CPPs, CQAs)
5. **AI integration:** Practical, purposeful AI — not a gimmick, but regulatory reasoning that actually helps
6. **Shipping speed:** Built and deployed in 3 days as a solo dev
7. **Product sense:** Landing page, shareable URLs, export, clean UX — not just a tech demo but a product

---

## Message to Will

Tone: Confident but no pressure. Something like:

> Hey Will, really enjoyed meeting too. Your feedback about systems thinking stuck with me — so I built something. It's a GxP change impact analyzer that models how a single process change cascades through an entire regulated workflow (SOPs, training, validation, regulatory submissions). Built it in your stack.
>
> [cascade URL]
>
> No pressure at all — just wanted to show how I think about these problems. Best, Flynn

---

## User Stories & PRD (Playwright-Testable Flows)

Every flow below is written as a step-by-step sequence with expected outcomes. These double as the Playwright QA test plan — each flow maps to a test that can be automated with `browser_navigate`, `browser_click`, `browser_snapshot`, and assertions.

---

### Flow 1: Landing Page — First Visit

**Precondition:** User navigates to the app root URL.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1.1 | Navigate to `/` | Landing page loads. Hero section visible with headline "See how one change ripples through your entire GxP system" |
| 1.2 | Scroll down | "How it works" section visible with 3 steps: Build, Simulate, See Impact |
| 1.3 | Scroll to bottom | Footer visible with "Built by Flynn Lachendro" |
| 1.4 | Verify two CTA buttons exist | "Try the demo" button and "Build your own" button both visible in hero section |

---

### Flow 2: Landing Page — Try the Demo

**Precondition:** User is on the landing page.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 2.1 | Click "Try the demo" | Navigates to `/editor` with the pre-built CAR-T Manufacturing template loaded |
| 2.2 | Verify template loaded | Canvas shows ~15 nodes arranged top-to-bottom. Three process step nodes visible at top: "Cell Washing", "Cell Expansion", "Cryopreservation" |
| 2.3 | Verify supporting nodes | SOP nodes, Training Record nodes, Batch Record, Validation Protocol, Equipment Qualification, CAPA, and Regulatory Submission nodes all visible below process steps |
| 2.4 | Verify edges | Edges connect process steps to their downstream dependencies. Lines visible between connected nodes |
| 2.5 | Verify left sidebar | Node type palette visible on the left with 8 draggable node types |
| 2.6 | Verify right panel | Simulation panel is NOT visible (no simulation running yet) |

---

### Flow 3: Landing Page — Build Your Own

**Precondition:** User is on the landing page.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 3.1 | Click "Build your own" | Navigates to `/editor` with a blank canvas |
| 3.2 | Verify empty canvas | No nodes or edges on the canvas. Left sidebar with node palette visible |
| 3.3 | Verify canvas is interactive | Canvas can be panned (click + drag on background) and zoomed (scroll wheel) |

---

### Flow 4: Graph Editor — Adding Nodes via Drag and Drop

**Precondition:** User is in the editor (blank canvas or template).

| Step | Action | Expected Result |
|------|--------|-----------------|
| 4.1 | Locate node palette in left sidebar | 8 node types listed: Process Step, SOP, Training Record, Batch Record, Equipment Qualification, Validation Protocol, CAPA, Regulatory Submission. Each has an icon and label |
| 4.2 | Drag "Process Step" from palette onto canvas | A new Process Step node appears on the canvas at the drop position. Node has default label (e.g., "New Process Step"), colored left border matching the Process Step type color, and type icon |
| 4.3 | Drag "SOP" from palette onto canvas | A new SOP node appears on the canvas. Styled differently from Process Step (different color border, different icon) |
| 4.4 | Drag additional node types | Each creates a node with the correct type-specific styling |

---

### Flow 5: Graph Editor — Editing a Node

**Precondition:** At least one node exists on the canvas.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 5.1 | Click on a node | Node becomes selected (visual highlight/outline). Node editor panel appears (inline or as a side panel) |
| 5.2 | Edit the node label | Text input for label is editable. Type a new name (e.g., "Cell Washing"). Node label updates on the canvas in real time |
| 5.3 | Edit the node description | Text input/textarea for description is editable. Type a description (e.g., "Washing step at 4°C using PBS buffer") |
| 5.4 | Close/deselect the node | Click on canvas background. Editor panel closes. Node retains the edited label and description |

---

### Flow 6: Graph Editor — Connecting Nodes with Edges

**Precondition:** At least two nodes exist on the canvas.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 6.1 | Hover over a node | Connection handles (small circles) appear on the node edges (top, bottom, or sides) |
| 6.2 | Drag from a source node's handle toward a target node | A temporary edge line follows the cursor |
| 6.3 | Drop on the target node's handle | A permanent edge is created between the two nodes. Edge line visible connecting them |
| 6.4 | Verify edge | Edge is drawn with a clean line from source to target |

---

### Flow 7: Graph Editor — Deleting Nodes and Edges

**Precondition:** Nodes and edges exist on the canvas.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 7.1 | Select a node and press Backspace/Delete | Node is removed from canvas. All edges connected to that node are also removed |
| 7.2 | Click on an edge to select it | Edge becomes highlighted |
| 7.3 | Press Backspace/Delete | Edge is removed. Nodes it connected remain |

---

### Flow 8: Triggering a Cascade Simulation (Template)

**Precondition:** CAR-T template is loaded in the editor.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 8.1 | Click on the "Cell Washing" process step node | Node becomes selected. A "Simulate Change" button appears (on the node, in a toolbar, or in the editor panel) |
| 8.2 | Click "Simulate Change" | A modal/dialog appears showing pre-defined change options for this node: "Change washing temperature (4°C → 8°C)", "Change centrifugation speed (300g → 400g)", "Substitute washing buffer supplier" |
| 8.3 | Select "Change washing temperature (4°C → 8°C)" | Option becomes selected/highlighted |
| 8.4 | Click confirmation button (e.g., "Run Simulation") | Modal closes. Cascade simulation begins |
| 8.5 | Observe trigger node | "Cell Washing" node pulses or glows to indicate it's the trigger |
| 8.6 | Observe edge animation | Edges flowing out from "Cell Washing" animate (dashed lines flowing outward) |
| 8.7 | Observe downstream nodes | Connected nodes light up one by one with severity colors. SOP-0042 lights up (High — red/orange border). Training Records light up (High). Batch Record lights up (High). Validation Protocol lights up (Critical — deep red). Equipment Qualification lights up (Medium — amber). These cascade further: CAPA lights up from SOP. Regulatory Submission lights up from Validation Protocol |
| 8.8 | Observe right panel | Simulation panel slides in from the right. Impact cards stream in progressively, one per impacted node. Each card shows: node name, severity badge (colored), AI-generated explanation (2-3 sentences), regulation citation (e.g., "21 CFR 211.186"), and recommended action |
| 8.9 | Verify streaming order | Cards appear in cascade order (BFS traversal order): SOP first, then Training Records + Batch Record, then Validation Protocol + Equipment Qualification, then CAPA, then Regulatory Submission |
| 8.10 | Verify all impacts shown | The right panel shows impact cards for all nodes that were lit up on the graph. Count matches |

---

### Flow 9: Cascade Simulation — Different Process Steps

**Precondition:** CAR-T template loaded, no active simulation.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 9.1 | Click "Cell Expansion" process step | "Simulate Change" button appears |
| 9.2 | Click "Simulate Change" | Modal shows Cell Expansion-specific changes: "Extend culture duration (9 days → 12 days)", "Change media formulation" |
| 9.3 | Select "Extend culture duration" and confirm | Cascade runs. Nodes connected to Cell Expansion light up. Different pattern than Cell Washing cascade (different SOPs, potentially different downstream nodes impacted) |
| 9.4 | Repeat for "Cryopreservation" | Different change options shown. Different cascade pattern. Each process step has its own impact footprint |

---

### Flow 10: Clearing a Simulation

**Precondition:** A cascade simulation has been run. Nodes are colored, right panel is showing impacts.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 10.1 | Locate "Clear simulation" button | Button visible in toolbar or right panel header |
| 10.2 | Click "Clear simulation" | All node severity colors reset to default. Edge animations stop. Right panel closes or clears its content. Canvas returns to pre-simulation state |
| 10.3 | Verify nodes are editable again | Can click nodes, edit them, add new nodes. Full editor functionality restored |

---

### Flow 11: Saving and Sharing a Workflow

**Precondition:** User has built or modified a workflow (with or without a simulation).

| Step | Action | Expected Result |
|------|--------|-----------------|
| 11.1 | Locate "Share" button | Button visible in toolbar/header |
| 11.2 | Click "Share" | Workflow is saved to Turso DB. A shareable URL is generated (e.g., `cascade.dev/w/abc123`). URL is displayed in a modal/toast with a "Copy" button |
| 11.3 | Click "Copy" | URL copied to clipboard. Visual confirmation (toast or button text change) |
| 11.4 | Open the shareable URL in a new tab | The workflow loads with all nodes, edges, and positions exactly as saved. If a simulation was run before sharing, the simulation results are also visible |

---

### Flow 12: Loading a Shared Workflow

**Precondition:** A workflow has been saved and a shareable URL exists.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 12.1 | Navigate to `/w/[id]` (shareable URL) | Page loads. The saved workflow is displayed on the canvas with all nodes, edges, and positions |
| 12.2 | Verify interactivity | User can interact with the loaded workflow: click nodes, run simulations, make edits |
| 12.3 | Navigate to a non-existent `/w/invalid-id` | Graceful error state shown (e.g., "Workflow not found" message with a link back to the landing page) |

---

### Flow 13: Exporting Simulation Results as Markdown

**Precondition:** A cascade simulation has been run and impacts are visible in the right panel.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 13.1 | Locate "Export" button | Button visible in the simulation panel or toolbar |
| 13.2 | Click "Export" | Browser downloads a `.md` file |
| 13.3 | Verify file contents | Markdown file contains: workflow name, simulation date, change description, trigger node details, and a section for each impacted node with severity, explanation, regulation reference, and recommended action. Well-formatted and readable |

---

### Flow 14: Building a Custom Workflow End-to-End

**Precondition:** User clicked "Build your own" from landing page. Blank canvas.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 14.1 | Drag a "Process Step" node onto canvas | Node appears. Click to edit. Set label to "Mixing" |
| 14.2 | Drag an "SOP" node onto canvas | Node appears. Click to edit. Set label to "SOP-001: Mixing Procedure" |
| 14.3 | Connect Process Step → SOP | Drag edge from "Mixing" to "SOP-001". Edge created |
| 14.4 | Drag a "Training Record" node | Set label to "TR-001: Operator Training" |
| 14.5 | Connect SOP → Training Record | Edge created |
| 14.6 | Click "Mixing" process step | "Simulate Change" button appears |
| 14.7 | Click "Simulate Change" | For custom nodes (not template), a free-text input appears to describe the change (e.g., "Change mixing speed from 200 RPM to 350 RPM") |
| 14.8 | Type change description and confirm | Cascade runs: "Mixing" pulses → "SOP-001" lights up (High) → "TR-001" lights up (High). Right panel streams AI explanations for each |
| 14.9 | Click "Share" | Workflow saved, shareable URL generated |

---

### Flow 15: Mobile Visitor

**Precondition:** User visits the app from a mobile device (viewport < 768px).

| Step | Action | Expected Result |
|------|--------|-----------------|
| 15.1 | Navigate to any URL on mobile | A static "desktop only" page is shown. Message like "Cascade is built for desktop. Please visit on a larger screen." No graph editor, no landing page content |

---

### Flow 16: Error Handling — AI Generation Failure

**Precondition:** Cascade simulation is triggered but OpenRouter/Gemini fails or times out.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 16.1 | Trigger a cascade simulation | Cascade begins, nodes start lighting up |
| 16.2 | AI call fails for one or more nodes | The impacted nodes still light up with correct severity colors (cascade rules are local, not AI-dependent). In the right panel, failed cards show a clean error message: "AI analysis unavailable — please refresh and try again" |
| 16.3 | Graph remains functional | User can still clear the simulation, edit nodes, and retry |

---

### Flow 17: OG Preview Card

**Precondition:** The app is deployed with meta tags.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 17.1 | Share the app URL on cord/Slack/LinkedIn | Preview card renders with: title "Cascade — GxP Change Impact Analyzer", description "See how one change ripples through your entire regulated workflow", and a clean preview image |

---

### Edge Cases & Guards

| Case | Expected Behavior |
|------|-------------------|
| User tries to simulate change on a non-Process Step node | "Simulate Change" button does NOT appear. Only Process Step nodes are trigger-capable |
| User creates a cycle in edges (A → B → A) | Cascade engine prevents infinite loops (visited-node check in BFS). Each node is only impacted once |
| User runs simulation with no edges from trigger node | Trigger node pulses but no cascade occurs. Right panel shows "No downstream dependencies found" |
| Canvas is empty and user clicks "Share" | Prompt user to add nodes first, or disable "Share" button when canvas is empty |
| User creates edge between two identical node types | Allowed — cascade rules still apply based on source/target types |
| Very large graph (20+ nodes) | Canvas remains performant. React Flow handles this natively. Simulation streams without blocking UI |

---

### Playwright Test Mapping

Each flow above maps to a Playwright test:

```
Flow 1  → test_landing_page_elements
Flow 2  → test_try_demo_loads_template
Flow 3  → test_build_your_own_blank_canvas
Flow 4  → test_drag_drop_nodes
Flow 5  → test_edit_node_details
Flow 6  → test_connect_nodes_with_edges
Flow 7  → test_delete_nodes_and_edges
Flow 8  → test_cascade_simulation_full (critical path)
Flow 9  → test_different_process_step_simulations
Flow 10 → test_clear_simulation
Flow 11 → test_save_and_share_workflow
Flow 12 → test_load_shared_workflow
Flow 13 → test_export_markdown
Flow 14 → test_custom_workflow_end_to_end
Flow 15 → test_mobile_block_page
Flow 16 → test_ai_failure_graceful
Flow 17 → test_og_meta_tags (verify meta tags in DOM)
```

**Priority for QA:** Flows 1, 2, 8, 11, 12, 14 are the critical path. If Will clicks the link, loads the demo, runs a simulation, shares it, and it all works — that's the win.
