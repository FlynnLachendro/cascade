import { NodeType, Severity, type CascadeRule } from "@/types";

export const CASCADE_RULES: CascadeRule[] = [
  {
    sourceType: NodeType.PROCESS_STEP,
    targetType: NodeType.SOP,
    severity: Severity.HIGH,
    reason: "SOP must reflect current process parameters. Any change to a process step requires the governing SOP to be revised.",
  },
  {
    sourceType: NodeType.PROCESS_STEP,
    targetType: NodeType.BATCH_RECORD,
    severity: Severity.HIGH,
    reason: "Batch record templates must match the current approved process. Parameter changes require template updates before the next production run.",
  },
  {
    sourceType: NodeType.PROCESS_STEP,
    targetType: NodeType.VALIDATION_PROTOCOL,
    severity: Severity.CRITICAL,
    reason: "A change to a critical process parameter (CPP) requires process revalidation to demonstrate the modified process consistently produces acceptable results.",
  },
  {
    sourceType: NodeType.PROCESS_STEP,
    targetType: NodeType.EQUIPMENT_QUALIFICATION,
    severity: Severity.MEDIUM,
    reason: "Process parameter changes may affect equipment operating ranges, potentially requiring operational re-qualification (OQ).",
  },
  {
    sourceType: NodeType.SOP,
    targetType: NodeType.TRAINING_RECORD,
    severity: Severity.HIGH,
    reason: "When an SOP is revised, all personnel certified on that procedure must complete retraining before performing the task.",
  },
  {
    sourceType: NodeType.SOP,
    targetType: NodeType.CAPA,
    severity: Severity.MEDIUM,
    reason: "Process changes must be tracked through the CAPA system to ensure proper change control and prevent recurrence of any associated issues.",
  },
  {
    sourceType: NodeType.VALIDATION_PROTOCOL,
    targetType: NodeType.REGULATORY_SUBMISSION,
    severity: Severity.CRITICAL,
    reason: "Changes to validated processes that affect the CMC (Chemistry, Manufacturing, and Controls) section may require regulatory filing amendments.",
  },
  {
    sourceType: NodeType.BATCH_RECORD,
    targetType: NodeType.REGULATORY_SUBMISSION,
    severity: Severity.MEDIUM,
    reason: "Updated batch record formats may affect information referenced in regulatory filings.",
  },
  {
    sourceType: NodeType.EQUIPMENT_QUALIFICATION,
    targetType: NodeType.VALIDATION_PROTOCOL,
    severity: Severity.MEDIUM,
    reason: "Equipment qualification changes may impact process validation status, potentially requiring supplemental validation activities.",
  },
];

export function findApplicableRule(
  sourceType: NodeType,
  targetType: NodeType
): CascadeRule | undefined {
  return CASCADE_RULES.find(
    (rule) => rule.sourceType === sourceType && rule.targetType === targetType
  );
}
