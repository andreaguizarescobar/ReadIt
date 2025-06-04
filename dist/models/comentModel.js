// Importa mongoose para trabajar con MongoDB y definir esquemas de datos
import mongoose from "mongoose";

// Define el esquema para los comentarios
const comentSchema = new mongoose.Schema({
  // Usuario(s) que hicieron el comentario (referencia al modelo 'User')
  User: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  // Texto del comentario
  comentario: String,

  // Número de "me gusta" que ha recibido el comentario
  likes: {
    type: Number,
    default: 0 // Valor por defecto es 0
  },

  // Lista de usuarios que han dado "me gusta" al comentario
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  // Fecha en que se hizo el comentario (formato de fecha como string)
  fecha: String,

  // Lista de respuestas al comentario
  respuestas: [{
    // Usuario(s) que respondieron (referencia al modelo 'User')
    User: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],

    // Texto de la respuesta
    comentario: String,

    // Número de "me gusta" que ha recibido la respuesta
    likes: {
      type: Number,
      default: 0
    },

    // Lista de usuarios que dieron "me gusta" a la respuesta
    likedBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],

    // Fecha en que se hizo la respuesta
    fecha: String
  }]
});

// Crea el modelo 'Comentario' basado en el esquema, enlazado con la colección 'Comentarios'
const Comentario = mongoose.model("Comentarios", comentSchema, "Comentarios");

// Exporta el modelo para que pueda ser utilizado en otras partes del proyecto
export default Comentario;
