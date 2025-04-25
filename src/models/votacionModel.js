import mongoose from "mongoose";

const votSchema = new mongoose.Schema({
      Libro: [
        {type: mongoose.Schema.Types.ObjectId,
        ref: 'Libros',
        votos: {type: Number, default: 0}, 
      },
    ],
      F_Inicio: String,
      F_Fin: String,
});

const Votacion = mongoose.model("Votaciones", votSchema, "Votaciones");
export default Votacion;