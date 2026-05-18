const { Pool } = require('pg');
require('dotenv').config();

async function run() {
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({ connectionString });

  try {
    const client = await pool.connect();
    const res = await client.query('SELECT id, email, "providerToken" IS NOT NULL as has_token, "providerRefreshToken" IS NOT NULL as has_refresh FROM "User";');
    console.log("User tokens check:");
    console.log(res.rows);
    client.release();
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await pool.end();
  }
}

run();
