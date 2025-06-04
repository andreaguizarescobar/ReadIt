import mongoose from "mongoose";

// Definición del esquema para la colección de libros
const libroSchema = new mongoose.Schema({
  Libro: String,  // Título o nombre del libro
  Portada: String,  // URL o ruta de la imagen de la portada del libro
  Autor: String,  // Nombre del autor del libro
  descripcion: String,  // Descripción o resumen del libro
  F_Inicio: String,  // Fecha de inicio de lectura o actividad relacionada
  F_Fin: String,  // Fecha de fin de lectura o actividad relacionada
  url: String,  // URL donde se puede acceder o descargar el libro
  comentarios: [{  // Array con referencias a documentos de comentarios relacionados con el libro
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comentarios',
  }]
});

// Creación y exportación del modelo "Libros" basado en el esquema libroSchema
const Libro = mongoose.model("Libros", libroSchema, "Libros");
export default Libro;
