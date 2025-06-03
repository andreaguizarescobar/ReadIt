import Libro from "../models/libroModel.js";
import Votacion from "../models/votacionModel.js";

// Obtiene todos los libros y además carga los comentarios asociados a cada libro
export const getAllLibros = async () => {
  return await Libro.find().populate('comentarios');
};

// Obtiene un libro específico por su ID
export const getLibroById = async id => {
  return await Libro.findById(id);
};

import Club from "../models/clubModel.js";

// Crea un nuevo libro y opcionalmente lo asocia a un club específico
export const createLibro = async (data, clubId) => {
  // Crear instancia nueva del libro con los datos recibidos
  const nuevoLibro = new Libro(data);
  // Guardar el libro en la base de datos
  const savedLibro = await nuevoLibro.save();

  // Si se proporciona un clubId, se busca el club y se asocia el libro
  if (clubId) {
    const club = await Club.findById(clubId);
    if (club) {
      // Añade el ID del libro al array de lecturas en curso del club
      club.Lecturas_curso.push(savedLibro._id);
      // Guarda los cambios en el club
      await club.save();
    }
  }
  // Retorna el libro creado y guardado
  return savedLibro;
};
