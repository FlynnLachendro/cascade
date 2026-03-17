import { NodeType, Severity, ChangeCategory, type CascadeRule } from "@/types";

export const CASCADE_RULES: CascadeRule[] = [
  // ── PROCESS_STEP → SOP ──
  {
    sourceType: NodeType.PROCESS_STEP,
    targetType: NodeType.SOP,
    category: ChangeCategory.MINOR,
    severity: Severity.MEDIUM,
    regulatoryAction: "Annual Report notification per 21 CFR 314.70(d)",
    reason: "Minor parameter adjustment requires SOP revision to reflect updated operating range.",
  },
  {
    sourceType: NodeType.PROCESS_STEP,
    targetType: NodeType.SOP,
    category: ChangeCategory.MODERATE,
    severity: Severity.HIGH,
    regulatoryAction: "CBE-30 supplement required per 21 CFR 314.70(c)",
    reason: "Moderate process change requires SOP revision and effectiveness check before next production run.",
  },
  {
    sourceType: NodeType.PROCESS_STEP,
    targetType: NodeType.SOP,
    category: ChangeCategory.MAJOR,
    severity: Severity.CRITICAL,
    regulatoryAction: "PAS required per 21 CFR 314.70(b) — production hold until approved",
    reason: "Major process change requires full SOP rewrite, effectiveness verification, and regulatory pre-approval.",
  },

  // ── PROCESS_STEP → BATCH_RECORD ──
  {
    sourceType: NodeType.PROCESS_STEP,
    targetType: NodeType.BATCH_RECORD,
    category: ChangeCategory.MINOR,
    severity: Severity.MEDIUM,
    regulatoryAction: "Annual Report notification per 21 CFR 314.70(d)",
    reason: "Batch record template must be updated to reflect adjusted parameter ranges.",
  },
  {
    sourceType: NodeType.PROCESS_STEP,
    targetType: NodeType.BATCH_RECORD,
    category: ChangeCategory.MODERATE,
    severity: Severity.HIGH,
    regulatoryAction: "CBE-30 supplement required per 21 CFR 314.70(c)",
    reason: "Batch record requires revision to capture modified process parameters and in-process controls.",
  },
  {
    sourceType: NodeType.PROCESS_STEP,
    targetType: NodeType.BATCH_RECORD,
    category: ChangeCategory.MAJOR,
    severity: Severity.CRITICAL,
    regulatoryAction: "PAS required per 21 CFR 314.70(b)",
    reason: "Major change necessitates comprehensive batch record redesign with new acceptance criteria.",
  },

  // ── PROCESS_STEP → VALIDATION_PROTOCOL ──
  {
    sourceType: NodeType.PROCESS_STEP,
    targetType: NodeType.VALIDATION_PROTOCOL,
    category: ChangeCategory.MINOR,
    severity: Severity.LOW,
    regulatoryAction: "Document in Annual Report — no revalidation required per SUPAC",
    reason: "Minor change within validated range; risk assessment confirms no revalidation needed.",
  },
  {
    sourceType: NodeType.PROCESS_STEP,
    targetType: NodeType.VALIDATION_PROTOCOL,
    category: ChangeCategory.MODERATE,
    severity: Severity.HIGH,
    regulatoryAction: "Partial revalidation with CBE-30 per 21 CFR 314.70(c)",
    reason: "Moderate CPP change requires partial process revalidation to demonstrate continued control.",
  },
  {
    sourceType: NodeType.PROCESS_STEP,
    targetType: NodeType.VALIDATION_PROTOCOL,
    category: ChangeCategory.MAJOR,
    severity: Severity.CRITICAL,
    regulatoryAction: "Full revalidation required — PAS per 21 CFR 314.70(b)",
    reason: "Major CPP change invalidates existing validation; full 3-lot revalidation required per ICH Q8(R2).",
  },

  // ── PROCESS_STEP → EQUIPMENT_QUALIFICATION ──
  {
    sourceType: NodeType.PROCESS_STEP,
    targetType: NodeType.EQUIPMENT_QUALIFICATION,
    category: ChangeCategory.MINOR,
    severity: Severity.LOW,
    regulatoryAction: "Document in change control — no re-qualification needed",
    reason: "Minor parameter shift remains within equipment qualified operating range.",
  },
  {
    sourceType: NodeType.PROCESS_STEP,
    targetType: NodeType.EQUIPMENT_QUALIFICATION,
    category: ChangeCategory.MODERATE,
    severity: Severity.MEDIUM,
    regulatoryAction: "OQ re-qualification may be required per ICH Q8(R2)",
    reason: "Modified parameters may approach equipment qualification limits; OQ gap assessment required.",
  },
  {
    sourceType: NodeType.PROCESS_STEP,
    targetType: NodeType.EQUIPMENT_QUALIFICATION,
    category: ChangeCategory.MAJOR,
    severity: Severity.HIGH,
    regulatoryAction: "Full IQ/OQ/PQ re-qualification required",
    reason: "Major change exceeds current qualification envelope; complete re-qualification mandatory.",
  },

  // ── PROCESS_STEP → CAPA ──
  {
    sourceType: NodeType.PROCESS_STEP,
    targetType: NodeType.CAPA,
    category: ChangeCategory.MINOR,
    severity: Severity.LOW,
    regulatoryAction: "Change control record per ICH Q10",
    reason: "Minor change tracked through change control system; no corrective action required.",
  },
  {
    sourceType: NodeType.PROCESS_STEP,
    targetType: NodeType.CAPA,
    category: ChangeCategory.MODERATE,
    severity: Severity.MEDIUM,
    regulatoryAction: "CAPA with effectiveness check per ICH Q10",
    reason: "Moderate change requires CAPA tracking with effectiveness verification at 90-day review.",
  },
  {
    sourceType: NodeType.PROCESS_STEP,
    targetType: NodeType.CAPA,
    category: ChangeCategory.MAJOR,
    severity: Severity.HIGH,
    regulatoryAction: "CAPA with extended monitoring per ICH Q10 §3.2.1",
    reason: "Major change requires CAPA with risk assessment, root cause analysis, and extended effectiveness monitoring.",
  },

  // ── PROCESS_STEP → SPECIFICATION ──
  {
    sourceType: NodeType.PROCESS_STEP,
    targetType: NodeType.SPECIFICATION,
    category: ChangeCategory.MINOR,
    severity: Severity.LOW,
    regulatoryAction: "Assess specification impact — Annual Report if change needed",
    reason: "Minor process change; verify product still meets current specifications.",
  },
  {
    sourceType: NodeType.PROCESS_STEP,
    targetType: NodeType.SPECIFICATION,
    category: ChangeCategory.MODERATE,
    severity: Severity.MEDIUM,
    regulatoryAction: "CBE-30 if specification revision needed per 21 CFR 314.70(c)",
    reason: "Moderate change may shift quality attributes; specification review required.",
  },
  {
    sourceType: NodeType.PROCESS_STEP,
    targetType: NodeType.SPECIFICATION,
    category: ChangeCategory.MAJOR,
    severity: Severity.HIGH,
    regulatoryAction: "PAS required if specifications are widened per 21 CFR 314.70(b)",
    reason: "Major process change likely affects product quality attributes; specification revision and regulatory filing required.",
  },

  // ── PROCESS_STEP → STABILITY_PROTOCOL ──
  {
    sourceType: NodeType.PROCESS_STEP,
    targetType: NodeType.STABILITY_PROTOCOL,
    category: ChangeCategory.MINOR,
    severity: Severity.LOW,
    regulatoryAction: "One-batch stability assessment per SUPAC",
    reason: "Minor change; accelerated stability on one batch confirms no impact.",
  },
  {
    sourceType: NodeType.PROCESS_STEP,
    targetType: NodeType.STABILITY_PROTOCOL,
    category: ChangeCategory.MODERATE,
    severity: Severity.MEDIUM,
    regulatoryAction: "3-month accelerated + long-term stability per SUPAC/ICH Q1A",
    reason: "Moderate change requires stability commitment to demonstrate continued shelf-life.",
  },
  {
    sourceType: NodeType.PROCESS_STEP,
    targetType: NodeType.STABILITY_PROTOCOL,
    category: ChangeCategory.MAJOR,
    severity: Severity.HIGH,
    regulatoryAction: "Full stability program per ICH Q1A/Q5C — PAS condition",
    reason: "Major change requires full stability study on 3 commercial-scale batches.",
  },

  // ── SOP → TRAINING_RECORD ──
  {
    sourceType: NodeType.SOP,
    targetType: NodeType.TRAINING_RECORD,
    category: ChangeCategory.MINOR,
    severity: Severity.MEDIUM,
    regulatoryAction: "Read-and-understand retraining per 21 CFR 211.25",
    reason: "SOP revision requires all certified personnel to complete read-and-understand training.",
  },
  {
    sourceType: NodeType.SOP,
    targetType: NodeType.TRAINING_RECORD,
    category: ChangeCategory.MODERATE,
    severity: Severity.HIGH,
    regulatoryAction: "Hands-on retraining with competency assessment per 21 CFR 211.25",
    reason: "Significant SOP revision requires hands-on retraining with demonstrated competency before performing the task.",
  },
  {
    sourceType: NodeType.SOP,
    targetType: NodeType.TRAINING_RECORD,
    category: ChangeCategory.MAJOR,
    severity: Severity.CRITICAL,
    regulatoryAction: "Full requalification of all operators per 21 CFR 211.25",
    reason: "Major SOP rewrite requires complete operator requalification including practical assessment.",
  },

  // ── VALIDATION_PROTOCOL → REGULATORY_SUBMISSION ──
  {
    sourceType: NodeType.VALIDATION_PROTOCOL,
    targetType: NodeType.REGULATORY_SUBMISSION,
    category: ChangeCategory.MINOR,
    severity: Severity.LOW,
    regulatoryAction: "Annual Report per 21 CFR 314.70(d)",
    reason: "Validation risk assessment documented; no CMC filing impact.",
  },
  {
    sourceType: NodeType.VALIDATION_PROTOCOL,
    targetType: NodeType.REGULATORY_SUBMISSION,
    category: ChangeCategory.MODERATE,
    severity: Severity.HIGH,
    regulatoryAction: "CBE-30 supplement with updated CMC data per 21 CFR 314.70(c)",
    reason: "Revalidation data must be submitted to regulatory agency within 30 days.",
  },
  {
    sourceType: NodeType.VALIDATION_PROTOCOL,
    targetType: NodeType.REGULATORY_SUBMISSION,
    category: ChangeCategory.MAJOR,
    severity: Severity.CRITICAL,
    regulatoryAction: "PAS with complete revalidation package per 21 CFR 314.70(b)",
    reason: "Full revalidation triggers prior approval supplement; production hold until agency approval.",
  },

  // ── BATCH_RECORD → REGULATORY_SUBMISSION ──
  {
    sourceType: NodeType.BATCH_RECORD,
    targetType: NodeType.REGULATORY_SUBMISSION,
    category: ChangeCategory.MINOR,
    severity: Severity.LOW,
    regulatoryAction: "Annual Report per 21 CFR 314.70(d)",
    reason: "Minor batch record formatting change; document in annual report.",
  },
  {
    sourceType: NodeType.BATCH_RECORD,
    targetType: NodeType.REGULATORY_SUBMISSION,
    category: ChangeCategory.MODERATE,
    severity: Severity.MEDIUM,
    regulatoryAction: "CBE-30 if acceptance criteria changed per 21 CFR 314.70(c)",
    reason: "Updated batch record parameters may affect filed CMC information.",
  },
  {
    sourceType: NodeType.BATCH_RECORD,
    targetType: NodeType.REGULATORY_SUBMISSION,
    category: ChangeCategory.MAJOR,
    severity: Severity.HIGH,
    regulatoryAction: "PAS required per 21 CFR 314.70(b)",
    reason: "Comprehensive batch record redesign impacts filed CMC sections.",
  },

  // ── EQUIPMENT_QUALIFICATION → VALIDATION_PROTOCOL ──
  {
    sourceType: NodeType.EQUIPMENT_QUALIFICATION,
    targetType: NodeType.VALIDATION_PROTOCOL,
    category: ChangeCategory.MINOR,
    severity: Severity.LOW,
    regulatoryAction: "Document in change control — no revalidation impact",
    reason: "Equipment re-qualification within existing envelope; validation status unaffected.",
  },
  {
    sourceType: NodeType.EQUIPMENT_QUALIFICATION,
    targetType: NodeType.VALIDATION_PROTOCOL,
    category: ChangeCategory.MODERATE,
    severity: Severity.MEDIUM,
    regulatoryAction: "Validation impact assessment required per ICH Q8(R2)",
    reason: "Equipment qualification changes may affect process validation status.",
  },
  {
    sourceType: NodeType.EQUIPMENT_QUALIFICATION,
    targetType: NodeType.VALIDATION_PROTOCOL,
    category: ChangeCategory.MAJOR,
    severity: Severity.HIGH,
    regulatoryAction: "Supplemental validation required",
    reason: "Major equipment change requires supplemental process validation activities.",
  },

  // ── SPECIFICATION → REGULATORY_SUBMISSION ──
  {
    sourceType: NodeType.SPECIFICATION,
    targetType: NodeType.REGULATORY_SUBMISSION,
    category: ChangeCategory.MINOR,
    severity: Severity.LOW,
    regulatoryAction: "Annual Report per 21 CFR 314.70(d)",
    reason: "Specification tightening within approved limits; report in annual filing.",
  },
  {
    sourceType: NodeType.SPECIFICATION,
    targetType: NodeType.REGULATORY_SUBMISSION,
    category: ChangeCategory.MODERATE,
    severity: Severity.HIGH,
    regulatoryAction: "CBE-30 supplement per 21 CFR 314.70(c)",
    reason: "Specification revision requires updated CMC filing within 30 days.",
  },
  {
    sourceType: NodeType.SPECIFICATION,
    targetType: NodeType.REGULATORY_SUBMISSION,
    category: ChangeCategory.MAJOR,
    severity: Severity.CRITICAL,
    regulatoryAction: "PAS required per 21 CFR 314.70(b)",
    reason: "Specification widening beyond approved limits requires prior approval.",
  },
];

export function findApplicableRule(
  sourceType: NodeType,
  targetType: NodeType,
  category: ChangeCategory = ChangeCategory.MODERATE
): CascadeRule | undefined {
  return CASCADE_RULES.find(
    (rule) =>
      rule.sourceType === sourceType &&
      rule.targetType === targetType &&
      rule.category === category
  );
}
