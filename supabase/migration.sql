-- Cascade: GxP Change Impact Analyzer
-- Turso / SQLite migration

CREATE TABLE IF NOT EXISTS workflows (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS nodes (
  id TEXT PRIMARY KEY,
  workflow_id TEXT NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  label TEXT NOT NULL,
  description TEXT DEFAULT '',
  position_x REAL NOT NULL DEFAULT 0,
  position_y REAL NOT NULL DEFAULT 0,
  metadata TEXT DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_nodes_workflow_id ON nodes(workflow_id);

CREATE TABLE IF NOT EXISTS edges (
  id TEXT PRIMARY KEY,
  workflow_id TEXT NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  source_node_id TEXT NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
  target_node_id TEXT NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
  relationship TEXT DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_edges_workflow_id ON edges(workflow_id);

CREATE TABLE IF NOT EXISTS simulations (
  id TEXT PRIMARY KEY,
  workflow_id TEXT NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  trigger_node_id TEXT NOT NULL,
  change_description TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_simulations_workflow_id ON simulations(workflow_id);

CREATE TABLE IF NOT EXISTS simulation_impacts (
  id TEXT PRIMARY KEY,
  simulation_id TEXT NOT NULL REFERENCES simulations(id) ON DELETE CASCADE,
  node_id TEXT NOT NULL,
  severity TEXT NOT NULL,
  ai_explanation TEXT DEFAULT '',
  regulation_reference TEXT DEFAULT '',
  recommended_action TEXT DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_simulation_impacts_simulation_id ON simulation_impacts(simulation_id);
