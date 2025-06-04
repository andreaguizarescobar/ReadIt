// Importa mongoose para definir esquemas y modelos de MongoDB
import mongoose from "mongoose";

// Define el esquema para los reportes
const reporteSchema = new mongoose.Schema({
  // Motivo o razón del reporte
  motivo: String,

  // Fecha en que se hizo el reporte
  fecha: String,

  // Fecha de término o resolución del reporte
  fechaT: String,

  // Sanción aplicada al usuario reportado (si aplica)
  sancion: String,

  // Estado actual del reporte, por defecto es "Pendiente"
  estado: {
    type: String,
    default: "Pendiente"
  },

  // Referencia al usuario que fue reportado
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  // Referencia al comentario asociado al reporte
  comentario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comentarios'
  }
});

// Crea el modelo 'Reporte' basado en el esquema y enlazado a la colección 'Reportes'
const Reporte = mongoose.model("Reportes", reporteSchema, "Reportes");

// Exporta el modelo para usarlo en otras partes de la aplicación
export default Reporte;
