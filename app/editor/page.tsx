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
      <header className="flex h-12 items-center justify-between border-b border-[#e2e6ea] px-4">
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2 text-sm font-bold tracking-tight text-[#1a2332]">
            <img src="/cascade-logo.png" alt="" className="h-7 w-7" />
            Cascade
          </a>
          <span className="text-[#e2e6ea]">|</span>
          <span className="text-sm text-[#5a6577]">{workflowName}</span>
        </div>
        <div className="flex items-center gap-2">
          {shareUrl && (
            <span className="text-xs text-green-600">Link copied!</span>
          )}
          <button
            onClick={handleShare}
            disabled={saving}
            className="rounded-lg bg-[#1a3a6b] px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#152e55] disabled:opacity-50"
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
