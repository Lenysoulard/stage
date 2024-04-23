import { createUser as createUserRep, getUsers,getUserById, getNextId } from '../repositories/user.repository.js';
import User from '../models/user.model.js';

export const create = async (age, sexe, ville, code_postal, region, pays, education, occupation, commentaire) => {
  try {
    const user = new User(null, age, sexe, ville, code_postal, region, pays, education, occupation, commentaire);
    return await createUserRep(user);
  } catch (err) {
    throw new Error(err);
  }
}

export const gets = async () => {
  try {
    return await getUsers();
  } catch (err) {
    throw new Error(err);
  }
}

export const get = async (id) => {
  try {
    return await getUserById(id);
  } catch (err) {
    throw new Error(err);
  }
}