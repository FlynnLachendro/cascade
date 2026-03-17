"use client";

import { BaseEdge, getSmoothStepPath, type EdgeProps } from "@xyflow/react";

interface CascadeEdgeData {
  animated?: boolean;
  severity?: string;
  [key: string]: unknown;
}

export function CascadeEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps & { data?: CascadeEdgeData }) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 8,
  });

  const isAnimated = data?.animated;

  return (
    <BaseEdge
      id={id}
      path={edgePath}
      style={{
        stroke: isAnimated ? "#2c4a7c" : "#c8cdd4",
        strokeWidth: isAnimated ? 1.5 : 1,
        strokeDasharray: isAnimated ? "6 6" : undefined,
        opacity: isAnimated ? 0.6 : 0.5,
        animation: isAnimated ? "dash 1s linear infinite" : undefined,
      }}
    />
  );
}
