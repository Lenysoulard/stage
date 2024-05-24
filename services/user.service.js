import { createUser as createUserRep, getUsers,getUserById} from '../repositories/user.repository.js';
import User from '../models/user.model.js';

export const create = async (age, sexe, ville, region, pays, education, information, commentaire) => {
	try {
		const user = new User(null, age, sexe, ville, region, pays, education, information, commentaire);
		return await createUserRep(user);
	} catch (err) {
		throw new Error(err);
	}
}

export const getUserSexe = async () => {
	try {
		const users = await getUsers();
		let maleCount = 0;
		let femaleCount = 0;
		let otherCount = 0;
		let noneCount = 0;
		users.forEach(user => {
			if (user.sexe === 'Homme') {
				maleCount++;
			} else if (user.sexe === 'Femme') {
				femaleCount++;
			} else if (user.sexe === 'Autre') {
				otherCount++;
			} else {
				noneCount++;
			}
		});
		return { maleCount, femaleCount, otherCount, noneCount };
	} catch (err) {
		throw new Error(err);
	}
}

export const getUsersAge = async () => {
	try {
		const users = await getUsers();
		let ageCount = [];
		users.forEach(user => {
			if (10 < user.age && user.age <= 20) {
				ageCount[0] = ageCount[0] ? ageCount[0] + 1 : 1;
			} else if (20 < user.age && user.age <= 30) {
				ageCount[1] = ageCount[1] ? ageCount[1] + 1 : 1;
			} else if (30 < user.age && user.age <= 40) {
				ageCount[2] = ageCount[2] ? ageCount[2] + 1 : 1;
			} else if (40 < user.age && user.age <= 50) {
				ageCount[3] = ageCount[3] ? ageCount[3] + 1 : 1;
			} else if (50 < user.age && user.age <= 60) {
				ageCount[4] = ageCount[4] ? ageCount[4] + 1 : 1;
			} else if (60 < user.age && user.age <= 70) {
				ageCount[5] = ageCount[5] ? ageCount[5] + 1 : 1;
			} else if (70 < user.age && user.age <= 80) {
				ageCount[6] = ageCount[6] ? ageCount[6] + 1 : 1;
			} else if (80 < user.age && user.age <= 90) {
				ageCount[7] = ageCount[7] ? ageCount[7] + 1 : 1;
			} else {
				ageCount[8] = ageCount[8] ? ageCount[8] + 1 : 1;
			}
		});		
		return ageCount;
	} catch (err) {
		throw new Error(err);
	}
}

export const getUserId = async (id) => {
	try {
		return await getUserById(id);
	} catch (err) {
		throw new Error(err);
	}
}