import { getDilemmeDefaut, editDilemmeDefaut, createDilemmeDefaut, deleteDilemmeDefaut, getDilemmesDefaut, afficherDilemmes , afficherDilemmes2, getDilemmeDefautsExcludeIds } from "../controllers/dilemme_defaut.controller.js";
import express from 'express';
const router = express.Router();

router.get("/dilemmes_defaut/:ids", getDilemmeDefautsExcludeIds );
router.get('/dilemmes_defaut', getDilemmesDefaut);
router.get('/dilemme_defaut/:id', getDilemmeDefaut);
router.get("/participate", afficherDilemmes2);
router.patch("/dilemme_defaut/:id", editDilemmeDefaut);
router.delete("/dilemme_defaut/:id", deleteDilemmeDefaut);
router.post("/dilemme_defaut", createDilemmeDefaut);

export default router;