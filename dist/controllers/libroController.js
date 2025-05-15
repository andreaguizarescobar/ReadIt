import * as libroService from "../services/libroService.js";
export const getAllLibros = async (req, res) => {
  try {
    const libros = await libroService.getAllLibros();
    res.status(200).json(libros);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
export const getLibroById = async (req, res) => {
  try {
    const libro = await libroService.getLibroById(req.params.id);
    if (!libro) return res.status(404).json({
      message: "Libro no encontrado"
    });
    res.status(200).json(libro);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
export const createLibro = async (req, res) => {
  try {
    const data = req.body;

    // Handle uploaded files
    if (req.files) {
      if (req.files.portadaLibro && req.files.portadaLibro.length > 0) {
        data.Portada = req.files.portadaLibro[0].path;
      }
      if (req.files.archivoLibro && req.files.archivoLibro.length > 0) {
        data.url = req.files.archivoLibro[0].path;
      }
    }

    // Get clubId from request body
    const clubId = req.body.clubId;
    const nuevoLibro = await libroService.createLibro(data, clubId);
    res.status(201).json(nuevoLibro);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};