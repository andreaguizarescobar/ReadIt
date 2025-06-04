import * as reporteService from "../services/reporteService.js";
// Importa todas las funciones del servicio reporteService para manejar la lógica de reportes

export const addReporte = async (req, res) => {
  try {
    // Obtiene los datos del reporte enviados en el cuerpo de la petición
    const data = req.body;
    // Llama al servicio para crear un nuevo reporte con los datos recibidos
    const newReporte = await reporteService.addReporte(data);
    // Responde con estado 201 (creado) y el nuevo reporte en formato JSON
    res.status(201).json(newReporte);
  } catch (error) {
    // En caso de error al guardar, responde con estado 500 y mensaje de error
    res.status(500).json({ message: "Error saving reporte", error: error.message });
  }
};

export const updateReporte = async (req, res) => {
  try {
    // Obtiene el ID del reporte a actualizar desde los parámetros de la ruta
    const IdReporte = req.params.IdReporte;
    // Obtiene los datos actualizados enviados en el cuerpo de la petición
    const data = req.body;
    // Llama al servicio para actualizar el reporte con el ID y los nuevos datos
    const updatedReporte = await reporteService.updateReporte(IdReporte, data);
    // Si no se encuentra el reporte con el ID dado, responde con 404 y mensaje
    if (!updatedReporte) {
      return res.status(404).json({ message: "Reporte no encontrado" });
    }
    // Si se actualiza correctamente, responde con estado 200 y el reporte actualizado
    res.status(200).json(updatedReporte);
  } catch (error) {
    // En caso de error durante la actualización, responde con estado 500 y mensaje de error
    res.status(500).json({ message: "Error actualizando reporte", error: error.message });
  }
};

export const getReportes = async (req, res) => {
  try {
    // Llama al servicio para obtener todos los reportes
    const reportes = await reporteService.getReportes();
    // Responde con estado 200 y la lista de reportes en JSON
    res.status(200).json(reportes);
  } catch (error) {
    // En caso de error al obtener los reportes, responde con estado 500 y mensaje de error
    res.status(500).json({ message: "Error fetching reportes", error: error.message });
  }
};
