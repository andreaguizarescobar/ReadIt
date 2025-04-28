import Libro from "../models/libroModel.js";
import Votacion from "../models/votacionModel.js";

export const getAllLibros = async () => {
  return await Libro.find().populate('comentarios');
};

export const getLibroById = async (id) => {
  return await Libro.findById(id);
};

import Club from "../models/clubModel.js";

export const createLibro = async (data, clubId) => {

  const nuevoLibro = new Libro(data);
  const savedLibro = await nuevoLibro.save();

  if (clubId) {
    const club = await Club.findById(clubId);
    if (club) {
      club.Lecturas_curso.push(savedLibro._id);
      await club.save();
    }
  }

  return savedLibro;
};
