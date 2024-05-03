import { getModificationDilemme } from "../services/modification.service.js";

export const afficherModification = async (req, res) => {
    const modificationDilemme = await getModificationDilemme();
    return res.render("admin/handleDilemme.ejs", {title: "Modification", modification: modificationDilemme});
};



