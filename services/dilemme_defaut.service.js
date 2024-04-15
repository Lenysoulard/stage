import { getDilemmeDefaut as getDilemme, getDilemmeDefautById as getDilemmeId } from "../repositories/dilemme_defaut.repository.js";
import dilemmeDefautModel from "../models/dilemme_defaut.model.js";


export const getDilemmeDefauts = async () => {
    try {
        const dilemmesDefaut = await getDilemme();
        return dilemmesDefaut.map(dilemmeDefaut => new dilemmeDefautModel(dilemmeDefaut.id, dilemmeDefaut.description, dilemmeDefaut.choix1, dilemmeDefaut.choix2));
    } catch (err) {
        throw new Error(err);
    }
}

export const getDilemmeDefautById = async (id) => {
    try {
        const dilemmeDefaut = await getDilemmeId(id);
        return new dilemmeDefautModel(dilemmeDefaut[0].id, dilemmeDefaut[0].description, dilemmeDefaut[0].choix1, dilemmeDefaut[0].choix2);
    } catch (err) {
        throw new Error(err);
    }
}










