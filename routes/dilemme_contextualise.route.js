import { getDilemmeContextualiseIdDefaut, getDilemmeContextualiseId } from "../controllers/dilemme_contextualise.controller.js";
import express from 'express';
const router = express.Router();

router.get('/dilemme_contextualise/defaut/:id', getDilemmeContextualiseIdDefaut);
router.get('/dilemme_contextualise/:id', getDilemmeContextualiseId);

export default router;