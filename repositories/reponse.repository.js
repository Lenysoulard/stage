import pool from "../config/db.js";

export const createReponse = async (id_personne, dilemmes_json) => {
    try {
        const {rows, fields} = await pool.query('CALL insert_reponse($1, $2);', [
            id_personne,
            dilemmes_json,
          ]);
        // const [result] = await pool.query('SELECT @id_reponse AS id_reponse');
        // return result[0].id_reponse;
    } catch (err) {
        throw new Error(err + ". Erreur dans la procedure");
    }
}

export const getReponseById = async (id) => {
    try {
        const {rows, fields} = await pool.query('SELECT * FROM reponses WHERE id = $1', [id]);
        return rows;
    } catch (err) {
        throw new Error(err);
    }
}