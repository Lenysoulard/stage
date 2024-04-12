import express from 'express';
const router = express.Router();

router.get("/", async (req, res) => {
    return res.render("index.ejs", {title: "World"});
});

router.get("/particip", async (req, res) => {
    return res.render("userForm.ejs", {title: "Formulaire de participation"});
});

export default router;