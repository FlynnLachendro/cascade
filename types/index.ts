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
    color: "#f7f9fb",
    borderColor: "#5b7a9d",
    icon: "◆",
    description: "A manufacturing process operation",
  },
  [NodeType.SOP]: {
    type: NodeType.SOP,
    label: "SOP",
    color: "#f7faf8",
    borderColor: "#6b9080",
    icon: "▪",
    description: "Standard Operating Procedure",
  },
  [NodeType.TRAINING_RECORD]: {
    type: NodeType.TRAINING_RECORD,
    label: "Training Record",
    color: "#faf9f6",
    borderColor: "#a08c5c",
    icon: "▪",
    description: "Personnel training certification",
  },
  [NodeType.BATCH_RECORD]: {
    type: NodeType.BATCH_RECORD,
    label: "Batch Record",
    color: "#f9f8fb",
    borderColor: "#8b7ba8",
    icon: "▪",
    description: "Batch production documentation",
  },
  [NodeType.EQUIPMENT_QUALIFICATION]: {
    type: NodeType.EQUIPMENT_QUALIFICATION,
    label: "Equipment Qual.",
    color: "#faf9f7",
    borderColor: "#b08860",
    icon: "▪",
    description: "Equipment IQ/OQ/PQ qualification",
  },
  [NodeType.VALIDATION_PROTOCOL]: {
    type: NodeType.VALIDATION_PROTOCOL,
    label: "Validation Protocol",
    color: "#faf8f8",
    borderColor: "#9b6b6b",
    icon: "▪",
    description: "Process validation documentation",
  },
  [NodeType.CAPA]: {
    type: NodeType.CAPA,
    label: "CAPA",
    color: "#f7f9fa",
    borderColor: "#6b8fa0",
    icon: "▪",
    description: "Corrective and Preventive Action",
  },
  [NodeType.REGULATORY_SUBMISSION]: {
    type: NodeType.REGULATORY_SUBMISSION,
    label: "Regulatory Submission",
    color: "#f9f8fa",
    borderColor: "#7b6b9b",
    icon: "▪",
    description: "Regulatory filing documentation",
  },
};

export const SEVERITY_COLORS: Record<Severity, { bg: string; border: string; text: string; badge: string }> = {
  [Severity.CRITICAL]: {
    bg: "#faf6f6",
    border: "#9b4d4d",
    text: "#7a3535",
    badge: "bg-red-800/80 text-white",
  },
  [Severity.HIGH]: {
    bg: "#faf8f5",
    border: "#a06838",
    text: "#7a4f28",
    badge: "bg-amber-800/80 text-white",
  },
  [Severity.MEDIUM]: {
    bg: "#faf9f4",
    border: "#8a7530",
    text: "#6b5a24",
    badge: "bg-yellow-800/80 text-white",
  },
  [Severity.LOW]: {
    bg: "#f6faf7",
    border: "#4a7a5a",
    text: "#365a42",
    badge: "bg-green-800/80 text-white",
  },
  [Severity.TRIGGER]: {
    bg: "#f5f8fb",
    border: "#4a6a9a",
    text: "#354d73",
    badge: "bg-slate-700 text-white",
  },
};
