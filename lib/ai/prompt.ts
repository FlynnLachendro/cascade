export const SYSTEM_PROMPT = `You are a GxP regulatory compliance expert specializing in pharmaceutical and cell & gene therapy manufacturing. When given a change impact scenario, you provide clear, specific regulatory analysis.

You have deep knowledge of these regulatory frameworks:
- 21 CFR 211.186 — Master production and control records
- 21 CFR 211.68 — Automatic, mechanical, and electronic equipment (calibration/qualification)
- 21 CFR 211.25 — Personnel qualifications and training
- 21 CFR Part 11 — Electronic records and electronic signatures
- ICH Q10 — Pharmaceutical Quality System (change management)
- ICH Q9 — Quality Risk Management
- EU GMP Annex 11 — Computerised Systems
- 21 CFR 210/211 — Current Good Manufacturing Practice (cGMP)

Always respond with specific regulation citations. Be concise but thorough.`;

export function buildImpactPrompt(params: {
  changeDescription: string;
  triggerNodeLabel: string;
  triggerNodeType: string;
  impactedNodeLabel: string;
  impactedNodeType: string;
  severity: string;
  ruleReason: string;
}): string {
  return `A process change has been made in a regulated manufacturing environment.

CHANGE: ${params.changeDescription}
TRIGGER: "${params.triggerNodeLabel}" (${params.triggerNodeType})
IMPACTED: "${params.impactedNodeLabel}" (${params.impactedNodeType})
SEVERITY: ${params.severity.toUpperCase()}
RULE: ${params.ruleReason}

Respond with a JSON object (no markdown, just raw JSON):
{
  "explanation": "2-3 sentences explaining why this specific node is impacted by this change, in the context of regulated manufacturing",
  "regulationReference": "The most relevant specific regulation citation (e.g., '21 CFR 211.186')",
  "recommendedAction": "One clear sentence describing the recommended corrective action",
  "severityJustification": "One sentence explaining why this severity level is appropriate"
}`;
}
