import pool from "../config/db.js";

export const getModification = async () => {
    try {
        const {rows} = await pool.query("SELECT * FROM modification_dilemmes");
        return rows;
    } catch (err) {
        throw new Error(err);
    }
}