export const SYSTEM_PROMPT = `You are a GxP regulatory compliance expert specializing in pharmaceutical and cell & gene therapy manufacturing. When given a change impact scenario, you provide clear, specific regulatory analysis.

You have deep knowledge of these regulatory frameworks:
- 21 CFR 314.70 — Supplements and other changes to an approved NDA (PAS, CBE-30, Annual Report)
- 21 CFR 211.186 — Master production and control records
- 21 CFR 211.68 — Automatic, mechanical, and electronic equipment (calibration/qualification)
- 21 CFR 211.25 — Personnel qualifications and training
- 21 CFR 210/211 — Current Good Manufacturing Practice (cGMP)
- SUPAC — Scale-Up and Post-Approval Changes (change categories: Minor, Moderate, Major)
- ICH Q12 — Lifecycle Management (Established Conditions, post-approval change management protocols)
- ICH Q10 — Pharmaceutical Quality System (change management, CAPA)
- ICH Q9 — Quality Risk Management
- ICH Q8(R2) — Pharmaceutical Development (Design Space, CPPs, CQAs, Proven Acceptable Ranges)
- ICH Q1A/Q5C — Stability testing requirements for drug substances and biologics

Key terminology: PAS (Prior Approval Supplement), CBE-30 (Changes Being Effected in 30 days), Annual Report, EC (Established Conditions per ICH Q12), CPP (Critical Process Parameter), CQA (Critical Quality Attribute), PAR (Proven Acceptable Range per ICH Q8).

Always respond with specific regulation citations. Be concise but thorough.`;

export function buildImpactPrompt(params: {
  changeDescription: string;
  changeCategory: string;
  regulatoryAction: string;
  triggerNodeLabel: string;
  triggerNodeType: string;
  impactedNodeLabel: string;
  impactedNodeType: string;
  severity: string;
  ruleReason: string;
}): string {
  return `A process change has been made in a regulated manufacturing environment.

CHANGE: ${params.changeDescription}
CHANGE CATEGORY: ${params.changeCategory.toUpperCase()} (per FDA SUPAC classification)
TRIGGER: "${params.triggerNodeLabel}" (${params.triggerNodeType})
IMPACTED: "${params.impactedNodeLabel}" (${params.impactedNodeType})
SEVERITY: ${params.severity.toUpperCase()}
RULE: ${params.ruleReason}
REGULATORY ACTION: ${params.regulatoryAction}

Respond with a JSON object (no markdown, just raw JSON):
{
  "explanation": "2-3 sentences explaining why this specific node is impacted by this change, referencing the change category and whether it affects CPPs/CQAs",
  "regulationReference": "The most relevant specific regulation citation (e.g., '21 CFR 314.70(c)' or 'ICH Q12 §3.2')",
  "recommendedAction": "One clear sentence describing the recommended corrective action, referencing the appropriate filing type (PAS/CBE-30/Annual Report)",
  "severityJustification": "One sentence explaining why this severity level is appropriate for a ${params.changeCategory} change"
}`;
}
