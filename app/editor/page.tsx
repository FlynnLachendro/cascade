"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState, useCallback, useRef } from "react";
import { type Node, type Edge } from "@xyflow/react";
import { CascadeCanvas } from "@/components/graph/CascadeCanvas";
import { getTemplate } from "@/lib/templates/car-t-manufacturing";
import { gql } from "@apollo/client";
import { getApolloClient } from "@/lib/graphql/client";
import type { GxPNodeData } from "@/components/graph/nodes/GxPNode";

const SAVE_WORKFLOW = gql`
  mutation SaveWorkflow(
    $id: ID!
    $name: String!
    $description: String
    $nodes: [NodeInput!]!
    $edges: [EdgeInput!]!
  ) {
    saveWorkflow(
      id: $id
      name: $name
      description: $description
      nodes: $nodes
      edges: $edges
    ) {
      id
    }
  }
`;

function EditorContent() {
  const searchParams = useSearchParams();
  const loadTemplate = searchParams.get("template") === "car-t";
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const canvasStateRef = useRef<{ nodes: Node[]; edges: Edge[] } | null>(null);

  const { initialNodes, initialEdges, workflowName } = useMemo(() => {
    if (loadTemplate) {
      const template = getTemplate();
      const nodes: Node[] = template.nodes.map((n) => ({
        id: n.id,
        type: "gxp",
        position: { x: n.positionX, y: n.positionY },
        data: {
          label: n.label,
          description: n.description,
          nodeType: n.type,
        },
      }));
      const edges: Edge[] = template.edges.map((e) => ({
        id: e.id,
        source: e.sourceNodeId,
        target: e.targetNodeId,
        type: "cascade",
        data: {},
      }));
      return {
        initialNodes: nodes,
        initialEdges: edges,
        workflowName: template.name,
      };
    }
    return { initialNodes: [], initialEdges: [], workflowName: "Untitled Workflow" };
  }, [loadTemplate]);

  const handleShare = useCallback(async () => {
    const state = canvasStateRef.current;
    const currentNodes = state?.nodes || initialNodes;
    const currentEdges = state?.edges || initialEdges;

    if (currentNodes.length === 0) return;

    setSaving(true);
    try {
      const client = getApolloClient();
      const id = crypto.randomUUID();

      const nodesPayload = currentNodes.map((n) => {
        const data = n.data as GxPNodeData;
        return {
          id: n.id,
          type: data.nodeType,
          label: data.label,
          description: data.description || "",
          positionX: n.position.x,
          positionY: n.position.y,
          metadata: {},
        };
      });

      const edgesPayload = currentEdges.map((e) => ({
        id: e.id,
        sourceNodeId: e.source,
        targetNodeId: e.target,
        relationship: "",
      }));

      await client.mutate({
        mutation: SAVE_WORKFLOW,
        variables: {
          id,
          name: workflowName,
          description: "",
          nodes: nodesPayload,
          edges: edgesPayload,
        },
      });

      const url = `${window.location.origin}/w/${id}`;
      setShareUrl(url);
      await navigator.clipboard.writeText(url);
    } catch (err) {
      console.error("Failed to save workflow:", err);
    } finally {
      setSaving(false);
    }
  }, [initialNodes, initialEdges, workflowName]);

  return (
    <div className="flex h-screen flex-col bg-white">
      {/* Header bar */}
      <header className="flex h-12 items-center justify-between border-b border-slate-200 px-4">
        <div className="flex items-center gap-3">
          <a href="/" className="text-sm font-bold tracking-tight text-slate-900">
            Cascade
          </a>
          <span className="text-slate-300">|</span>
          <span className="text-sm text-slate-500">{workflowName}</span>
        </div>
        <div className="flex items-center gap-2">
          {shareUrl && (
            <span className="text-xs text-green-600">Link copied!</span>
          )}
          <button
            onClick={handleShare}
            disabled={saving}
            className="rounded-lg bg-slate-900 px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-slate-800 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Share"}
          </button>
        </div>
      </header>

      {/* Canvas */}
      <div className="flex-1">
        <CascadeCanvas
          initialNodes={initialNodes}
          initialEdges={initialEdges}
          workflowName={workflowName}
          stateRef={canvasStateRef}
        />
      </div>
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <p className="text-sm text-slate-400">Loading editor...</p>
        </div>
      }
    >
      <EditorContent />
    </Suspense>
  );
}
