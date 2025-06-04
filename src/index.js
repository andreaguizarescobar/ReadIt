import express from "express";
import mongoose from "./db.js"; // Importa la conexión a la base de datos
import clubRoutes from "./routes/clubRoutes.js"; // Rutas para clubs
import userRoutes from "./routes/userRoutes.js"; // Rutas para usuarios
import insigRoutes from "./routes/insigRoutes.js"; // Rutas para insignias
import cors from "cors"; // Middleware para habilitar CORS
import libroRoutes from "./routes/libroRoutes.js"; // Rutas para libros
import eventoRoutes from "./routes/eventoRoutes.js"; // Rutas para eventos
import votacionRoutes from "./routes/votacionRoutes.js"; // Rutas para votaciones
import comentRoutes from "./routes/comentRoutes.js"; // Rutas para comentarios
import reporteRoutes from "./routes/reporteRoutes.js"; // Rutas para reportes

const app = express(); // Crear instancia de la aplicación Express

app.use(cors()); // Habilitar CORS para permitir solicitudes desde otros orígenes
app.use(express.json({ limit: '10mb' })); // Middleware para parsear JSON con límite de tamaño

import path from 'path';
import { fileURLToPath } from 'url';

// Obtener rutas absolutas para el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos desde el directorio padre
app.use(express.static(path.join(__dirname, '..')));

// Registrar las rutas con sus respectivos endpoints
app.use("/clubes", clubRoutes);
app.use("/usuarios", userRoutes);
app.use("/insignias", insigRoutes);
app.use("/libros", libroRoutes);
app.use("/eventos", eventoRoutes);
app.use("/votaciones", votacionRoutes);
app.use("/comentarios", comentRoutes);
app.use("/reporte", reporteRoutes);

const PORT = process.env.PORT || 3050; // Definir puerto desde variable de entorno o 3050 por defecto

// Iniciar servidor y escuchar en el puerto definido
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
