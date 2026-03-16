import type { WorkflowNode, WorkflowEdge } from "@/types";
import { Severity } from "@/types";
import { findApplicableRule } from "./rules";

export interface CascadeImpact {
  nodeId: string;
  node: WorkflowNode;
  severity: Severity;
  reason: string;
  sourceNodeId: string;
  order: number;
}

export function runCascade(
  triggerNodeId: string,
  nodes: WorkflowNode[],
  edges: WorkflowEdge[]
): CascadeImpact[] {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const triggerNode = nodeMap.get(triggerNodeId);
  if (!triggerNode) return [];

  const impacts: CascadeImpact[] = [];
  const visited = new Set<string>();
  visited.add(triggerNodeId);

  // BFS traversal
  const queue: { nodeId: string; sourceNodeId: string }[] = [];

  // Find all direct connections from trigger
  const outgoing = edges.filter((e) => e.sourceNodeId === triggerNodeId);
  for (const edge of outgoing) {
    queue.push({ nodeId: edge.targetNodeId, sourceNodeId: triggerNodeId });
  }

  let order = 0;

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (visited.has(current.nodeId)) continue;
    visited.add(current.nodeId);

    const currentNode = nodeMap.get(current.nodeId);
    const sourceNode = nodeMap.get(current.sourceNodeId);
    if (!currentNode || !sourceNode) continue;

    const rule = findApplicableRule(sourceNode.type, currentNode.type);
    if (!rule) continue;

    impacts.push({
      nodeId: current.nodeId,
      node: currentNode,
      severity: rule.severity,
      reason: rule.reason,
      sourceNodeId: current.sourceNodeId,
      order: order++,
    });

    // Continue cascade from this node
    const nextEdges = edges.filter((e) => e.sourceNodeId === current.nodeId);
    for (const edge of nextEdges) {
      if (!visited.has(edge.targetNodeId)) {
        queue.push({
          nodeId: edge.targetNodeId,
          sourceNodeId: current.nodeId,
        });
      }
    }
  }

  return impacts;
}
