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
    <div className="flex w-[200px] flex-col border-r border-[#e2e6ea] bg-[#f4f5f7] p-3">
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#8b95a5]">
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
              className="flex cursor-grab items-center gap-2 rounded-md border border-[#e2e6ea] bg-white px-2.5 py-2 text-sm transition-colors hover:border-[#c8cdd4] hover:bg-[#f9fafb] active:cursor-grabbing"
              style={{ borderLeftColor: config.borderColor, borderLeftWidth: 2 }}
            >
              <span className="text-[10px]" style={{ color: "#5a6577" }}>{config.icon}</span>
              <span className="text-xs font-medium text-[#1a2332]">
                {config.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
