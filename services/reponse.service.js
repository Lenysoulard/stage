import reponseModel from "../models/reponse.model.js";
import { createReponse as create , getReponseById} from "../repositories/reponse.repository.js";

export const createReponse = async (id_personne, dilemmes) => {
    try {
        
        const id_reponse = await create(id_personne, JSON.stringify(dilemmes));
        // const reponse = await getReponseById(id_reponse);
        // return new reponseModel(reponse[0].id, reponse[0].id_personne, reponse[0].id_dilemme, reponse[0].id_dilemme_contexte, reponse[0].choix);
    } catch (err) {
        throw new Error(err);
    }
}