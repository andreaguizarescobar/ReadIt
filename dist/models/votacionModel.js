import mongoose from "mongoose";
const votSchema = new mongoose.Schema({
  Libro: [{
    name: String,
    votos: {
      type: Number,
      default: 0
    }
  }],
  participantes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }],
  F_Inicio: String,
  F_Fin: String
});
const Votacion = mongoose.model("Votaciones", votSchema, "Votaciones");
export default Votacion;