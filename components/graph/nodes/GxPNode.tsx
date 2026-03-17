"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { NODE_CONFIGS, SEVERITY_COLORS, NodeType, type Severity } from "@/types";
import { cn } from "@/lib/utils";
import { NodeIcon } from "../NodeIcon";

export interface GxPNodeData {
  label: string;
  description: string;
  nodeType: NodeType;
  severity?: Severity | null;
  isSimulating?: boolean;
  [key: string]: unknown;
}

type GxPNodeType = {
  id: string;
  position: { x: number; y: number };
  data: GxPNodeData;
  selected?: boolean;
  type?: string;
};

function GxPNodeComponent({ data, selected }: NodeProps<GxPNodeType>) {
  const config = NODE_CONFIGS[data.nodeType];
  const severityStyle = data.severity ? SEVERITY_COLORS[data.severity] : null;
  const isProcessStep = data.nodeType === NodeType.PROCESS_STEP;
  const isAffected = data.severity && data.severity !== "trigger";
  const isTrigger = data.severity === "trigger";

  return (
    <div
      className={cn(
        "relative min-w-[180px] max-w-[260px] cursor-default rounded-md border-l-[3px] bg-white px-3 py-2.5 transition-all duration-200 hover:shadow-md",
        selected && "ring-1 ring-[#1a3a6b]/40 ring-offset-1",
        data.isSimulating && "animate-pulse",
        // Subtle ring in severity color for affected nodes — draws the eye without changing the node
        isAffected && "ring-1 ring-offset-1",
        isTrigger && "ring-1 ring-[#1a3a6b]/50 ring-offset-1"
      )}
      style={{
        // Always use type color — never overwrite during simulation
        borderLeftColor: config.borderColor,
        backgroundColor: "#ffffff",
        // Severity ring color (applied via ringColor since Tailwind ring-1 is set above)
        ...(isAffected && severityStyle
          ? { ["--tw-ring-color" as string]: `${severityStyle.border}60` }
          : {}),
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!h-2.5 !w-2.5 !border-2 !border-white !bg-[#c8cdd4]"
      />

      <div className="flex items-start gap-2">
        <NodeIcon type={data.nodeType} className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#5a6577]" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span
              className="text-[10px] font-medium uppercase tracking-wider"
              style={{ color: config.borderColor }}
            >
              {config.label}
            </span>
          </div>
          <p className="mt-0.5 text-sm font-semibold leading-tight text-[#1a2332]">
            {data.label}
          </p>
          {data.description && (
            <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-[#5a6577]">
              {data.description}
            </p>
          )}
        </div>
      </div>

      {/* Severity badge — the primary simulation indicator */}
      {isAffected && severityStyle && (
        <div className="mt-2 border-t border-[#e2e6ea] pt-1.5">
          <span
            className={cn(
              "rounded px-1.5 py-0.5 text-[9px] font-bold uppercase",
              severityStyle.badge
            )}
          >
            {data.severity}
          </span>
        </div>
      )}

      {/* Trigger badge */}
      {isTrigger && (
        <div className="mt-2 border-t border-[#e2e6ea] pt-1.5">
          <span className="rounded bg-[#1a3a6b] px-1.5 py-0.5 text-[9px] font-bold uppercase text-white">
            change triggered
          </span>
        </div>
      )}

      {isProcessStep && !data.severity && (
        <div className="mt-2 border-t border-[#e2e6ea] pt-1.5">
          <span className="text-[10px] font-medium text-[#8b95a5]">
            Click to simulate change →
          </span>
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-2.5 !w-2.5 !border-2 !border-white !bg-[#c8cdd4]"
      />
    </div>
  );
}

export const GxPNode = memo(GxPNodeComponent);
