import { getDilemmeDefautById, getDilemmeDefauts, editDilemme, deleteDilemme, createDilemme } from "../services/dilemme_defaut.service.js";
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
        const dilemmeDefaut = await getDilemmeDefautById(1);
        const modificationDilemme = await getModificationDilemme();
        res.render("userForm.ejs", {title: "Formulaire de participation", dilemme: dilemmeDefaut, modification: modificationDilemme});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


export const afficherDilemmes2 = async (req, res) => {
    try {
        const dilemmeDefaut = await getDilemmeDefautById(1);
        const modificationDilemme = await getModificationDilemme();
        res.render("participate.ejs", {title: "Formulaire de participation", dilemme: dilemmeDefaut, modification: modificationDilemme});
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

export const editDilemmeDefaut = async (req, res) => {
    try {
        await editDilemme(req.params.id, req.body.description);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const deleteDilemmeDefaut = async (req, res) => {
    try {
        await deleteDilemme(req.params.id);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const createDilemmeDefaut = async (req, res) => {
    try {
        const dilemme = await createDilemme(req.body.description);
        res.status(200).json({ id: dilemme[0].id, description: dilemme[0].description});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}