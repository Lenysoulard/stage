import express from 'express';
const router = express.Router();

router.get("/", async (req, res) => {
    return res.render("index.ejs", {title: "World"});
});



export default router;