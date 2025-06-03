import * as reporteService from "../services/reporteService.js";

export const addReporte = async (req, res) => {
  try {
    const data = req.body;
    const newReporte = await reporteService.addReporte(data);
    res.status(201).json(newReporte);
  } catch (error) {
    res.status(500).json({ message: "Error saving reporte", error: error.message });
  }
};

export const updateReporte = async (req, res) => {
  try {
    const IdReporte = req.params.IdReporte;
    const data = req.body;
    const updatedReporte = await reporteService.updateReporte(IdReporte, data);
    if (!updatedReporte) {
      return res.status(404).json({ message: "Reporte no encontrado" });
    }
    res.status(200).json(updatedReporte);
  } catch (error) {
    res.status(500).json({ message: "Error actualizando reporte", error: error.message });
  }
};

export const getReportes = async (req, res) => {
  try {
    const reportes = await reporteService.getReportes();
    res.status(200).json(reportes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reportes", error: error.message });
  }
};
