import mongoose from "mongoose";

// Definición del esquema para la colección de insignias
const insigSchema = new mongoose.Schema({
  img: String,          // URL o ruta de la imagen de la insignia
  nombre: String,       // Nombre de la insignia
  descripcion: String,  // Descripción de la insignia
  porcentaje: Number,   // Porcentaje asociado a la insignia (ej. progreso o logro)
});

// Creación y exportación del modelo "Insignias" basado en el esquema insigSchema
const Insignia = mongoose.model("Insignias", insigSchema, "Insignias");
export default Insignia;
