"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { NODE_CONFIGS, SEVERITY_COLORS, NodeType, type Severity } from "@/types";
import { cn } from "@/lib/utils";

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

  return (
    <div
      className={cn(
        "relative min-w-[180px] max-w-[260px] rounded-md border-l-[3px] bg-white px-3 py-2.5 transition-all duration-300",
        selected && "ring-1 ring-slate-400 ring-offset-1",
        data.isSimulating && "animate-pulse"
      )}
      style={{
        borderLeftColor: severityStyle?.border || config.borderColor,
        backgroundColor: severityStyle?.bg || config.color,
        boxShadow: severityStyle
          ? `0 1px 4px ${severityStyle.border}20`
          : "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!h-2.5 !w-2.5 !border-2 !border-white !bg-stone-400"
      />

      <div className="flex items-start gap-2">
        <span className="mt-0.5 text-[10px] leading-none" style={{ color: config.borderColor }}>{config.icon}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span
              className="text-[10px] font-medium uppercase tracking-wider"
              style={{ color: severityStyle?.text || config.borderColor }}
            >
              {config.label}
            </span>
            {data.severity && data.severity !== "trigger" && (
              <span
                className={cn(
                  "rounded px-1 py-0.5 text-[9px] font-bold uppercase",
                  SEVERITY_COLORS[data.severity].badge
                )}
              >
                {data.severity}
              </span>
            )}
            {data.severity === "trigger" && (
              <span className="rounded bg-slate-700 px-1 py-0.5 text-[9px] font-bold uppercase text-white">
                trigger
              </span>
            )}
          </div>
          <p className="mt-0.5 text-sm font-semibold leading-tight text-slate-900">
            {data.label}
          </p>
          {data.description && (
            <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-slate-500">
              {data.description}
            </p>
          )}
        </div>
      </div>

      {isProcessStep && !data.severity && (
        <div className="mt-2 border-t border-slate-100 pt-1.5">
          <span className="text-[10px] font-medium text-slate-400">
            Click to simulate change →
          </span>
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-2.5 !w-2.5 !border-2 !border-white !bg-stone-400"
      />
    </div>
  );
}

export const GxPNode = memo(GxPNodeComponent);
