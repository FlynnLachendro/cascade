import { NodeType } from "@/types";
import type { PredefinedChange } from "@/types";

interface TemplateNode {
  id: string;
  type: NodeType;
  label: string;
  description: string;
  positionX: number;
  positionY: number;
}

interface TemplateEdge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  relationship: string;
}

interface PredefinedChangeSet {
  nodeId: string;
  changes: PredefinedChange[];
}

// ── Nodes ──

const NODES: TemplateNode[] = [
  // Process Steps (top row)
  {
    id: "ps-washing",
    type: NodeType.PROCESS_STEP,
    label: "Cell Washing",
    description: "Washing step at 4°C using PBS buffer with centrifugation at 300g",
    positionX: 100,
    positionY: 0,
  },
  {
    id: "ps-expansion",
    type: NodeType.PROCESS_STEP,
    label: "Cell Expansion",
    description: "9-day culture in complete media with IL-2 supplementation",
    positionX: 450,
    positionY: 0,
  },
  {
    id: "ps-cryo",
    type: NodeType.PROCESS_STEP,
    label: "Cryopreservation",
    description: "Controlled-rate freezing with 10% DMSO cryoprotectant",
    positionX: 800,
    positionY: 0,
  },

  // SOPs (second row)
  {
    id: "sop-washing",
    type: NodeType.SOP,
    label: "SOP-0042: Cell Washing Procedure",
    description: "Standard operating procedure for post-isolation cell washing",
    positionX: 0,
    positionY: 180,
  },
  {
    id: "sop-expansion",
    type: NodeType.SOP,
    label: "SOP-0051: Cell Expansion Protocol",
    description: "Standard operating procedure for T-cell expansion culture",
    positionX: 400,
    positionY: 180,
  },
  {
    id: "sop-cryo",
    type: NodeType.SOP,
    label: "SOP-0067: Cryopreservation Procedure",
    description: "Standard operating procedure for controlled-rate freezing",
    positionX: 780,
    positionY: 180,
  },

  // Training Records (third row)
  {
    id: "tr-a",
    type: NodeType.TRAINING_RECORD,
    label: "TR: Operator A",
    description: "Training certification for Operator A — cell washing & expansion",
    positionX: 0,
    positionY: 360,
  },
  {
    id: "tr-b",
    type: NodeType.TRAINING_RECORD,
    label: "TR: Operator B",
    description: "Training certification for Operator B — all manufacturing steps",
    positionX: 250,
    positionY: 360,
  },
  {
    id: "tr-c",
    type: NodeType.TRAINING_RECORD,
    label: "TR: Operator C",
    description: "Training certification for Operator C — cryopreservation specialist",
    positionX: 750,
    positionY: 360,
  },

  // Batch Record (third row, right)
  {
    id: "br-template",
    type: NodeType.BATCH_RECORD,
    label: "BT-2024-001: Batch Record Template",
    description: "Master batch record template for CAR-T manufacturing",
    positionX: 500,
    positionY: 360,
  },

  // Equipment (fourth row)
  {
    id: "eq-centrifuge",
    type: NodeType.EQUIPMENT_QUALIFICATION,
    label: "EQ-009: Centrifuge OQ",
    description: "Operational qualification for Beckman Coulter Allegra X-30R centrifuge",
    positionX: 0,
    positionY: 540,
  },
  {
    id: "eq-freezer",
    type: NodeType.EQUIPMENT_QUALIFICATION,
    label: "EQ-014: CRF Qualification",
    description: "Operational qualification for controlled-rate freezer",
    positionX: 750,
    positionY: 540,
  },

  // Validation Protocol (fourth row, center)
  {
    id: "vp-process",
    type: NodeType.VALIDATION_PROTOCOL,
    label: "VP-015: Process Validation",
    description: "Process validation protocol for CAR-T cell manufacturing",
    positionX: 350,
    positionY: 540,
  },

  // CAPA (fifth row)
  {
    id: "capa-change",
    type: NodeType.CAPA,
    label: "CAPA-2024-031: Change Tracking",
    description: "Corrective and preventive action for manufacturing process changes",
    positionX: 100,
    positionY: 720,
  },

  // Regulatory Submission (fifth row, right)
  {
    id: "reg-ind",
    type: NodeType.REGULATORY_SUBMISSION,
    label: "IND-2024-0012 §3.2.S.2",
    description: "Investigational New Drug application — CMC section for drug substance",
    positionX: 550,
    positionY: 720,
  },
];

// ── Edges ──

