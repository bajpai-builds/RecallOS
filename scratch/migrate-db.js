const { Pool } = require('pg');
require('dotenv').config();

async function run() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("DATABASE_URL env variable not found!");
    process.exit(1);
  }

  console.log("Connecting to PostgreSQL...");
  const pool = new Pool({ connectionString });

  try {
    const client = await pool.connect();
    console.log("Connected successfully!");

    console.log("Step 1: Casting status column from custom enum to text...");
    await client.query('ALTER TABLE "Video" ALTER COLUMN "status" TYPE text USING "status"::text;');
    console.log("Casting completed.");

    console.log("Step 2: Migrating UNWATCHED status to SAVED...");
    const res = await client.query('UPDATE "Video" SET "status" = \'SAVED\' WHERE "status" = \'UNWATCHED\';');
    console.log(`Migrated ${res.rowCount} videos from UNWATCHED to SAVED.`);

    client.release();
    console.log("Migration complete!");
  } catch (err) {
    console.error("Error during migration:", err);
  } finally {
    await pool.end();
  }
}

run();
