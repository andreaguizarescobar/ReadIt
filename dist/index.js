import express from "express";
import mongoose from "./db.js";              // Importa la configuración y conexión a la base de datos
import clubRoutes from "./routes/clubRoutes.js";       // Importa rutas para el manejo de clubes
import userRoutes from "./routes/userRoutes.js";       // Importa rutas para el manejo de usuarios
import insigRoutes from "./routes/insigRoutes.js";     // Importa rutas para el manejo de insignias
import cors from "cors";                      // Middleware para habilitar CORS (cross-origin requests)
import libroRoutes from "./routes/libroRoutes.js";     // Importa rutas para el manejo de libros
import eventoRoutes from "./routes/eventoRoutes.js";   // Importa rutas para el manejo de eventos
import votacionRoutes from "./routes/votacionRoutes.js"; // Importa rutas para el manejo de votaciones
import comentRoutes from "./routes/comentRoutes.js";   // Importa rutas para el manejo de comentarios
import reporteRoutes from "./routes/reporteRoutes.js"; // Importa rutas para el manejo de reportes

const app = express();                       // Crear instancia de la aplicación Express

app.use(cors());                            // Habilitar CORS para permitir peticiones desde otros dominios

app.use(express.json({                      // Middleware para parsear JSON en el cuerpo de las peticiones
  limit: '10mb'                            // Limitar tamaño máximo del cuerpo JSON a 10 megabytes
}));

import path from 'path';
import { fileURLToPath } from 'url';

// Obtener la ruta absoluta del archivo actual (import.meta.url) para uso con rutas relativas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos desde el directorio padre del actual (__dirname)
app.use(express.static(path.join(__dirname, '..')));

// Definir rutas base para los diferentes recursos con sus respectivos manejadores
app.use("/clubes", clubRoutes);
app.use("/usuarios", userRoutes);
app.use("/insignias", insigRoutes);
app.use("/libros", libroRoutes);
app.use("/eventos", eventoRoutes);
app.use("/votaciones", votacionRoutes);
app.use("/comentarios", comentRoutes);
app.use("/reporte", reporteRoutes);

const PORT = 3050;                         // Puerto donde el servidor escuchará las peticiones

// Iniciar el servidor y mostrar mensaje en consola cuando esté corriendo
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
