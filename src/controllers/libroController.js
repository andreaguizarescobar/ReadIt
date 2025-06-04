import * as libroService from "../services/libroService.js"; 
// Importa todos los métodos del servicio libroService para manejar la lógica de libros

export const getAllLibros = async (req, res) => {
  try {
    // Llama al servicio para obtener todos los libros
    const libros = await libroService.getAllLibros();
    // Responde con estado 200 y la lista de libros en formato JSON
    res.status(200).json(libros);
  } catch (error) {
    // En caso de error, responde con estado 500 y mensaje de error
    res.status(500).json({ error: error.message });
  }
};

export const getLibroById = async (req, res) => {
  try {
    // Obtiene un libro específico por su ID recibido en los parámetros de la ruta
    const libro = await libroService.getLibroById(req.params.id);
    // Si no se encuentra el libro, responde con estado 404 y mensaje
    if (!libro) return res.status(404).json({ message: "Libro no encontrado" });
    // Si se encuentra, responde con estado 200 y el libro en JSON
    res.status(200).json(libro);
  } catch (error) {
    // Maneja cualquier error con estado 500 y mensaje de error
    res.status(500).json({ error: error.message });
  }
};

export const createLibro = async (req, res) => {
  try {
    // Obtiene los datos enviados en el cuerpo de la petición
    const data = req.body;

    // Maneja archivos subidos en la petición (portada y archivo del libro)
    if (req.files) {
      // Si existe archivo para portadaLibro, asigna su ruta al campo Portada
      if (req.files.portadaLibro && req.files.portadaLibro.length > 0) {
        data.Portada = req.files.portadaLibro[0].path;
      }
      // Si existe archivo para archivoLibro, asigna su ruta al campo url
      if (req.files.archivoLibro && req.files.archivoLibro.length > 0) {
        data.url = req.files.archivoLibro[0].path;
      }
    }

    // Obtiene el clubId del cuerpo de la petición
    const clubId = req.body.clubId;

    // Llama al servicio para crear un nuevo libro con los datos y clubId proporcionados
    const nuevoLibro = await libroService.createLibro(data, clubId);
    // Responde con estado 201 y el nuevo libro creado en formato JSON
    res.status(201).json(nuevoLibro);
  } catch (error) {
    // En caso de error, responde con estado 500 y mensaje de error
    res.status(500).json({ error: error.message });
  }
};
