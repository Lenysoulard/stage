import {create} from '../services/user.service.js';

export const createUser = async (req, res, next) => {
  try {
    const {age, sexe, ville, code_postal, region, pays, education, occupation, commentaire } = req.body;
    const id_personne = await create(age, sexe, ville, code_postal, region, pays, education, occupation, commentaire);
    return res.status(201).json({id: id_personne});
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
