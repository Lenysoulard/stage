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

export const getReponseByPersonneId = async (id_personne) => {
    try {
        const {rows, fields} = await pool.query('SELECT * FROM reponses WHERE id_personne = $1', [id_personne]);
        return rows;
    } catch (err) {
        throw new Error(err);
    }
}

export const getNumberOfReponse = async () => {
    try {
        const {rows, fields} = await pool.query('SELECT COUNT(*) FROM reponses');
        return rows[0].count;
    } catch (err) {
        throw new Error(err);
    }
}

export const getReponseExport = async () => {
    try {
        const result = await pool.query('SELECT i.id, age, sexe, ville, region, pays, education, occupation, commentaire, dilemmes FROM reponses r JOIN infospersonne i ON i.id=r.id_personne');
        return result;
    } catch (err) {
        throw new Error(err);
    }
}
