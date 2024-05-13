import { getModification, updateModification } from "../repositories/modification.repository.js";

export const getModificationDilemme = async () => {
    try {
        const rows = await getModification();
        console.log(rows);
        return {temps_reponse: rows[0].temps_reponse, bouton_couleur: rows[0].bouton_couleur, reponse_ia: rows[0].reponse_ia};
    } catch (err) {
        throw new Error(err);
    }
}

export const updateModificationDilemme = async (data) => {
    try {
        console.log(data);
        const rows = await updateModification(data);
        return rows;
    } catch (err) {
        throw new Error(err);
    }
}