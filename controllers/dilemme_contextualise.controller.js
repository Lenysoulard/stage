import { getDilemmeContextualiseById as getDilemme, getDilemmeContextualiseByIdDefaut as getDilemmeDefaut } from "../services/dilemme_contextualise.service.js";

export const getDilemmeContextualiseId = async (req, res) => {
    try {
        const dilemmesContextualise = await getDilemme(req.params.id);
        res.status(200).json(dilemmesContextualise);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getDilemmeContextualiseIdDefaut = async (req, res) => {
    try {
        const dilemmeContextualise = await getDilemmeDefaut(req.params.id);
        res.status(200).json(dilemmeContextualise);
    } catch (err) {
        res.status(500).json({ message: err.message, body: req.body});
    }
}