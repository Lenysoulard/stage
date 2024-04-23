import { getContexteId } from "../controllers/contexte.controller.js";
import express from 'express';
const router = express.Router();

router.get('/contexte/:id', getContexteId);

export default router;