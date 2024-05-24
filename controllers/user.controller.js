
import {create, getUserSexe, getUsersAge} from '../services/user.service.js';

export const createUser = async (req, res) => {
  try {
    const {age, sexe, ville, region, pays, education, information, commentaire } = req.body;
    const id_personne = await create(age, sexe, ville, region, pays, education, information, commentaire);
    return res.status(201).json({id: id_personne});
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export const getUserSexeCount = async (req, res) => {
    try {
        const {maleCount, femaleCount, otherCount, noneCount} = await getUserSexe();
        return res.status(200).json({maleCount, femaleCount, otherCount, noneCount});
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}

export const getUsersAgeCount = async (req, res) => {
    try {
        const ageCount = await getUsersAge();
        return res.status(200).json(ageCount);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}

