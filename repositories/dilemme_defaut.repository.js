import pool from '../config/db.js';

export const getDilemmeDefaut = async () => {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM dilemmes_defaut');
    return rows;
  } catch (err) {
    throw new Error(err);
  }
}

export const getDilemmeDefautById = async (id) => {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM dilemmes_defaut WHERE id = ?', [id]);
    return rows;
  } catch (err) {
    throw new Error(err);
  }
}