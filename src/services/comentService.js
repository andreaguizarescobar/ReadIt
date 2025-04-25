import Comentario from "../models/comentModel.js";
import Libro from "../models/libroModel.js";

export const createComentario = async (libroId, data) => {
  const nuevoComentario = new Comentario(data);
  const savedComentario = await nuevoComentario.save();

  // Add comentario to libro's comentarios array
  const libro = await Libro.findById(libroId);
  if (libro) {
    libro.comentarios.push(savedComentario._id);
    await libro.save();
  }

  return savedComentario;
};

export const addRespuestaToComentario = async (comentarioId, respuestaData) => {
  const comentario = await Comentario.findById(comentarioId);
  if (!comentario) throw new Error("Comentario no encontrado");

  comentario.respuestas.push(respuestaData);
  return await comentario.save();
};

export const getComentariosByLibroId = async (libroId) => {
  const libro = await Libro.findById(libroId).populate({
    path: 'comentarios',
    populate: { path: 'User' }
  });
  if (!libro) throw new Error("Libro no encontrado");

  return libro.comentarios;
};
