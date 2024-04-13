import { getDilemmeDefautById, getDilemmeDefauts } from "../services/dilemme_defaut.service";

export const getdilemmesDefaut = async (req, res) => {
    try {
        const dilemmesDefaut = await getDilemmeDefauts();
        res.status(200).json(dilemmesDefaut);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getdilemmeDefaut = async (req, res) => {
    try {
        const dilemmeDefaut = await getDilemmeDefautById(req.params.id);
        res.status(200).json(dilemmeDefaut);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}