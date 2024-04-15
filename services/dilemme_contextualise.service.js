import dilemmeContextualiseModel from "../models/dilemme_contextualise.model.js";
import { getDilemmeContextualiseById as getDilemmeContextualiseId, getDilemmeContextualiseByIdDefaut as getDilemmeContextualiseIdDefaut } from "../repositories/dilemme_contextualise.repository.js";

export const getDilemmeContextualiseById = async (id) => {
    try {
        const dilemmeContextualise = await getDilemmeContextualiseId(id);
        return new dilemmeContextualiseModel(dilemmeContextualise[0].id, dilemmeContextualise[0].id_dilemmes_defaut, dilemmeContextualise[0].id_contexte);
    } catch (err) {
        throw new Error(err);
    }
}

export const getDilemmeContextualiseByIdDefaut = async (id) => {
    try {
        const dilemmesContextualise = await getDilemmeContextualiseIdDefaut(id);
        return dilemmesContextualise.map(dilemmeContextualise => new dilemmeContextualiseModel(dilemmeContextualise.id, dilemmeContextualise.id_dilemmes_defaut, dilemmeContextualise.id_contexte));
    } catch (err) {
        throw new Error(err);
    }
}