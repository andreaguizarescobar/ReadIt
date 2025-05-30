import express from "express";
import { addReporte, updateReporte, getReportes } from "../controllers/reporteController.js";
import { authenticateJWT } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", addReporte);
router.put("/:IdReporte", authenticateJWT, updateReporte);
router.get("/", authenticateJWT, getReportes);

export default router;
