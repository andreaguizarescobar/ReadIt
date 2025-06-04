import mongoose from "mongoose";
import dotenv from "dotenv";

// Cargar variables de entorno desde un archivo .env
dotenv.config();

(async () => {
  try {
    // Intentar conectar a la base de datos MongoDB usando la cadena de conexión del entorno
    await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,       // Usar el nuevo analizador de URL para la conexión
      useUnifiedTopology: true     // Usar el nuevo motor de gestión de conexiones
    });
    // Si la conexión es exitosa, mostrar mensaje en consola
    console.log("Conectado a MongoDB");
  } catch (error) {
    // Si ocurre un error al conectar, mostrar el error y terminar el proceso
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1);               // Salir del proceso con código de error
  }
})();

// Exportar la instancia de mongoose para usarla en otros módulos
export default mongoose;
