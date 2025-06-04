// Importa todas las funciones del servicio de reportes
import * as reporteService from "../services/reporteService.js";

// Controlador para agregar un nuevo reporte
export const addReporte = async (req, res) => {
  try {
    // Obtiene los datos del cuerpo de la solicitud (request body)
    const data = req.body;

    // Llama al servicio para agregar el reporte con los datos recibidos
    const newReporte = await reporteService.addReporte(data);

    // Devuelve el nuevo reporte creado con estado 201 (creado)
    res.status(201).json(newReporte);
  } catch (error) {
    // En caso de error, responde con estado 500 (error del servidor)
    res.status(500).json({
      message: "Error saving reporte", // Mensaje personalizado
      error: error.message             // Mensaje del error capturado
    });
  }
};

// Controlador para actualizar un reporte existente
export const updateReporte = async (req, res) => {
  try {
    // Obtiene el ID del reporte desde los parámetros de la URL
    const IdReporte = req.params.IdReporte;

    // Obtiene los nuevos datos del reporte desde el cuerpo de la solicitud
    const data = req.body;

    // Llama al servicio para actualizar el reporte con el ID y los nuevos datos
    const updatedReporte = await reporteService.updateReporte(IdReporte, data);

    // Si no se encontró el reporte para actualizar, responde con estado 404 (no encontrado)
    if (!updatedReporte) {
      return res.status(404).json({
        message: "Reporte not found"
      });
    }

    // Si se actualizó correctamente, devuelve el reporte actualizado con estado 200
    res.status(200).json(updatedReporte);
  } catch (error) {
    // En caso de error, responde con estado 500 (error del servidor)
    res.status(500).json({
      message: "Error updating reporte", // Mensaje personalizado
      error: error.message               // Mensaje del error capturado
    });
  }
};

// Controlador para obtener todos los reportes
export const getReportes = async (req, res) => {
  try {
    // Llama al servicio para obtener todos los reportes
    const reportes = await reporteService.getReportes();

    // Devuelve los reportes obtenidos con estado 200 (OK)
    res.status(200).json(reportes);
  } catch (error) {
    // En caso de error, responde con estado 500 (error del servidor)
    res.status(500).json({
      message: "Error fetching reportes", // Mensaje personalizado
      error: error.message                // Mensaje del error capturado
    });
  }
};
