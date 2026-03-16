export enum NodeType {
  PROCESS_STEP = "process_step",
  SOP = "sop",
  TRAINING_RECORD = "training_record",
  BATCH_RECORD = "batch_record",
  EQUIPMENT_QUALIFICATION = "equipment_qualification",
  VALIDATION_PROTOCOL = "validation_protocol",
  CAPA = "capa",
  REGULATORY_SUBMISSION = "regulatory_submission",
}

export enum Severity {
  CRITICAL = "critical",
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
  TRIGGER = "trigger",
}

export interface NodeConfig {
  type: NodeType;
  label: string;
  color: string;
  borderColor: string;
  icon: string;
  description: string;
}

export interface WorkflowNode {
  id: string;
  workflowId: string;
  type: NodeType;
  label: string;
  description: string;
  positionX: number;
  positionY: number;
  metadata: Record<string, unknown>;
}

export interface WorkflowEdge {
  id: string;
  workflowId: string;
  sourceNodeId: string;
  targetNodeId: string;
  relationship: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  createdAt: string;
  updatedAt: string;
}

export interface CascadeRule {
  sourceType: NodeType;
  targetType: NodeType;
  severity: Severity;
  reason: string;
}

export interface SimulationImpact {
  id: string;
  nodeId: string;
  severity: Severity;
  aiExplanation: string;
  regulationReference: string;
  recommendedAction: string;
}

export interface Simulation {
  id: string;
  workflowId: string;
  triggerNodeId: string;
  changeDescription: string;
  impacts: SimulationImpact[];
  createdAt: string;
}

export interface PredefinedChange {
  id: string;
  label: string;
  description: string;
}

export const NODE_CONFIGS: Record<NodeType, NodeConfig> = {
  [NodeType.PROCESS_STEP]: {
    type: NodeType.PROCESS_STEP,
    label: "Process Step",
    color: "#ffffff",
    borderColor: "#1a3a6b",
    icon: "◆",
    description: "A manufacturing process operation",
  },
  [NodeType.SOP]: {
    type: NodeType.SOP,
    label: "SOP",
    color: "#ffffff",
    borderColor: "#2d5a3d",
    icon: "▪",
    description: "Standard Operating Procedure",
  },
  [NodeType.TRAINING_RECORD]: {
    type: NodeType.TRAINING_RECORD,
    label: "Training Record",
    color: "#ffffff",
    borderColor: "#6b5b2d",
    icon: "▪",
    description: "Personnel training certification",
  },
  [NodeType.BATCH_RECORD]: {
    type: NodeType.BATCH_RECORD,
    label: "Batch Record",
    color: "#ffffff",
    borderColor: "#4a3d6b",
    icon: "▪",
    description: "Batch production documentation",
  },
  [NodeType.EQUIPMENT_QUALIFICATION]: {
    type: NodeType.EQUIPMENT_QUALIFICATION,
    label: "Equipment Qual.",
    color: "#ffffff",
    borderColor: "#5a4a2d",
    icon: "▪",
    description: "Equipment IQ/OQ/PQ qualification",
  },
  [NodeType.VALIDATION_PROTOCOL]: {
    type: NodeType.VALIDATION_PROTOCOL,
    label: "Validation Protocol",
    color: "#ffffff",
    borderColor: "#6b2d3d",
    icon: "▪",
    description: "Process validation documentation",
  },
  [NodeType.CAPA]: {
    type: NodeType.CAPA,
    label: "CAPA",
    color: "#ffffff",
    borderColor: "#2d4a5a",
    icon: "▪",
    description: "Corrective and Preventive Action",
  },
  [NodeType.REGULATORY_SUBMISSION]: {
    type: NodeType.REGULATORY_SUBMISSION,
    label: "Regulatory Submission",
    color: "#ffffff",
    borderColor: "#3d2d5a",
    icon: "▪",
    description: "Regulatory filing documentation",
  },
};

export const SEVERITY_COLORS: Record<Severity, { bg: string; border: string; text: string; badge: string }> = {
  [Severity.CRITICAL]: {
    bg: "#faf6f6",
    border: "#9b2c2c",
    text: "#9b2c2c",
    badge: "bg-[#9b2c2c] text-white",
  },
  [Severity.HIGH]: {
    bg: "#faf7f5",
    border: "#c4553a",
    text: "#c4553a",
    badge: "bg-[#c4553a] text-white",
  },
  [Severity.MEDIUM]: {
    bg: "#faf9f4",
    border: "#b8860b",
    text: "#b8860b",
    badge: "bg-[#b8860b] text-white",
  },
  [Severity.LOW]: {
    bg: "#f6faf7",
    border: "#2e7d5b",
    text: "#2e7d5b",
    badge: "bg-[#2e7d5b] text-white",
  },
  [Severity.TRIGGER]: {
    bg: "#f0f3f8",
    border: "#1a3a6b",
    text: "#1a3a6b",
    badge: "bg-[#1a3a6b] text-white",
  },
};
