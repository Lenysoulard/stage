import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config({path: "./config/.env"});

const pool = new Pool({
  host: process.env.BD_HOST,
  user: process.env.BD_USER,
  password: process.env.BD_PASSWORD,
  database: process.env.BD_DATABASE,
  port: process.env.BD_PORT || 5432,
});

export default pool; 