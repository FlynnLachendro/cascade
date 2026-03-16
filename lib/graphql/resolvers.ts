import {
  getWorkflow,
  createWorkflow,
  saveWorkflow,
  deleteWorkflow,
  saveSimulation,
  getSimulation,
} from "@/lib/db/queries";
import type { WorkflowNode, WorkflowEdge, Severity } from "@/types";

export const resolvers = {
  Query: {
    workflow: async (_: unknown, { id }: { id: string }) => {
      return getWorkflow(id);
    },
    simulation: async (_: unknown, { id }: { id: string }) => {
      return getSimulation(id);
    },
  },

  Mutation: {
    createWorkflow: async (
      _: unknown,
      { name, description }: { name: string; description?: string }
    ) => {
      const id = await createWorkflow(name, description || "");
      return getWorkflow(id);
    },

    saveWorkflow: async (
      _: unknown,
      {
        id,
        name,
        description,
        nodes,
        edges,
      }: {
        id: string;
        name: string;
        description?: string;
        nodes: Array<Omit<WorkflowNode, "workflowId">>;
        edges: Array<Omit<WorkflowEdge, "workflowId">>;
      }
    ) => {
      const fullNodes = nodes.map((n) => ({ ...n, workflowId: id }));
      const fullEdges = edges.map((e) => ({ ...e, workflowId: id }));
      await saveWorkflow(id, name, description || "", fullNodes, fullEdges);
      return getWorkflow(id);
    },

    deleteWorkflow: async (_: unknown, { id }: { id: string }) => {
      return deleteWorkflow(id);
    },

    saveSimulation: async (
      _: unknown,
      {
        workflowId,
        triggerNodeId,
        changeDescription,
        impacts,
      }: {
        workflowId: string;
        triggerNodeId: string;
        changeDescription: string;
        impacts: Array<{
          nodeId: string;
          severity: Severity;
          aiExplanation: string;
          regulationReference: string;
          recommendedAction: string;
        }>;
      }
    ) => {
      const simId = await saveSimulation(
        workflowId,
        triggerNodeId,
        changeDescription,
        impacts
      );
      return getSimulation(simId);
    },
  },
};
