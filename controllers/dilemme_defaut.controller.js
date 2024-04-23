import { getDilemmeDefautById, getDilemmeDefauts } from "../services/dilemme_defaut.service.js";

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
        res.render("userForm.ejs", {title: "Formulaire de participation", dilemme: dilemmeDefaut});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getDilemmeDefautsExcludeIds = async (req, res) => {
    try {
        const dilemmesDefaut = await getDilemmeDefauts();
        const ids = req.params.ids.split('-');
        console.log(ids);
        const dilemmesDefautFiltered = dilemmesDefaut.filter(dilemme => !ids.includes(dilemme.id.toString()));
        console.log(dilemmesDefautFiltered);
        res.status(200).json(dilemmesDefautFiltered);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}