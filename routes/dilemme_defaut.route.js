import { getDilemmeDefaut, getDilemmesDefaut, afficherDilemmes , getDilemmeDefautsExcludeIds } from "../controllers/dilemme_defaut.controller.js";
import express from 'express';
const router = express.Router();

router.get("/dilemmes_defaut/:ids", getDilemmeDefautsExcludeIds );
router.get('/dilemmes_defaut', getDilemmesDefaut);
router.get('/dilemme_defaut/:id', getDilemmeDefaut);
router.get("/participate", afficherDilemmes);

export default router;