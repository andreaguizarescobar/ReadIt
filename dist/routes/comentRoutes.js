// Importa Express para manejar rutas y middleware
import express from "express";
// Importa todas las funciones del controlador de comentarios desde comentController.js
import * as comentController from "../controllers/comentController.js";

// Crea un router de Express para definir rutas relacionadas con comentarios
const router = express.Router();

// Ruta POST para crear un nuevo comentario asociado a un libro identificado por libroId
// Ejemplo: POST /12345 (donde 12345 es el ID del libro)
router.post("/:libroId", comentController.createComentario);

// Ruta POST para agregar una respuesta a un comentario existente identificado por comentarioId
// Ejemplo: POST /6789/respuestas
router.post("/:comentarioId/respuestas", comentController.addRespuestaToComentario);

// Ruta POST para incrementar el contador de "likes" de un comentario identificado por comentarioId
// Ejemplo: POST /6789/like
router.post("/:comentarioId/like", comentController.incrementLikeComentario);

// Ruta POST para decrementar el contador de "likes" de un comentario identificado por comentarioId
// Ejemplo: POST /6789/unlike
router.post("/:comentarioId/unlike", comentController.decrementLikeComentario);

// Ruta POST para incrementar el contador de "likes" de una respuesta específica a un comentario
// Identificados por comentarioId y respuestaId
// Ejemplo: POST /6789/respuestas/234/like
router.post("/:comentarioId/respuestas/:respuestaId/like", comentController.incrementLikeRespuesta);

// Ruta POST para decrementar el contador de "likes" de una respuesta específica a un comentario
// Identificados por comentarioId y respuestaId
// Ejemplo: POST /6789/respuestas/234/unlike
router.post("/:comentarioId/respuestas/:respuestaId/unlike", comentController.decrementLikeRespuesta);

// Ruta GET para obtener todos los comentarios asociados a un libro específico por su libroId
// Ejemplo: GET /libro/12345
router.get("/libro/:libroId", comentController.getComentariosByLibroId);

// Exporta el router configurado para ser usado en la aplicación principal de Express
export default router;
