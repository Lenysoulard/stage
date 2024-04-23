import { getContexteById } from "../services/contexte.service.js";

export const getContexteId = async (req, res) => {
    try {
        const contexte = await getContexteById(req.params.id);
        res.status(200).json(contexte);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}