import reponseModel from "../models/reponse.model.js";
import { createReponse as create} from "../repositories/reponse.repository.js";

export const createReponse = async (id_personne, dilemmes) => {
    try {
        await create(id_personne, JSON.stringify(dilemmes));
    } catch (err) {
        throw new Error(err);
    }
}


