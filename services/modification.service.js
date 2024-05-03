import { getModification } from "../repositories/modification.repository.js";

export const getModificationDilemme = async () => {
    try {
        const rows = await getModification();
        return {temps_reponse: rows[0].temps_reponse, bouton_couleur: rows[0].bouton_couleur, reponse_IA: rows[0].reponse_IA};
    } catch (err) {
        throw new Error(err);
    }
}