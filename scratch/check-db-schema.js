const { Pool } = require('pg');
require('dotenv').config();

async function run() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("DATABASE_URL env variable not found!");
    process.exit(1);
  }

  const pool = new Pool({ connectionString });

  try {
    const client = await pool.connect();
    console.log("Connected successfully!");

    // Query information_schema to get data_type of status column
    const res = await client.query(`
      SELECT column_name, data_type, udt_name 
      FROM information_schema.columns 
      WHERE table_name = 'Video' AND column_name = 'status';
    `);

    console.log("Database status column details:");
    console.log(res.rows);

    client.release();
  } catch (err) {
    console.error("Error checking database schema:", err);
  } finally {
    await pool.end();
  }
}

run();
