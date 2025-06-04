import mongoose from "mongoose";

// Definición del esquema para los eventos
const EventSchema = new mongoose.Schema({
  Evento: String,         // Nombre o título del evento
  Portada: String,        // URL o ruta de la imagen de portada del evento
  Descripcion: String,    // Descripción detallada del evento
  Fecha: String,          // Fecha en que se realizará el evento (como cadena)
  Hora: String,           // Hora de inicio del evento
  HoraF: String,          // Hora de finalización del evento
  Tipo: String,           // Tipo o categoría del evento
  info: String,           // Información adicional sobre el evento
  asociacion: {           // Referencia al usuario o entidad asociada al evento
    type: mongoose.Schema.Types.ObjectId, // Tipo ObjectId para referencia
    ref: 'User'          // Referencia a la colección 'User'
  },
});

// Creación y exportación del modelo "Eventos" basado en el esquema EventSchema
const Evento = mongoose.model("Eventos", EventSchema, "Eventos");
export default Evento;
