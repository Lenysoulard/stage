import {create} from '../services/user.service.js';

export const createUser = async (req, res, next) => {
  try {
    const {age, sexe, ville, code_postal, region, pays, education, occupation, commentaire } = req.body;
    await create(age, sexe, ville, code_postal, region, pays, education, occupation, commentaire);
    return res.redirect('/particip');
  } catch (err) {
    console.error(err);
    return res.status(500).send(err.message);
  }
}
