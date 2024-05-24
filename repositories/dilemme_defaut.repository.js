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

export const editDilemmeDefaut = async (id, desc) => {
  try {
    const {rows} = await pool.query('UPDATE dilemmes_defaut SET description = $1 WHERE id = $2 RETURNING *;', [desc, id]);
    console.log('rows', rows);
    return rows;
  } catch (err) {
    throw new Error(err);
  }
}

export const deleteDilemmeDefaut = async (id) => {
  try {
    const {rows} = await pool.query('DELETE FROM dilemmes_defaut WHERE id = $1;', [id]);
    return rows;
  } catch (err) {
    throw new Error(err);
  }
}

export const createDilemmeDefaut = async (desc) => {
  try {
    const {rows} = await pool.query('INSERT INTO dilemmes_defaut (description) VALUES ($1) RETURNING *;', [desc]);
    return rows;
  } catch (err) {
    throw new Error(err);
  }
}