import mongoose from "mongoose";
const reporteSchema = new mongoose.Schema({
  motivo: String,
  fecha: String,
  fechaT: String,
  sancion: String,
  estado: {
    type: String,
    default: "Pendiente"
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comentario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comentarios'
  }
});
const Reporte = mongoose.model("Reportes", reporteSchema, "Reportes");
export default Reporte;