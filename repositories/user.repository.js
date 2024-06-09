import pool from '../config/db.js';

export const createUser = async (user) => {
  try {
    const {rows, fields} = await pool.query('INSERT INTO infospersonne (age, sexe, ville, pays, education, information, commentaire) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
        [
          user.age,
          user.sexe,
          user.ville,
          user.pays,
          user.education,
          user.information,
          user.commentaire
        ]);
    return rows[0].id;
  } catch (err) {
    throw new Error(err);
  }
}

export const getUsers = async () => {
  try {
    const {rows, fields} = await pool.query('SELECT * FROM infospersonne');
    return rows;
  } catch (err) {
    throw new Error(err);
  }
}

export const getUserById = async (id) => {
  try {
    const {rows, fields} = await pool.query('SELECT * FROM infospersonne WHERE id = $1', [id]);
    return rows;
  } catch (err) {
    throw new Error(err);
  }
}

export const getNextId = async () => {
  try {
    const {rows, fields} = await pool.query('SELECT MAX(id) as id FROM infospersonne');
    return rows[0].id + 1;
  } catch (err) {
    throw new Error(err);
  }
}