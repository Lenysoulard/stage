import { getDilemmeDefaut, getDilemmesDefaut } from "../controllers/dilemme_defaut.controller.js";
import express from 'express';
const router = express.Router();

router.get('/dilemmes_defaut', getDilemmesDefaut);
router.get('/dilemme_defaut/:id', getDilemmeDefaut);

export default router;