import mongoose from "mongoose";
import dotenv from "dotenv";

// Cargar variables de entorno desde archivo .env
dotenv.config();

// Función autoejecutable para conectar a MongoDB asincrónicamente
(async () => { 
  try {
    // Intentar conexión a MongoDB usando la cadena de conexión del entorno
    await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,     // Usar nuevo parser de URL para conexión
      useUnifiedTopology: true,  // Usar el nuevo motor de topología de MongoDB
    });
    console.log("Conectado a MongoDB"); // Mensaje si la conexión es exitosa
  } catch (error) {
    // Si ocurre error al conectar, mostrar error y salir del proceso
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1);
  }
})();

// Exportar la instancia de mongoose para usar en otras partes del proyecto
export default mongoose;
