"use client";

import { type Node, type Edge } from "@xyflow/react";
import { CascadeCanvas } from "@/components/graph/CascadeCanvas";
import type { NodeType } from "@/types";

interface WorkflowData {
  id: string;
  name: string;
  description: string;
  nodes: Array<{
    id: string;
    type: NodeType;
    label: string;
    description: string;
    positionX: number;
    positionY: number;
  }>;
  edges: Array<{
    id: string;
    sourceNodeId: string;
    targetNodeId: string;
  }>;
}

export function SharedWorkflowClient({ workflow }: { workflow: WorkflowData }) {
  const nodes: Node[] = workflow.nodes.map((n) => ({
    id: n.id,
    type: "gxp",
    position: { x: n.positionX, y: n.positionY },
    data: {
      label: n.label,
      description: n.description,
      nodeType: n.type,
    },
  }));

  const edges: Edge[] = workflow.edges.map((e) => ({
    id: e.id,
    source: e.sourceNodeId,
    target: e.targetNodeId,
    type: "cascade",
    data: {},
  }));

  return (
    <div className="flex h-screen flex-col bg-white">
      <header className="flex h-12 items-center justify-between border-b border-slate-200 px-4">
        <div className="flex items-center gap-3">
          <a href="/" className="text-sm font-bold tracking-tight text-slate-900">
            Cascade
          </a>
          <span className="text-slate-300">|</span>
          <span className="text-sm text-slate-500">{workflow.name}</span>
        </div>
        <a
          href="/editor"
          className="rounded-lg bg-slate-900 px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-slate-800"
        >
          Build Your Own
        </a>
      </header>
      <div className="flex-1">
        <CascadeCanvas
          initialNodes={nodes}
          initialEdges={edges}
          workflowName={workflow.name}
          workflowId={workflow.id}
        />
      </div>
    </div>
  );
}
