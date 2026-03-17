import { SYSTEM_PROMPT, buildImpactPrompt } from "./prompt";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!;
const MODEL = "google/gemini-2.0-flash-001";

interface ImpactAnalysis {
  explanation: string;
  regulationReference: string;
  recommendedAction: string;
  severityJustification: string;
}

export async function analyzeImpact(params: {
  changeDescription: string;
  changeCategory: string;
  regulatoryAction: string;
  triggerNodeLabel: string;
  triggerNodeType: string;
  impactedNodeLabel: string;
  impactedNodeType: string;
  severity: string;
  ruleReason: string;
}): Promise<ImpactAnalysis> {
  const userPrompt = buildImpactPrompt(params);

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "https://cascade.dev",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.3,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenRouter API error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || "";

  try {
    // Strip any markdown code fences if present
    const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    return JSON.parse(cleaned) as ImpactAnalysis;
  } catch {
    return {
      explanation: content,
      regulationReference: "See applicable GxP regulations",
      recommendedAction: "Review and assess impact per quality system procedures",
      severityJustification: "Severity assigned based on cascade rule mapping",
    };
  }
}
