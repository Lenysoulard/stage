import pool from '../config/db.js';

export const getDilemmeContextualiseById = async (id) => {
    try {
        const {rows, fields} = await pool.query('SELECT * FROM dilemmes_contextualise WHERE id = $1', [id]);
        return rows;
    } catch (err) {
        throw new Error(err);
    }
}

export const getDilemmeContextualiseByIdDefaut = async (id) => {
    try {
        const {rows, fields} = await pool.query('SELECT * FROM dilemmes_contextualise WHERE id_dilemme_defaut = $1', [id]);
        return rows;
    } catch (err) {
        throw new Error(err + ". fichier : dilemme_contextualise.repository.js");
    }
}
