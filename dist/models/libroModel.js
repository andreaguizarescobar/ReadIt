import mongoose from "mongoose";
const libroSchema = new mongoose.Schema({
  Libro: String,
  Portada: String,
  Autor: String,
  descripcion: String,
  F_Inicio: String,
  F_Fin: String,
  url: String,
  comentarios: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comentarios'
  }]
});
const Libro = mongoose.model("Libros", libroSchema, "Libros");
export default Libro;