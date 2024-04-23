import pool from '../config/db.js';

export const getDilemmeDefaut = async () => {
  try {
    const {rows} = await pool.query('SELECT * FROM dilemmes_defaut;');
    return rows;
  } catch (err) {
    throw new Error('Erreur lors de l\'exécution de la requête SQL pour obtenir les dilemmes par défaut : ' + err.message);
  }
}

export const getDilemmeDefautById = async (id) => {
  try {
    const {rows, fields} = await pool.query('SELECT * FROM dilemmes_defaut WHERE id = $1;', [id]);
    return rows;
  } catch (err) {
    throw new Error(err);
  }
}