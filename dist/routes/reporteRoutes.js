import express from "express";
import { addReporte, updateReporte, getReportes } from "../controllers/reporteController.js";
const router = express.Router();
router.post("/", addReporte);
router.put("/:usuario", updateReporte);
router.get("/", getReportes);
export default router;