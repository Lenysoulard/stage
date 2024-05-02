import pool from '../config/db.js';

export const createUser = async (user) => {
  console.log(user);
  try {
    const {rows, fields} = await pool.query('INSERT INTO infospersonne (age, sexe, ville, region, pays, education, occupation, commentaire) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
        [
          user.age,
          user.sexe,
          user.ville,
          user.region,
          user.pays,
          user.education,
          user.occupation,
          user.commentaire
        ]);
    return rows[0].id;
  } catch (err) {
    console.error(err);
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