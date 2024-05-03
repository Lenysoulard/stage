import { getDilemmeDefautById, getDilemmeDefauts } from "../services/dilemme_defaut.service.js";
import { getModificationDilemme } from "../services/modification.service.js";

export const getDilemmesDefaut = async (req, res) => {
    try {
        const dilemmesDefaut = await getDilemmeDefauts();
        res.status(200).json(dilemmesDefaut);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getDilemmeDefaut = async (req, res) => {
    try {
        const dilemmeDefaut = await getDilemmeDefautById(req.params.id);
        res.status(200).json(dilemmeDefaut);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const afficherDilemmes = async (req, res) => {
    try {
        const dilemmesDefaut = await getDilemmeDefauts();
        const randomIndex = Math.floor(Math.random() * dilemmesDefaut.length);
        const dilemmeDefaut = dilemmesDefaut[randomIndex];
        const modificationDilemme = await getModificationDilemme();
        res.render("userForm.ejs", {title: "Formulaire de participation", dilemme: dilemmeDefaut, modification: modificationDilemme});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getDilemmeDefautsExcludeIds = async (req, res) => {
    try {
        const dilemmesDefaut = await getDilemmeDefauts();   
        const ids = req.params.ids.split('-');
        const dilemmesDefautFiltered = dilemmesDefaut.filter(dilemme => !ids.includes(dilemme.id.toString()));
        res.status(200).json(dilemmesDefautFiltered);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}