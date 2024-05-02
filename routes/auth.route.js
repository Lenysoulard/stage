import { login, register } from "../controllers/auth.controller.js";
import express from "express";
const router = express.Router();

router.post("/login", login);
router.get("/login", (req, res) => {
  res.render("auth/login", {title: 'Se Connecter'} );
});

router.post("/register", register);
router.get("/register", (req, res) => {
  res.render("auth/register", {title: "S'inscrire"});
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/");
    }
    res.clearCookie("sid");
    res.redirect("/");
  });
});

export default router;