import { verifyInformation, createAuth } from "../services/auth.service.js";

export const login = async (req, res) => {
    try {
        const { login, password } = req.body;
        if (login && password){
            if (!req.session.authenticated){
                await verifyInformation(login, password);
                req.session.authenticated = true;
                req.session.login = login;
            }
        } else {
            throw new Error("Veuillez remplir tous les champs pour vous connecter.");
        }
        res.redirect('/');
    } catch (err) {
        res.render('auth/login', { error: err.message, title: 'Se Connecter' });
    }
}

export const register = async (req, res) => {
    try {
        const { login, password } = req.body;
        const auth = await createAuth(login, password);
        res.render('index', { auth });
    } catch (err) {
        res.render('auth/register', { error: err.message, title: "S'inscrire" });
    }
}