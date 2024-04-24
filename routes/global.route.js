import express from 'express';
const router = express.Router();

router.get("/", async (req, res) => {
    return res.render("index.ejs");
});

router.get("/home", async (req, res) => {
    return res.render("index.ejs");
});


router.get("/contact", async (req, res) => {
    return res.render("contact.ejs", {title: "Contact"});
});



export default router;