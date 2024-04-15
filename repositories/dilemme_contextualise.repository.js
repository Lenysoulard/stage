import pool from '../config/db.js';

export const getDilemmeContextualiseById = async (id) => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM dilemmes_contextualise WHERE id = ?', [id]);
        return rows;
    } catch (err) {
        throw new Error(err);
    }
}

export const getDilemmeContextualiseByIdDefaut = async (id) => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM dilemmes_contextualise WHERE id_dilemmes_defaut = ?', [id]);
        return rows;
    } catch (err) {
        throw new Error(err);
    }
}
