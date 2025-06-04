import mongoose from "mongoose";

// Definición del esquema para la colección de votaciones
const votSchema = new mongoose.Schema({
  Libro: [  // Array que contiene objetos con nombre del libro y votos acumulados
    {
      name: String,  // Nombre del libro
      votos: { type: Number, default: 0 },  // Número de votos, inicia en 0 por defecto
    },
  ],
  participantes: [  // Lista de usuarios que han participado en la votación
    {
      type: mongoose.Schema.Types.ObjectId,  // Referencia al ID del usuario
      ref: 'Users',  // Referencia al modelo 'Users' (usuarios)
    }
  ],
  F_Inicio: String,  // Fecha de inicio de la votación (como cadena)
  F_Fin: String,     // Fecha de fin de la votación (como cadena)
});

// Creación y exportación del modelo 'Votaciones' basado en votSchema
const Votacion = mongoose.model("Votaciones", votSchema, "Votaciones");
export default Votacion;
