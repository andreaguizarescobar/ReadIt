import express from "express";
import mongoose from "./db.js";
import clubRoutes from "./routes/clubRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import insigRoutes from "./routes/insigRoutes.js";
import cors from "cors";
import libroRoutes from "./routes/libroRoutes.js";
import eventoRoutes from "./routes/eventoRoutes.js";
import votacionRoutes from "./routes/votacionRoutes.js";
import comentRoutes from "./routes/comentRoutes.js";
import reporteRoutes from "./routes/reporteRoutes.js"

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use("/clubes", clubRoutes);
app.use("/usuarios", userRoutes);
app.use("/insignias", insigRoutes);
app.use("/libros", libroRoutes);
app.use("/eventos", eventoRoutes);
app.use("/votaciones", votacionRoutes);
app.use("/comentarios", comentRoutes);
app.use("/reporte", reporteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
