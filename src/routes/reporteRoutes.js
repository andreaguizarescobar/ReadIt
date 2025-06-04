import express from "express";
import { addReporte, updateReporte, getReportes } from "../controllers/reporteController.js";
import { authenticateJWT } from "../middleware/authMiddleware.js";

const router = express.Router(); // Crear un router de Express para manejar rutas relacionadas a reportes

router.post("/", addReporte); 
// Ruta para crear un nuevo reporte, no requiere autenticación

router.put("/:IdReporte", authenticateJWT, updateReporte); 
// Ruta para actualizar un reporte específico por IdReporte
// Requiere autenticación mediante JWT para permitir la modificación

router.get("/", authenticateJWT, getReportes); 
// Ruta para obtener todos los reportes
// Requiere autenticación mediante JWT para acceder a los datos

export default router; // Exportar el router para usarlo en la aplicación principal
