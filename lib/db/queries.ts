import { db } from "./client";
import type { Workflow, WorkflowNode, WorkflowEdge, SimulationImpact } from "@/types";

// ── Workflows ──

export async function getWorkflow(id: string): Promise<Workflow | null> {
  const wResult = await db.execute({
    sql: "SELECT * FROM workflows WHERE id = ?",
    args: [id],
  });

  if (wResult.rows.length === 0) return null;
  const workflow = wResult.rows[0];

  const [nodesResult, edgesResult] = await Promise.all([
    db.execute({ sql: "SELECT * FROM nodes WHERE workflow_id = ?", args: [id] }),
    db.execute({ sql: "SELECT * FROM edges WHERE workflow_id = ?", args: [id] }),
  ]);

  return {
    id: workflow.id as string,
    name: workflow.name as string,
    description: (workflow.description as string) || "",
    nodes: nodesResult.rows.map(mapNodeFromDb),
    edges: edgesResult.rows.map(mapEdgeFromDb),
    createdAt: workflow.created_at as string,
    updatedAt: workflow.updated_at as string,
  };
}

export async function createWorkflow(
  name: string,
  description: string
): Promise<string> {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  await db.execute({
    sql: "INSERT INTO workflows (id, name, description, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
    args: [id, name, description, now, now],
  });

  return id;
}

export async function saveWorkflow(
  id: string,
  name: string,
  description: string,
  nodes: WorkflowNode[],
  edges: WorkflowEdge[]
): Promise<string> {
  const now = new Date().toISOString();

  // Upsert workflow
  await db.execute({
    sql: `INSERT INTO workflows (id, name, description, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET name = ?, description = ?, updated_at = ?`,
    args: [id, name, description, now, now, name, description, now],
  });

  // Delete existing nodes and edges
  await db.execute({ sql: "DELETE FROM edges WHERE workflow_id = ?", args: [id] });
  await db.execute({ sql: "DELETE FROM nodes WHERE workflow_id = ?", args: [id] });

  // Insert nodes
  for (const n of nodes) {
    await db.execute({
      sql: `INSERT INTO nodes (id, workflow_id, type, label, description, position_x, position_y, metadata)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        n.id,
        id,
        n.type,
        n.label,
        n.description,
        n.positionX,
        n.positionY,
        JSON.stringify(n.metadata),
      ],
    });
  }

  // Insert edges
  for (const e of edges) {
    await db.execute({
      sql: `INSERT INTO edges (id, workflow_id, source_node_id, target_node_id, relationship)
            VALUES (?, ?, ?, ?, ?)`,
      args: [e.id, id, e.sourceNodeId, e.targetNodeId, e.relationship],
    });
  }

  return id;
}

export async function deleteWorkflow(id: string): Promise<boolean> {
  // Cascade deletes handle the rest via foreign keys
  await db.execute({ sql: "DELETE FROM edges WHERE workflow_id = ?", args: [id] });
  await db.execute({ sql: "DELETE FROM nodes WHERE workflow_id = ?", args: [id] });

  const simResult = await db.execute({
    sql: "SELECT id FROM simulations WHERE workflow_id = ?",
    args: [id],
  });
  for (const sim of simResult.rows) {
    await db.execute({
      sql: "DELETE FROM simulation_impacts WHERE simulation_id = ?",
      args: [sim.id as string],
    });
  }
  await db.execute({ sql: "DELETE FROM simulations WHERE workflow_id = ?", args: [id] });
  await db.execute({ sql: "DELETE FROM workflows WHERE id = ?", args: [id] });

  return true;
}

// ── Simulations ──

export async function saveSimulation(
  workflowId: string,
  triggerNodeId: string,
  changeDescription: string,
  impacts: Omit<SimulationImpact, "id">[]
): Promise<string> {
  const simId = crypto.randomUUID();
  const now = new Date().toISOString();

  await db.execute({
    sql: `INSERT INTO simulations (id, workflow_id, trigger_node_id, change_description, created_at)
          VALUES (?, ?, ?, ?, ?)`,
    args: [simId, workflowId, triggerNodeId, changeDescription, now],
  });

  for (const i of impacts) {
    const impactId = crypto.randomUUID();
    await db.execute({
      sql: `INSERT INTO simulation_impacts (id, simulation_id, node_id, severity, ai_explanation, regulation_reference, recommended_action)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [
        impactId,
        simId,
        i.nodeId,
        i.severity,
        i.aiExplanation,
        i.regulationReference,
        i.recommendedAction,
      ],
    });
  }

  return simId;
}

export async function getSimulation(id: string) {
  const simResult = await db.execute({
    sql: "SELECT * FROM simulations WHERE id = ?",
    args: [id],
  });

  if (simResult.rows.length === 0) return null;
  const sim = simResult.rows[0];

  const impactsResult = await db.execute({
    sql: "SELECT * FROM simulation_impacts WHERE simulation_id = ?",
    args: [id],
  });

  return {
    id: sim.id as string,
    workflowId: sim.workflow_id as string,
    triggerNodeId: sim.trigger_node_id as string,
    changeDescription: sim.change_description as string,
    createdAt: sim.created_at as string,
    impacts: impactsResult.rows.map((i) => ({
      id: i.id as string,
      nodeId: i.node_id as string,
      severity: i.severity as string,
      aiExplanation: i.ai_explanation as string,
      regulationReference: i.regulation_reference as string,
      recommendedAction: i.recommended_action as string,
    })),
  };
}

// ── Mappers ──

function mapNodeFromDb(row: Record<string, unknown>): WorkflowNode {
  return {
    id: row.id as string,
    workflowId: row.workflow_id as string,
    type: row.type as WorkflowNode["type"],
    label: row.label as string,
    description: (row.description as string) || "",
    positionX: row.position_x as number,
    positionY: row.position_y as number,
    metadata: row.metadata ? JSON.parse(row.metadata as string) : {},
  };
}

function mapEdgeFromDb(row: Record<string, unknown>): WorkflowEdge {
  return {
    id: row.id as string,
    workflowId: row.workflow_id as string,
    sourceNodeId: row.source_node_id as string,
    targetNodeId: row.target_node_id as string,
    relationship: (row.relationship as string) || "",
  };
}
