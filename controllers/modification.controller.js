import { getModificationDilemme, updateModificationDilemme } from "../services/modification.service.js";

export const afficherModification = async (req, res) => {
    const modificationDilemme = await getModificationDilemme();
    console.log(modificationDilemme);
    return res.render("admin/handleDilemme.ejs", {title: "Modification", modification: modificationDilemme});
};

export const modifierDilemme = async (req, res) => {
    try{
        await updateModificationDilemme(req.body.data);
        return res.status(200).json({message: "Modifications enregistrés avec succès"});
    }catch(err){
        return res.status(500).json({message: "Erreur lors de la modification"});
    }
}



