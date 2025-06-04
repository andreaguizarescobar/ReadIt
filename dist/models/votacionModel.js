import mongoose from "mongoose";

// Define el esquema para una votación
const votSchema = new mongoose.Schema({
  // Array de libros que se pueden votar, cada uno con un nombre y número de votos (default 0)
  Libro: [{
    name: String,
    votos: {
      type: Number,
      default: 0
    }
  }],
  
  // Array con referencias a los usuarios que han participado en la votación
  participantes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }],

  // Fecha de inicio de la votación
  F_Inicio: String,

  // Fecha de fin de la votación
  F_Fin: String
});

// Crea el modelo 'Votaciones' basado en el esquema y enlazado a la colección 'Votaciones'
const Votacion = mongoose.model("Votaciones", votSchema, "Votaciones");

// Exporta el modelo para usarlo en otras partes de la aplicación
export default Votacion;
