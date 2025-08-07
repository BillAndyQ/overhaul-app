// lib/db.js
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // necesario para Supabase u otros servicios en la nube
  },
});

// En entornos como Vercel (serverless), reutiliza la conexión
if (!global.pgPool) {
  global.pgPool = pool;
}

export default global.pgPool;
