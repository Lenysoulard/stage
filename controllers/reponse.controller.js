import { createReponse as create } from "../services/reponse.service.js";

export const createReponse = async (req, res) => {
    try {
        console.log(req.body);
        const reponse = await create(req.body.id_personne, req.body.dilemmes);
        console.log(reponse);
        res.status(201).json({reponse : reponse});
    } catch (err) {
        res.status(500).json({ message: err.message, body: req.body});
    }
}