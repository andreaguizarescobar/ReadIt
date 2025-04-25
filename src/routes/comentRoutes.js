import express from "express";
import * as comentController from "../controllers/comentController.js";

const router = express.Router();

router.post("/:libroId", comentController.createComentario);
router.post("/:comentarioId/respuestas", comentController.addRespuestaToComentario);
router.get("/libro/:libroId", comentController.getComentariosByLibroId);

export default router;
