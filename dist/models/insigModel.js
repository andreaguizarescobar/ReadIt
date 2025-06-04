// Importa mongoose para definir esquemas y modelos de MongoDB
import mongoose from "mongoose";

// Define el esquema para las insignias
const insigSchema = new mongoose.Schema({
  // URL o ruta de la imagen de la insignia
  img: String,

  // Nombre o título de la insignia
  nombre: String,

  // Descripción que explica la insignia
  descripcion: String,

  // Porcentaje asociado a la insignia (podría representar progreso o logro)
  porcentaje: Number
});

// Crea el modelo 'Insignia' basado en el esquema y enlazado a la colección 'Insignias'
const Insignia = mongoose.model("Insignias", insigSchema, "Insignias");

// Exporta el modelo para usarlo en otras partes de la aplicación
export default Insignia;
