import Auth from "../models/auth.model.js";
import { getAuthById , createAuth as create} from "../repositories/auth.repository.js";
import { compare, hash} from "bcrypt";

export const verifyInformation = async (login, password) => {
    
    const auth = await getAuthById(login);
    if (auth && auth.length > 0) {
        const authObject = new Auth(auth[0].login, auth[0].password);
        const match = await compare(password, authObject.password);
        if (match) {
            return auth;
        } else {
            throw new Error("Certaines de vos informations sont incorrectes.");
        }
    }else{
        throw new Error("Certaines de vos informations sont incorrectes.");
    }
    
}

export const createAuth = async (login, password) => {
    const hashedPassword = await hash(password, 12);
    const createdAuth = await create(login, hashedPassword);
    return createdAuth;
}

export const getLoginAuth = async () => {
    if (req.session.authenticated){
        return req.session.login;
    }
}

