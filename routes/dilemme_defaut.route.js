import { getdilemmeDefaut, getdilemmesDefaut } from "../controllers/dilemme_defaut.controller";
import express from 'express';
const router = express.Router();

router.get('/dilemmes_defaut', getdilemmesDefaut);
router.get('/dilemme_defaut/:id', getdilemmeDefaut);

export default router;