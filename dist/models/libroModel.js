// Importa mongoose para definir esquemas y modelos de MongoDB
import mongoose from "mongoose";

// Define el esquema para los libros
const libroSchema = new mongoose.Schema({
  // Título o nombre del libro
  Libro: String,

  // URL o ruta de la imagen de portada del libro
  Portada: String,

  // Nombre del autor del libro
  Autor: String,

  // Descripción o resumen del libro
  descripcion: String,

  // Fecha de inicio (por ejemplo, fecha de lectura o publicación)
  F_Inicio: String,

  // Fecha de fin (por ejemplo, fecha de finalización de lectura)
  F_Fin: String,

  // URL con información adicional o enlace al libro
  url: String,

  // Lista de referencias a comentarios relacionados con el libro
  comentarios: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comentarios'
  }]
});

// Crea el modelo 'Libro' basado en el esquema y enlazado a la colección 'Libros'
const Libro = mongoose.model("Libros", libroSchema, "Libros");

// Exporta el modelo para usarlo en otras partes de la aplicación
export default Libro;
