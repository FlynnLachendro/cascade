"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Node,
  type Edge,
  type ReactFlowInstance,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { GxPNode, type GxPNodeData } from "./nodes/GxPNode";
import { CascadeEdge } from "./edges/CascadeEdge";
import { NodeSidebar } from "./NodeSidebar";
import { SimulationPanel, type ImpactCard } from "../panels/SimulationPanel";
import { ChangeSelector } from "../panels/ChangeSelector";
import { NodeEditorPanel } from "../panels/NodeEditorPanel";
import { NodeType, type Severity, type WorkflowNode, type WorkflowEdge, NODE_CONFIGS } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nodeTypes = { gxp: GxPNode } as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const edgeTypes = { cascade: CascadeEdge } as any;

interface CascadeCanvasProps {
  initialNodes?: Node[];
  initialEdges?: Edge[];
  workflowName?: string;
  workflowId?: string;
  stateRef?: React.MutableRefObject<{ nodes: Node[]; edges: Edge[] } | null>;
}

let idCounter = 0;
function generateId() {
  return `node-${Date.now()}-${idCounter++}`;
}

export function CascadeCanvas({
  initialNodes = [],
  initialEdges = [],
  workflowName = "Untitled Workflow",
  workflowId,
  stateRef,
}: CascadeCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Expose current state to parent via ref
  useEffect(() => {
    if (stateRef) {
      stateRef.current = { nodes, edges };
    }
  }, [nodes, edges, stateRef]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance<any> | null>(null);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  // Simulation state
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [showChangeSelector, setShowChangeSelector] = useState(false);
  const [simulationOpen, setSimulationOpen] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [changeDescription, setChangeDescription] = useState("");
  const [triggerLabel, setTriggerLabel] = useState("");
  const [impacts, setImpacts] = useState<ImpactCard[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  // Node editing state
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge({ ...params, type: "cascade", data: {} }, eds)
      );
    },
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow-type") as NodeType;
      if (!type || !rfInstance || !reactFlowWrapper.current) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = rfInstance.screenToFlowPosition({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const config = NODE_CONFIGS[type];
      const newNode: Node<GxPNodeData> = {
        id: generateId(),
        type: "gxp",
        position,
        data: {
          label: `New ${config.label}`,
          description: "",
          nodeType: type,
        },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [rfInstance, setNodes]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      const data = node.data as GxPNodeData;
      if (data.nodeType === NodeType.PROCESS_STEP && !isSimulating) {
        setSelectedNodeId(node.id);
        setShowChangeSelector(true);
        setEditingNodeId(null);
      } else if (!isSimulating) {
        setEditingNodeId(node.id);
        setShowChangeSelector(false);
      }
    },
    [isSimulating]
  );

  const onPaneClick = useCallback(() => {
    if (!isSimulating) {
      setEditingNodeId(null);
    }
  }, [isSimulating]);

  const updateNodeData = useCallback(
    (nodeId: string, updates: Partial<GxPNodeData>) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === nodeId
            ? { ...n, data: { ...n.data, ...updates } }
            : n
        )
      );
    },
    [setNodes]
  );

  const runSimulation = useCallback(
    async (change: { label: string; description: string }) => {
      setShowChangeSelector(false);
      setIsSimulating(true);
      setSimulationOpen(true);
      setSimulationComplete(false);
      setChangeDescription(change.description);
      setImpacts([]);

      const triggerNode = nodes.find((n) => n.id === selectedNodeId);
      if (!triggerNode) return;
      setTriggerLabel((triggerNode.data as GxPNodeData).label);

      // Convert to WorkflowNode/WorkflowEdge format
      const workflowNodes: WorkflowNode[] = nodes.map((n) => ({
        id: n.id,
        workflowId: workflowId || "",
        type: (n.data as GxPNodeData).nodeType,
        label: (n.data as GxPNodeData).label,
        description: (n.data as GxPNodeData).description || "",
        positionX: n.position.x,
        positionY: n.position.y,
        metadata: {},
      }));

      const workflowEdges: WorkflowEdge[] = edges.map((e) => ({
        id: e.id,
        workflowId: workflowId || "",
        sourceNodeId: e.source,
        targetNodeId: e.target,
        relationship: "",
      }));

      try {
        const response = await fetch("/api/simulate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            triggerNodeId: selectedNodeId,
            changeDescription: change.description,
            nodes: workflowNodes,
            edges: workflowEdges,
          }),
        });

        const reader = response.body?.getReader();
        if (!reader) return;

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = JSON.parse(line.slice(6));

            if (data.type === "trigger") {
              setNodes((nds) =>
                nds.map((n) =>
                  n.id === data.nodeId
                    ? {
                        ...n,
                        data: { ...n.data, severity: "trigger" as Severity, isSimulating: true },
                      }
                    : n
                )
              );
            }

            if (data.type === "cascade") {
              setNodes((nds) =>
                nds.map((n) =>
                  n.id === data.nodeId
                    ? {
                        ...n,
                        data: { ...n.data, severity: data.severity as Severity },
                      }
                    : n
                )
              );
              // Animate edges to this node
              setEdges((eds) =>
                eds.map((e) =>
                  e.target === data.nodeId
                    ? { ...e, data: { ...e.data, animated: true } }
                    : e
                )
              );

              const nodeData = nodes.find((n) => n.id === data.nodeId)?.data as GxPNodeData | undefined;
              setImpacts((prev) => [
                ...prev,
                {
                  nodeId: data.nodeId,
                  nodeLabel: nodeData?.label || "Unknown",
                  severity: data.severity,
                  loading: true,
                },
              ]);
            }

            if (data.type === "analysis") {
              setImpacts((prev) =>
                prev.map((imp) =>
                  imp.nodeId === data.nodeId
                    ? {
                        ...imp,
                        explanation: data.explanation,
                        regulationReference: data.regulationReference,
                        recommendedAction: data.recommendedAction,
                        severityJustification: data.severityJustification,
                        loading: false,
                      }
                    : imp
                )
              );
            }

            if (data.type === "analysis_error") {
              setImpacts((prev) =>
                prev.map((imp) =>
                  imp.nodeId === data.nodeId
                    ? { ...imp, error: data.error, loading: false }
                    : imp
                )
              );
            }

            if (data.type === "complete") {
              setSimulationComplete(true);
              setIsSimulating(false);
              // Stop trigger node pulse
              setNodes((nds) =>
                nds.map((n) =>
                  n.id === selectedNodeId
                    ? { ...n, data: { ...n.data, isSimulating: false } }
                    : n
                )
              );
            }
          }
        }
      } catch {
        setSimulationComplete(true);
        setIsSimulating(false);
      }
    },
    [nodes, edges, selectedNodeId, workflowId, setNodes, setEdges]
  );

  const clearSimulation = useCallback(() => {
    setSimulationOpen(false);
    setSimulationComplete(false);
    setImpacts([]);
    setSelectedNodeId(null);
    setChangeDescription("");
    setIsSimulating(false);

    // Reset node severities
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        data: { ...n.data, severity: null, isSimulating: false },
      }))
    );

    // Reset edge animations
    setEdges((eds) =>
      eds.map((e) => ({
        ...e,
        data: { ...e.data, animated: false },
      }))
    );
  }, [setNodes, setEdges]);

  const exportMarkdown = useCallback(() => {
    const lines: string[] = [
      `# Cascade Impact Analysis Report`,
      ``,
      `**Workflow:** ${workflowName}`,
      `**Date:** ${new Date().toISOString().split("T")[0]}`,
      `**Change:** ${changeDescription}`,
      `**Trigger Node:** ${triggerLabel}`,
      ``,
      `---`,
      ``,
      `## Impacted Nodes`,
      ``,
    ];

    for (const impact of impacts) {
      lines.push(`### ${impact.nodeLabel}`);
      lines.push(`**Severity:** ${impact.severity.toUpperCase()}`);
      if (impact.explanation) {
        lines.push(`\n${impact.explanation}`);
      }
      if (impact.regulationReference) {
        lines.push(`\n**Regulation:** ${impact.regulationReference}`);
      }
      if (impact.recommendedAction) {
        lines.push(`\n**Recommended Action:** ${impact.recommendedAction}`);
      }
      lines.push(``);
      lines.push(`---`);
      lines.push(``);
    }

    lines.push(`*Generated by Cascade — GxP Change Impact Analyzer*`);

    const blob = new Blob([lines.join("\n")], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cascade-report-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }, [workflowName, changeDescription, triggerLabel, impacts]);

  return (
    <div className="flex h-full">
      <NodeSidebar />

      <div className="relative flex-1" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setRfInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          defaultEdgeOptions={{ type: "cascade" }}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          deleteKeyCode={["Backspace", "Delete"]}
          className="bg-[#f4f5f7]"
        >
          <Background color="#dde0e4" gap={24} size={1} />
          <Controls
            showInteractive={false}
            className="!border-[#e2e6ea] !bg-white !shadow-sm"
          />
        </ReactFlow>

        {/* Empty state */}
        {nodes.length === 0 && !simulationOpen && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-lg font-semibold text-[#1a2332]/40">
                Drag nodes from the sidebar to get started
              </p>
              <p className="mt-2 text-sm text-[#5a6577]/50">
                Connect them to build your GxP workflow
              </p>
            </div>
          </div>
        )}

        {/* Toolbar */}
        {simulationOpen && (
          <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2">
            <button
              onClick={clearSimulation}
              className="rounded-lg border border-[#e2e6ea] bg-white px-4 py-2 text-sm font-medium text-[#1a2332] shadow-sm transition-colors hover:bg-[#f4f5f7]"
            >
              Clear Simulation
            </button>
          </div>
        )}
      </div>

      <SimulationPanel
        isOpen={simulationOpen}
        changeDescription={changeDescription}
        triggerNodeLabel={triggerLabel}
        impacts={impacts}
        isComplete={simulationComplete}
        onClose={clearSimulation}
        onExport={exportMarkdown}
      />

      <ChangeSelector
        nodeId={selectedNodeId || ""}
        nodeLabel={
          (nodes.find((n) => n.id === selectedNodeId)?.data as GxPNodeData)
            ?.label || ""
        }
        isOpen={showChangeSelector}
        onConfirm={runSimulation}
        onCancel={() => setShowChangeSelector(false)}
      />

      <NodeEditorPanel
        node={editingNodeId ? nodes.find((n) => n.id === editingNodeId) || null : null}
        onUpdate={(updates) => editingNodeId && updateNodeData(editingNodeId, updates)}
        onClose={() => setEditingNodeId(null)}
      />
    </div>
  );
}
