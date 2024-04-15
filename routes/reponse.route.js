import { createReponse } from "../controllers/reponse.controller.js";
import express from 'express';
const router = express.Router();

router.post('/reponse', createReponse);

export default router;