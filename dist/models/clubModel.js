import mongoose from "mongoose";
const clubSchema = new mongoose.Schema({
  NombreClub: String,
  Descripcion: String,
  Administrador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  Genero: String,
  Miembros: Number,
  Portada: String,
  Lecturas_curso: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Libros'
  }],
  votacion: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Votaciones'
  }],
  Eventos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Eventos'
  }]
});
const Club = mongoose.model("Clubes", clubSchema, "Clubes");
export default Club;