import express from "express";
import * as eventoController from "../controllers/eventoController.js";

const router = express.Router();

router.get("/", eventoController.getAllEventos);
router.get("/:id", eventoController.getEventoById);
router.post("/", eventoController.createEvento);

export default router;
    