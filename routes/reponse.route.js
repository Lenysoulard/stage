import { createReponse } from "../controllers/reponse.controller.js";
import { numberOfReposne, exportReponse } from "../controllers/statistique.controller.js";
import express from 'express';
const router = express.Router();

router.post('/reponse', createReponse);
router.get('/reponse/number', numberOfReposne);
router.get('/reponse/export', exportReponse);

export default router;