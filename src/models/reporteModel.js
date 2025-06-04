import mongoose from "mongoose";

// Definición del esquema para la colección de reportes
const reporteSchema = new mongoose.Schema({
  motivo: String,  // Razón o motivo del reporte
  fecha: String,  // Fecha en que se realizó el reporte
  fechaT: String,  // Fecha de término o resolución del reporte (puede ser null o vacía si está pendiente)
  sancion: String,  // Sanción asignada tras el reporte, si aplica
  estado: {  // Estado actual del reporte, por defecto es "Pendiente"
    type: String,
    default: "Pendiente"
  },
  usuario: {  // Referencia al usuario que generó el reporte
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comentario: {  // Referencia a un comentario asociado al reporte
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comentarios',
  }
});

// Creación y exportación del modelo "Reportes" basado en el esquema reporteSchema
const Reporte = mongoose.model("Reportes", reporteSchema, "Reportes");
export default Reporte;
