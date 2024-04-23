import contexteModel from "../models/contexte.model.js";
import { getContexteById as getContexteId } from "../repositories/contexte.repository.js";

export const getContexteById = async (id) => {
    try {
        const contexte = await getContexteId(id);
        return new contexteModel(contexte[0].id, contexte[0].description);
    } catch (err) {
        throw new Error(err);
    }
}