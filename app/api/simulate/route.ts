import { NextRequest } from "next/server";
import { runCascade } from "@/lib/cascade/simulate";
import { analyzeImpact } from "@/lib/ai/stream";
import { NODE_CONFIGS } from "@/types";
import type { WorkflowNode, WorkflowEdge } from "@/types";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    triggerNodeId,
    changeDescription,
    nodes,
    edges,
  }: {
    triggerNodeId: string;
    changeDescription: string;
    nodes: WorkflowNode[];
    edges: WorkflowEdge[];
  } = body;

  const triggerNode = nodes.find((n) => n.id === triggerNodeId);
  if (!triggerNode) {
    return new Response(JSON.stringify({ error: "Trigger node not found" }), {
      status: 400,
    });
  }

  const impacts = runCascade(triggerNodeId, nodes, edges);

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      // Send trigger event
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({
            type: "trigger",
            nodeId: triggerNodeId,
            severity: "trigger",
          })}\n\n`
        )
      );

      // Process each impact
      for (const impact of impacts) {
        // Send cascade event (node lights up)
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              type: "cascade",
              nodeId: impact.nodeId,
              severity: impact.severity,
              order: impact.order,
            })}\n\n`
          )
        );

        // Small delay for visual pacing
        await new Promise((resolve) => setTimeout(resolve, 400));

        // Get AI analysis
        try {
          const analysis = await analyzeImpact({
            changeDescription,
            triggerNodeLabel: triggerNode.label,
            triggerNodeType: NODE_CONFIGS[triggerNode.type].label,
            impactedNodeLabel: impact.node.label,
            impactedNodeType: NODE_CONFIGS[impact.node.type].label,
            severity: impact.severity,
            ruleReason: impact.reason,
          });

          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: "analysis",
                nodeId: impact.nodeId,
                severity: impact.severity,
                explanation: analysis.explanation,
                regulationReference: analysis.regulationReference,
                recommendedAction: analysis.recommendedAction,
                severityJustification: analysis.severityJustification,
              })}\n\n`
            )
          );
        } catch {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: "analysis_error",
                nodeId: impact.nodeId,
                severity: impact.severity,
                error: "AI analysis unavailable — please refresh and try again",
              })}\n\n`
            )
          );
        }
      }

      // Send completion event
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({ type: "complete", totalImpacts: impacts.length })}\n\n`
        )
      );

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
