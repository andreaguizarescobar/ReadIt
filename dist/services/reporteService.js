import Reporte from "../models/reporteModel.js";

// Función para crear y guardar un nuevo reporte en la base de datos
export const addReporte = async data => {
  const reporte = new Reporte(data);  // Crea una nueva instancia del modelo Reporte con los datos recibidos
  return await reporte.save();        // Guarda el reporte en la base de datos y retorna el resultado
};

// Función para actualizar un reporte existente por su ID
export async function updateReporte(IdReporte, data) {
  // Busca el reporte por su ID y actualiza con los nuevos datos
  // La opción { new: true } hace que retorne el documento actualizado
  return await Reporte.findByIdAndUpdate(IdReporte, data, {
    new: true
  });
}

// Función para obtener todos los reportes almacenados
export async function getReportes() {
  // Busca todos los reportes y realiza populate para cargar la información referenciada
  // en los campos 'usuario' y 'comentario'
  return await Reporte.find().populate('usuario').populate('comentario').exec();
}
