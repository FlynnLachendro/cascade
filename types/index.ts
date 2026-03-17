export enum NodeType {
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

export enum ChangeCategory {
  MINOR = "minor",
  MODERATE = "moderate",
  MAJOR = "major",
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
  category: ChangeCategory;
  severity: Severity;
  regulatoryAction: string;
  reason: string;
}

export interface SimulationImpact {
  id: string;
  nodeId: string;
  severity: Severity;
  aiExplanation: string;
  regulationReference: string;
  recommendedAction: string;
  regulatoryAction?: string;
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
  defaultCategory?: ChangeCategory;
}

export const NODE_CONFIGS: Record<NodeType, NodeConfig> = {
  [NodeType.PROCESS_STEP]: {
    type: NodeType.PROCESS_STEP,
    label: "Process Step",
    color: "#e8edf5",
    borderColor: "#2c4a7c",
    icon: "◆",
    description: "A manufacturing process operation",
  },
  [NodeType.SOP]: {
    type: NodeType.SOP,
    label: "SOP",
    color: "#e6f0e8",
    borderColor: "#2e6b45",
    icon: "▪",
    description: "Standard Operating Procedure",
  },
  [NodeType.TRAINING_RECORD]: {
    type: NodeType.TRAINING_RECORD,
    label: "Training Record",
    color: "#f0ebe0",
    borderColor: "#8b6914",
    icon: "▪",
    description: "Personnel training certification",
  },
  [NodeType.BATCH_RECORD]: {
    type: NodeType.BATCH_RECORD,
    label: "Batch Record",
    color: "#eae6f2",
    borderColor: "#5b3d8f",
    icon: "▪",
    description: "Batch production documentation",
  },
  [NodeType.EQUIPMENT_QUALIFICATION]: {
    type: NodeType.EQUIPMENT_QUALIFICATION,
    label: "Equipment Qual.",
    color: "#f0e8e0",
    borderColor: "#9a5b2d",
    icon: "▪",
    description: "Equipment IQ/OQ/PQ qualification",
  },
  [NodeType.VALIDATION_PROTOCOL]: {
    type: NodeType.VALIDATION_PROTOCOL,
    label: "Validation Protocol",
    color: "#f0e4ec",
    borderColor: "#8f3066",
    icon: "▪",
    description: "Process validation documentation",
  },
  [NodeType.CAPA]: {
    type: NodeType.CAPA,
    label: "CAPA",
    color: "#e0eeec",
    borderColor: "#2a7368",
    icon: "▪",
    description: "Corrective and Preventive Action",
  },
  [NodeType.REGULATORY_SUBMISSION]: {
    type: NodeType.REGULATORY_SUBMISSION,
    label: "Regulatory Submission",
    color: "#f0e4e4",
    borderColor: "#943232",
    icon: "▪",
    description: "Regulatory filing documentation",
  },
  [NodeType.SPECIFICATION]: {
    type: NodeType.SPECIFICATION,
    label: "Specification",
    color: "#e4e6f0",
    borderColor: "#3d4a8f",
    icon: "▪",
    description: "Product or process specification",
  },
  [NodeType.STABILITY_PROTOCOL]: {
    type: NodeType.STABILITY_PROTOCOL,
    label: "Stability Protocol",
    color: "#ede4f0",
    borderColor: "#6e3480",
    icon: "▪",
    description: "Stability testing protocol",
  },
  [NodeType.RAW_MATERIAL]: {
    type: NodeType.RAW_MATERIAL,
    label: "Raw Material",
    color: "#e8ede2",
    borderColor: "#4d6b2d",
    icon: "▪",
    description: "Raw material or component specification",
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
