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



export default router;