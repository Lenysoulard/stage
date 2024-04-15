import pool from "../config/db.js";

export const createReponse = async (id_personne, id_dilemme_defaut, id_dilemme_contextualise, choix) => {
    try {
        const [rows, fields] = await pool.execute('CALL InsererReponse(?, ?, ?, ?, @id_reponse)', [
            id_personne,
            id_dilemme_defaut,
            id_dilemme_contextualise,
            choix
          ]);
      
        const [result] = await pool.query('SELECT @id_reponse AS id_reponse');
        return result[0].id_reponse;
    } catch (err) {
        throw new Error(err);
    }
}

export const getReponseById = async (id) => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM reponses WHERE id = ?', [id]);
        return rows;
    } catch (err) {
        throw new Error(err);
    }
}