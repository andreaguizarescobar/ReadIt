// Importa mongoose para definir el esquema y el modelo
import mongoose from "mongoose";

// Define el esquema para los documentos de Club en MongoDB
const clubSchema = new mongoose.Schema({
  // Nombre del club (tipo String)
  NombreClub: String,

  // Descripción del club (tipo String)
  Descripcion: String,

  // Referencia al usuario que administra el club (relación con el modelo 'User')
  Administrador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  // Género o temática del club (tipo String)
  Genero: String,

  // Número de miembros del club (tipo Number)
  Miembros: Number,

  // Ruta de la imagen de portada del club (tipo String)
  Portada: String,

  // Lista de lecturas en curso asociadas al club (referencia a documentos de la colección 'Libros')
  Lecturas_curso: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Libros'
  }],

  // Lista de votaciones realizadas en el club (referencia a documentos de la colección 'Votaciones')
  votacion: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Votaciones'
  }],

  // Lista de eventos organizados por el club (referencia a documentos de la colección 'Eventos')
  Eventos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Eventos'
  }]
});

// Crea el modelo 'Club' basado en el esquema definido, enlazado con la colección 'Clubes'
const Club = mongoose.model("Clubes", clubSchema, "Clubes");

// Exporta el modelo para usarlo en otras partes de la aplicación
export default Club;
