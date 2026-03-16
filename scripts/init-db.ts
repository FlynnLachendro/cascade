import { createClient } from "@libsql/client";
import { readFileSync } from "fs";
import { resolve } from "path";

const db = createClient({
  url: process.env.TURSO_DATABASE_URL || "file:local.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function main() {
  const sql = readFileSync(resolve(__dirname, "../supabase/migration.sql"), "utf-8");
  const statements = sql
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (const statement of statements) {
    await db.execute(statement);
  }

  console.log(`Created ${statements.length} tables/indexes in database.`);
}

main().catch(console.error);
