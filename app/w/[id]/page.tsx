import { notFound } from "next/navigation";
import { SharedWorkflowClient } from "./client";
import { getWorkflow } from "@/lib/db/queries";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SharedWorkflowPage({ params }: PageProps) {
  const { id } = await params;

  let workflow: Awaited<ReturnType<typeof getWorkflow>>;
  try {
    workflow = await getWorkflow(id);
  } catch {
    notFound();
  }

  if (!workflow) {
    notFound();
  }

  return (
    <SharedWorkflowClient
      workflow={{
        id: workflow.id,
        name: workflow.name,
        description: workflow.description,
        nodes: workflow.nodes.map((n) => ({
          id: n.id,
          type: n.type,
          label: n.label,
          description: n.description,
          positionX: n.positionX,
          positionY: n.positionY,
        })),
        edges: workflow.edges.map((e) => ({
          id: e.id,
          sourceNodeId: e.sourceNodeId,
          targetNodeId: e.targetNodeId,
        })),
      }}
    />
  );
}
