import {afficherModification} from "../controllers/modification.controller.js";
import express from 'express';
const router = express.Router();

router.get("/modification", afficherModification);

export default router;
