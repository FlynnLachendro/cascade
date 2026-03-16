"use client";

import { type Node } from "@xyflow/react";
import { NODE_CONFIGS, type NodeType } from "@/types";
import type { GxPNodeData } from "../graph/nodes/GxPNode";

interface NodeEditorPanelProps {
  node: Node | null;
  onUpdate: (updates: Partial<GxPNodeData>) => void;
  onClose: () => void;
}

export function NodeEditorPanel({ node, onUpdate, onClose }: NodeEditorPanelProps) {
  if (!node) return null;

  const data = node.data as GxPNodeData;
  const config = NODE_CONFIGS[data.nodeType as NodeType];

  return (
    <div className="fixed bottom-4 left-1/2 z-40 w-full max-w-sm -translate-x-1/2 rounded-xl border border-[#e2e6ea] bg-white p-4 shadow-lg">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">{config.icon}</span>
          <span
            className="text-[10px] font-medium uppercase tracking-wider"
            style={{ color: config.borderColor }}
          >
            {config.label}
          </span>
        </div>
        <button
          onClick={onClose}
          className="rounded-md p-1 text-[#8b95a5] transition-colors hover:bg-[#f4f5f7] hover:text-[#5a6577]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-[11px] font-medium text-[#5a6577]">Name</label>
          <input
            type="text"
            value={data.label}
            onChange={(e) => onUpdate({ label: e.target.value })}
            className="mt-1 w-full rounded-md border border-[#e2e6ea] px-2.5 py-1.5 text-sm text-[#1a2332] focus:border-[#1a3a6b] focus:outline-none focus:ring-1 focus:ring-[#1a3a6b]"
          />
        </div>
        <div>
          <label className="text-[11px] font-medium text-[#5a6577]">Description</label>
          <textarea
            value={data.description || ""}
            onChange={(e) => onUpdate({ description: e.target.value })}
            rows={2}
            className="mt-1 w-full resize-none rounded-md border border-[#e2e6ea] px-2.5 py-1.5 text-sm text-[#1a2332] placeholder:text-[#8b95a5] focus:border-[#1a3a6b] focus:outline-none focus:ring-1 focus:ring-[#1a3a6b]"
            placeholder="Add a description..."
          />
        </div>
      </div>
    </div>
  );
}
