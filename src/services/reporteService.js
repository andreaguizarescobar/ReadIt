import Reporte from "../models/reporteModel.js";

// Crear y guardar un nuevo reporte en la base de datos
export const addReporte = async(data) => {
  const reporte = new Reporte(data);
  return await reporte.save();
};

// Actualizar un reporte existente por su Id y devolver el reporte actualizado
export async function updateReporte(IdReporte, data) {
  return await Reporte.findByIdAndUpdate(IdReporte, data, { new: true });
}

// Obtener todos los reportes, incluyendo datos poblados de usuario y comentario relacionados
export async function getReportes() {
  return await Reporte.find()
    .populate('usuario')  // Reemplaza el campo 'usuario' por el documento completo
    .populate('comentario')  // Reemplaza el campo 'comentario' por el documento completo
    .exec();
}

// Actualizar múltiples reportes que pertenezcan a un usuario específico con los datos recibidos
export async function updateReportesByUserId(userId, updateData) {
  return await Reporte.updateMany(
    { usuario: userId },   // Condición para filtrar reportes por usuario
    { $set: updateData }   // Datos que se van a actualizar
  );
}
