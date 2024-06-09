import { getIncarnation, getIncarnationById , getNumberOfIncarnations} from "../repositories/incarnation.repository.js";
import { Incarnation } from "../models/incarnation.model.js";
import e from "express";

export const getIncarnationService = async () => {
    try {
        const incarnations = await getIncarnation();
        return incarnations.map(incarnation => new Incarnation(incarnation.id, incarnation.description));
    } catch (err) {
        const error = err + ". Erreur dans la fonction getIncarnationService() du service incarnation.service.js"
        throw new Error(error);
    }
}

export const getIncarnationByIdService = async (id) => {
    try {
        const incarnation = await getIncarnationById(id);
        return new Incarnation(incarnation[0].id, incarnation[0].description);
    } catch (err) {
        throw new Error(err);
    }
}

export const getNumberOfIncarnationsService = async () => {
    try {
        const numberOfIncarnations = await getNumberOfIncarnations();
        return numberOfIncarnations[0].count;
    } catch (err) {
        throw new Error(err);
    }
}
