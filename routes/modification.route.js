import {afficherModification2, modifierDilemme} from "../controllers/modification.controller.js";
import express from 'express';
const router = express.Router();

router.get("/admin/modification", afficherModification2);
router.patch("/admin/modifications", modifierDilemme);

export default router;
