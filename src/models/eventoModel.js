import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
      Evento: String,
      Portada: String,
      Descripcion: String,
      Fecha: String,
      Hora: String,
      Tipo: String,
      info: String,
      asociacion: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Evento = mongoose.model("Eventos", EventSchema, "Eventos");
export default Evento;