import { getDilemmeDefaut, getDilemmeDefautById } from "../repositories/dilemme_defaut.repository";
import dilemmeDefautModel from "../models/dilemme_defaut.model";


export const getDilemmeDefauts = async () => {
    try {
        const dilemmesDefaut = await getDilemmeDefaut();
        return dilemmesDefaut.map(dilemmeDefaut => new dilemmeDefautModel(dilemmeDefaut.id, dilemmeDefaut.description, dilemmeDefaut.choix1, dilemmeDefaut.choix2));
    } catch (err) {
        throw new Error(err);
    }
}

export const getDilemmeDefautById = async (id) => {
    try {
        const dilemmeDefaut = await getDilemmeDefautById(id);
        return new dilemmeDefautModel(dilemmeDefaut[0].id, dilemmeDefaut[0].description, dilemmeDefaut[0].choix1, dilemmeDefaut[0].choix2);
    } catch (err) {
        throw new Error(err);
    }
}










