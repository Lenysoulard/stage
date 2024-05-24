import pool from "../config/db.js";

export const getIncarnation = async () => {
    try {
        const {rows} = await pool.query("SELECT * FROM incarnation");
        return rows;
    } catch (err) {
        throw new Error(err);
    }
}

export const getIncarnationById = async (id) => {
    try {
        const {rows} = await pool.query("SELECT * FROM incarnation WHERE id=$1", [id]);
        return rows;
    } catch (err) {
        throw new Error(err);
    }
}