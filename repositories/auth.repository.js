import pool from '../config/db.js';

export const getAuthById = async (login) => {
    try {
        const {rows, fields} = await pool.query("SELECT * FROM authenticate WHERE login = $1", [login]);
        return rows;
    } catch (err) {
        throw new Error(err);
    }
}

export const createAuth = async (login, password) => {
    try {
        const {rows, fields} = await pool.query("INSERT INTO authenticate (login, password) VALUES ($1, $2) RETURNING *", [login, password]);
        return rows;
    } catch (err) {
        throw new Error(err);
    }
}


    

