// Importa todas las funciones exportadas desde el módulo libroService
import * as libroService from "../services/libroService.js";

// Controlador para obtener todos los libros
export const getAllLibros = async (req, res) => {
  try {
    // Llama al servicio para obtener todos los libros
    const libros = await libroService.getAllLibros();
    
    // Devuelve una respuesta con estado 200 y los libros en formato JSON
    res.status(200).json(libros);
  } catch (error) {
    // Maneja errores internos del servidor y responde con código 500
    res.status(500).json({
      error: error.message
    });
  }
};

// Controlador para obtener un libro por su ID
export const getLibroById = async (req, res) => {
  try {
    // Llama al servicio pasando el ID del libro desde los parámetros de la URL
    const libro = await libroService.getLibroById(req.params.id);

    // Si el libro no existe, responde con un estado 404 (no encontrado)
    if (!libro) return res.status(404).json({
      message: "Libro no encontrado"
    });

    // Si se encuentra el libro, lo devuelve con estado 200
    res.status(200).json(libro);
  } catch (error) {
    // Maneja errores internos del servidor
    res.status(500).json({
      error: error.message
    });
  }
};

// Controlador para crear un nuevo libro
export const createLibro = async (req, res) => {
  try {
    // Obtiene los datos enviados en el cuerpo de la solicitud
    const data = req.body;

    // Si se han enviado archivos en la solicitud (como portada o archivo del libro)
    if (req.files) {
      // Verifica si se ha subido una portada y guarda su ruta en 'data.Portada'
      if (req.files.portadaLibro && req.files.portadaLibro.length > 0) {
        data.Portada = req.files.portadaLibro[0].path;
      }

      // Verifica si se ha subido un archivo de libro y guarda su ruta en 'data.url'
      if (req.files.archivoLibro && req.files.archivoLibro.length > 0) {
        data.url = req.files.archivoLibro[0].path;
      }
    }

    // Extrae el ID del club desde el cuerpo de la solicitud
    const clubId = req.body.clubId;

    // Llama al servicio para crear un nuevo libro con los datos y el ID del club
    const nuevoLibro = await libroService.createLibro(data, clubId);

    // Devuelve el nuevo libro con código 201 (creado)
    res.status(201).json(nuevoLibro);
  } catch (error) {
    // Maneja errores internos del servidor
    res.status(500).json({
      error: error.message
    });
  }
};
