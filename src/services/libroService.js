import Libro from "../models/libroModel.js";
import Votacion from "../models/votacionModel.js";

// Obtener todos los libros, incluyendo sus comentarios relacionados
export const getAllLibros = async () => {
  return await Libro.find().populate('comentarios');
};

// Obtener un libro específico por su ID
export const getLibroById = async (id) => {
  return await Libro.findById(id);
};

import Club from "../models/clubModel.js";

// Crear un nuevo libro y asociarlo opcionalmente a un club
export const createLibro = async (data, clubId) => {

  // Crear una nueva instancia de Libro con los datos recibidos
  const nuevoLibro = new Libro(data);
  // Guardar el nuevo libro en la base de datos
  const savedLibro = await nuevoLibro.save();

  // Si se proporciona un clubId, buscar el club correspondiente
  if (clubId) {
    const club = await Club.findById(clubId);
    if (club) {
      // Agregar el libro recién creado al arreglo Lecturas_curso del club
      club.Lecturas_curso.push(savedLibro._id);
      await club.save();
    }
  }

  // Devolver el libro guardado
  return savedLibro;
};
