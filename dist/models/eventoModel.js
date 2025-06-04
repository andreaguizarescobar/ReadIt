// Importa mongoose para definir esquemas y modelos de MongoDB
import mongoose from "mongoose";

// Define el esquema para los eventos
const EventSchema = new mongoose.Schema({
  // Nombre o título del evento
  Evento: String,

  // Imagen de portada del evento (URL o ruta)
  Portada: String,

  // Descripción detallada del evento
  Descripcion: String,

  // Fecha del evento (como string, podría ser en formato ISO o personalizado)
  Fecha: String,

  // Hora de inicio del evento
  Hora: String,

  // Hora de finalización del evento
  HoraF: String,

  // Tipo o categoría del evento
  Tipo: String,

  // Información adicional o complementaria sobre el evento
  info: String,

  // Asociación o usuario relacionado con el evento (referencia al modelo 'User')
  asociacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// Crea el modelo 'Evento' basado en el esquema y enlazado a la colección 'Eventos'
const Evento = mongoose.model("Eventos", EventSchema, "Eventos");

// Exporta el modelo para usarlo en otras partes de la aplicación
export default Evento;
