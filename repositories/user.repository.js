import pool from '../config/db.js';

export const createUser = async (user) => {
  console.log(user);
  try {
    const [rows, fields] = await pool.query('INSERT INTO infospersonne (id, age, sexe, ville, code_postal, region, pays, education, occupation, commentaire) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          user.id,
          user.age,
          user.sexe,
          user.ville,
          user.code_postal,
          user.region,
          user.pays,
          user.education,
          user.occupation,
          user.commentaire
        ]);
    return rows;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
}

export const getUsers = async () => {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM infospersonne');
    return rows;
  } catch (err) {
    throw new Error(err);
  }
}

export const getUserById = async (id) => {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM infospersonne WHERE id = ?', [id]);
    return rows;
  } catch (err) {
    throw new Error(err);
  }
}

export const getNextId = async () => {
  try {
    const [rows, fields] = await pool.query('SELECT MAX(id) as id FROM infospersonne');
    return rows[0].id + 1;
  } catch (err) {
    throw new Error(err);
  }
}