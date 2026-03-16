"use client";

import { NODE_CONFIGS, NodeType } from "@/types";

const nodeTypes = Object.values(NodeType);

export function NodeSidebar() {
  const onDragStart = (
    event: React.DragEvent,
    nodeType: NodeType
  ) => {
    event.dataTransfer.setData("application/reactflow-type", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="flex w-[200px] flex-col border-r border-slate-200 bg-slate-50/50 p-3">
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        Node Types
      </h3>
      <div className="flex flex-col gap-1.5">
        {nodeTypes.map((type) => {
          const config = NODE_CONFIGS[type];
          return (
            <div
              key={type}
              draggable
              onDragStart={(e) => onDragStart(e, type)}
              className="flex cursor-grab items-center gap-2 rounded-md border border-slate-200 bg-white px-2.5 py-2 text-sm transition-colors hover:border-slate-300 hover:bg-slate-50 active:cursor-grabbing"
              style={{ borderLeftColor: config.borderColor, borderLeftWidth: 3 }}
            >
              <span className="text-sm">{config.icon}</span>
              <span className="text-xs font-medium text-slate-700">
                {config.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
