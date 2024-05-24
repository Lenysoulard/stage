import { getIncarnationService, getIncarnationByIdService } from "../services/incarnation.service.js";


export const getIncarnation = async (req, res) => {
    try {
        const incarnations = await getIncarnationService();
        res.status(200).json(incarnations);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

export const getIncarnationById = async (req, res) => {
    try {
        const id = req.params.id;
        const incarnation = await getIncarnationByIdService(id);
        res.status(200).json(incarnation);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}
