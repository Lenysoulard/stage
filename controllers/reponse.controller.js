import { createReponse as create } from "../services/reponse.service.js";

export const createReponse = async (req, res) => {
    try {
        const reponse = await create(req.body.id_personne, req.body.id_dilemme_defaut, req.body.id_dilemme_contextualise, req.body.choix);
        res.status(201).json(reponse);
    } catch (err) {
        res.status(500).json({ message: err.message, body: req.body});
    }
}