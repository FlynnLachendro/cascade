export const typeDefs = `#graphql
  scalar DateTime
  scalar JSON

  enum NodeType {
    process_step
    sop
    training_record
    batch_record
    equipment_qualification
    validation_protocol
    capa
    regulatory_submission
  }

  enum Severity {
    critical
    high
    medium
    low
    trigger
  }

  type Workflow {
    id: ID!
    name: String!
    description: String
    nodes: [Node!]!
    edges: [Edge!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Node {
    id: ID!
    workflowId: ID!
    type: NodeType!
    label: String!
    description: String
    positionX: Float!
    positionY: Float!
    metadata: JSON
  }

  type Edge {
    id: ID!
    workflowId: ID!
    sourceNodeId: ID!
    targetNodeId: ID!
    relationship: String!
  }

  type Simulation {
    id: ID!
    workflowId: ID!
    triggerNodeId: ID!
    changeDescription: String!
    impacts: [SimulationImpact!]!
    createdAt: DateTime!
  }

  type SimulationImpact {
    id: ID!
    nodeId: ID!
    severity: Severity!
    aiExplanation: String!
    regulationReference: String!
    recommendedAction: String!
  }

  input NodeInput {
    id: ID!
    type: NodeType!
    label: String!
    description: String
    positionX: Float!
    positionY: Float!
    metadata: JSON
  }

  input EdgeInput {
    id: ID!
    sourceNodeId: ID!
    targetNodeId: ID!
    relationship: String!
  }

  input SimulationImpactInput {
    nodeId: ID!
    severity: Severity!
    aiExplanation: String!
    regulationReference: String!
    recommendedAction: String!
  }

  type Query {
    workflow(id: ID!): Workflow
    simulation(id: ID!): Simulation
  }

  type Mutation {
    createWorkflow(name: String!, description: String): Workflow!
    saveWorkflow(id: ID!, name: String!, description: String, nodes: [NodeInput!]!, edges: [EdgeInput!]!): Workflow!
    deleteWorkflow(id: ID!): Boolean!
    saveSimulation(
      workflowId: ID!
      triggerNodeId: ID!
      changeDescription: String!
      impacts: [SimulationImpactInput!]!
    ): Simulation!
  }
`;
