import pool from "../config/db.js";

export const getModification = async () => {
    try {
        const {rows} = await pool.query("SELECT * FROM modification_dilemmes");
        return rows;
    } catch (err) {
        throw new Error(err);
    }
}

export const updateModification = async (data) => {
    try {
        const {rows} = await pool.query("UPDATE modification_dilemmes SET temps_reponse=$1, bouton_couleur=$2, reponse_ia=$3;", [data.temps_reponse, data.bouton_couleur, data.reponse_ia]);
        return rows;
    } catch (err) {
        throw new Error(err);
    }
}
