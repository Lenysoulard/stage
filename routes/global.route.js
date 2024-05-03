import express from 'express';
const router = express.Router();

router.get("/", async (req, res) => {
    return res.render("index.ejs", {title: "Accueil"});
});

router.get("/accueil", async (req, res) => {
    return res.render("index.ejs", {title: "Accueil"});
});


router.get("/contact", async (req, res) => {
    return res.render("contact.ejs", {title: "Contact"});
});

router.get("/403", async (req, res) => {
    return res.render("errors/errors.ejs", {title: '403', message: "Désolé, vous n'avez pas les droits pour acceder a cette fonctionnalité."});
});

router.get("/404", async (req, res) => {
    return res.render("errors/errors.ejs", {title: '404', message: "Désolé, la page demandé est impossible à trouver."});
});



export default router;