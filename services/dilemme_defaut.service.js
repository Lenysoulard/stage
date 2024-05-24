import { getDilemmeDefaut as getDilemme, getDilemmeDefautById as getDilemmeId, editDilemmeDefaut, deleteDilemmeDefaut, createDilemmeDefaut } from "../repositories/dilemme_defaut.repository.js";
import dilemmeDefautModel from "../models/dilemme_defaut.model.js";


export const getDilemmeDefauts = async () => {
    try {
        const dilemmesDefaut = await getDilemme();
        return dilemmesDefaut.map(dilemmeDefaut => new dilemmeDefautModel(dilemmeDefaut.id, dilemmeDefaut.description));
    } catch (err) {
        const error = err + ". Erreur dans la fonction getDilemmeDefauts() du service dilemme_defaut.service.js"
        throw new Error(error);
    }
}

export const getDilemmeDefautById = async (id) => {
    try {
        const dilemmeDefaut = await getDilemmeId(id);
        return new dilemmeDefautModel(dilemmeDefaut[0].id, dilemmeDefaut[0].description);
    } catch (err) {
        throw new Error(err);
    }
}

export const editDilemme = async (id, desc) => {
    try {
        await editDilemmeDefaut(id, desc);
    } catch (err) {
        throw new Error(err);
    }
}

export const deleteDilemme = async (id) => {
    try {
        await deleteDilemmeDefaut(id);
    } catch (err) {
        throw new Error(err);
    }
}

export const createDilemme = async (desc) => {
    try {
        return await createDilemmeDefaut(desc);
    } catch (err) {
        throw new Error(err);
    }
}










