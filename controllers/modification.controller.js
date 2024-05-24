import { getModificationDilemme, updateModificationDilemme } from "../services/modification.service.js";
import { getDilemmeDefauts } from "../services/dilemme_defaut.service.js";


export const afficherModification2 = async (req, res) => {
    const modificationDilemme = await getModificationDilemme();
    const dilemmes = await getDilemmeDefauts();
    return res.render("admin/handleDilemme.ejs", {title: "Modification", modification: modificationDilemme, dilemmes});
};

export const modifierDilemme = async (req, res) => {
    try{
        await updateModificationDilemme(req.body.data);
        return res.status(200).json({message: "Modifications enregistrés avec succès"});
    }catch(err){
        return res.status(500).json({message: "Erreur lors de la modification"});
    }
}