const EDGES: TemplateEdge[] = [
  // Cell Washing connections
  { id: "e-wash-sop", sourceNodeId: "ps-washing", targetNodeId: "sop-washing", relationship: "governed by" },
  { id: "e-wash-br", sourceNodeId: "ps-washing", targetNodeId: "br-template", relationship: "documented in" },
  { id: "e-wash-vp", sourceNodeId: "ps-washing", targetNodeId: "vp-process", relationship: "validated by" },
  { id: "e-wash-eq", sourceNodeId: "ps-washing", targetNodeId: "eq-centrifuge", relationship: "uses" },

  // Cell Expansion connections
  { id: "e-exp-sop", sourceNodeId: "ps-expansion", targetNodeId: "sop-expansion", relationship: "governed by" },
  { id: "e-exp-br", sourceNodeId: "ps-expansion", targetNodeId: "br-template", relationship: "documented in" },
  { id: "e-exp-vp", sourceNodeId: "ps-expansion", targetNodeId: "vp-process", relationship: "validated by" },

  // Cryopreservation connections
  { id: "e-cryo-sop", sourceNodeId: "ps-cryo", targetNodeId: "sop-cryo", relationship: "governed by" },
  { id: "e-cryo-br", sourceNodeId: "ps-cryo", targetNodeId: "br-template", relationship: "documented in" },
  { id: "e-cryo-vp", sourceNodeId: "ps-cryo", targetNodeId: "vp-process", relationship: "validated by" },
  { id: "e-cryo-eq", sourceNodeId: "ps-cryo", targetNodeId: "eq-freezer", relationship: "uses" },

  // SOP → Training Records
  { id: "e-sopw-tra", sourceNodeId: "sop-washing", targetNodeId: "tr-a", relationship: "requires training" },
  { id: "e-sopw-trb", sourceNodeId: "sop-washing", targetNodeId: "tr-b", relationship: "requires training" },
  { id: "e-sope-trb", sourceNodeId: "sop-expansion", targetNodeId: "tr-b", relationship: "requires training" },
  { id: "e-sopc-trc", sourceNodeId: "sop-cryo", targetNodeId: "tr-c", relationship: "requires training" },

  // SOP → CAPA
  { id: "e-sopw-capa", sourceNodeId: "sop-washing", targetNodeId: "capa-change", relationship: "tracked by" },
  { id: "e-sope-capa", sourceNodeId: "sop-expansion", targetNodeId: "capa-change", relationship: "tracked by" },
  { id: "e-sopc-capa", sourceNodeId: "sop-cryo", targetNodeId: "capa-change", relationship: "tracked by" },

  // Validation → Regulatory
  { id: "e-vp-reg", sourceNodeId: "vp-process", targetNodeId: "reg-ind", relationship: "referenced in" },

  // Batch Record → Regulatory
  { id: "e-br-reg", sourceNodeId: "br-template", targetNodeId: "reg-ind", relationship: "referenced in" },

  // Equipment → Validation
  { id: "e-eqc-vp", sourceNodeId: "eq-centrifuge", targetNodeId: "vp-process", relationship: "supports" },
  { id: "e-eqf-vp", sourceNodeId: "eq-freezer", targetNodeId: "vp-process", relationship: "supports" },
];

// ── Pre-defined Changes ──

const PREDEFINED_CHANGES: PredefinedChangeSet[] = [
  {
    nodeId: "ps-washing",
    changes: [
      { id: "wash-temp", label: "Change washing temperature (4°C → 8°C)", description: "Modifying the cell washing temperature from 4°C to 8°C to improve cell recovery" },
      { id: "wash-speed", label: "Change centrifugation speed (300g → 400g)", description: "Increasing centrifugation speed to improve cell pellet formation" },
      { id: "wash-buffer", label: "Substitute washing buffer supplier", description: "Switching PBS buffer supplier from Sigma-Aldrich to Thermo Fisher" },
    ],
  },
  {
    nodeId: "ps-expansion",
    changes: [
      { id: "exp-duration", label: "Extend culture duration (9 → 12 days)", description: "Extending T-cell expansion culture from 9 to 12 days to increase cell yield" },
      { id: "exp-media", label: "Change media formulation", description: "Switching from X-VIVO 15 to OpTmizer complete media for cell expansion" },
    ],
  },
  {
    nodeId: "ps-cryo",
    changes: [
      { id: "cryo-conc", label: "Change cryoprotectant concentration", description: "Reducing DMSO concentration from 10% to 7.5% to decrease post-thaw toxicity" },
      { id: "cryo-profile", label: "Modify controlled-rate freezing profile", description: "Adjusting cooling rate from -1°C/min to -2°C/min in the nucleation phase" },
    ],
  },
];

export function getTemplate() {
  return {
    name: "CAR-T Cell Therapy Manufacturing",
    description: "A representative CAR-T cell therapy manufacturing workflow showing process steps, documentation, training, validation, and regulatory dependencies.",
    nodes: NODES,
    edges: EDGES,
  };
}

export function getPredefinedChanges(nodeId: string): PredefinedChange[] {
  const set = PREDEFINED_CHANGES.find((s) => s.nodeId === nodeId);
  return set?.changes || [];
}

export function isTemplateNode(nodeId: string): boolean {
  return NODES.some((n) => n.id === nodeId);
}
