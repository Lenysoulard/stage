import pool from '../config/db.js';

export const getContexteById = async (id) => {
    try {
        const {rows, fields} = await pool.query('SELECT * FROM contexte WHERE id = $1', [id]);
        return rows;
    } catch (err) {
        throw new Error(err);
    }
}