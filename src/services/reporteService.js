import Reporte from "../models/reporteModel.js";

export const addReporte = async(data) => {
  const reporte = new Reporte(data);
  return await reporte.save();
};

export async function updateReporte(usuario, data) {
  return await Reporte.updateMany({usuario: usuario}, data);
}

export async function getReportes() {
  return await Reporte.find()
    .populate('usuario') 
    .populate('comentario') 
    .exec();
}
