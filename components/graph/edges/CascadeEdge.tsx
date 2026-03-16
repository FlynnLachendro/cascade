"use client";

import { BaseEdge, getStraightPath, type EdgeProps } from "@xyflow/react";

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
  data,
}: EdgeProps & { data?: CascadeEdgeData }) {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const isAnimated = data?.animated;

  return (
    <BaseEdge
      id={id}
      path={edgePath}
      style={{
        stroke: isAnimated ? "#4a6a9a" : "#d4cfc8",
        strokeWidth: isAnimated ? 2 : 1.5,
        strokeDasharray: isAnimated ? "8 4" : undefined,
        animation: isAnimated ? "dash 0.6s linear infinite" : undefined,
      }}
    />
  );
}
