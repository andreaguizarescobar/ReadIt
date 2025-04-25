import Libro from "../models/libroModel.js";
import Votacion from "../models/votacionModel.js";

export const getAllLibros = async () => {
  return await Libro.find().populate('comentarios');
};

export const getLibroById = async (id) => {
  return await Libro.findById(id).populate('comentarios');
};

export const createLibro = async (data) => {

  const nuevoLibro = new Libro(data);
  const savedLibro = await nuevoLibro.save();

  const votacion = await Votacion.findOne({
    F_Inicio: { $lte: data.F_Inicio },
    F_Fin: { $gte: data.F_Fin }
  });

  if (votacion) {
    votacion.Libro.push(savedLibro._id);
    await votacion.save();
  }

  return savedLibro;
};
