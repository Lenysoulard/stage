import { getIncarnation, getIncarnationById, getNumberOfIncarnations } from "../controllers/incarnation.controller.js";
import express from "express";
const router = express.Router();

router.get("/incarnation", getIncarnation);
router.get("/incarnation/count", getNumberOfIncarnations);
router.get("/incarnation/:id", getIncarnationById);


export default router;