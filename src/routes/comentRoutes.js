import express from "express";
import * as comentController from "../controllers/comentController.js";

const router = express.Router(); // Crear un router de Express para manejar rutas relacionadas a comentarios

// Ruta para crear un comentario nuevo asociado a un libro por su ID
router.post("/:libroId", comentController.createComentario);

// Ruta para agregar una respuesta a un comentario existente identificado por su ID
router.post("/:comentarioId/respuestas", comentController.addRespuestaToComentario);

// Ruta para aumentar el número de "likes" de un comentario específico
router.post("/:comentarioId/like", comentController.incrementLikeComentario);

// Ruta para disminuir el número de "likes" de un comentario específico (quitar like)
router.post("/:comentarioId/unlike", comentController.decrementLikeComentario);

// Ruta para aumentar el número de "likes" de una respuesta específica dentro de un comentario
router.post("/:comentarioId/respuestas/:respuestaId/like", comentController.incrementLikeRespuesta);

// Ruta para disminuir el número de "likes" de una respuesta específica dentro de un comentario (quitar like)
router.post("/:comentarioId/respuestas/:respuestaId/unlike", comentController.decrementLikeRespuesta);

// Ruta para obtener todos los comentarios asociados a un libro por su ID
router.get("/libro/:libroId", comentController.getComentariosByLibroId);

export default router; // Exportar el router para usarlo en la aplicación principal
