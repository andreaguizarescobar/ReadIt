import Comentario from "../models/comentModel.js";
import Libro from "../models/libroModel.js";

export const createComentario = async (libroId, data) => {
  // Ensure User is saved as an array of ObjectIds
  if (data.User && !Array.isArray(data.User)) {
    data.User = [data.User];
  }
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

  // Ensure User in respuesta is an array
  if (respuestaData.User && !Array.isArray(respuestaData.User)) {
    respuestaData.User = [respuestaData.User];
  }

  comentario.respuestas.push(respuestaData);
  return await comentario.save();
};

export const getComentariosByLibroId = async (libroId) => {
  const libro = await Libro.findById(libroId)
    .populate({
      path: 'comentarios',
      populate: [
        { path: 'User', select: 'name picture' },
        { path: 'respuestas.User', select: 'name picture' }
      ]
    });
  if (!libro) throw new Error("Libro no encontrado");

  return libro;
};

export const incrementLikeComentario = async (comentarioId) => {
  const comentario = await Comentario.findById(comentarioId);
  if (!comentario) throw new Error("Comentario no encontrado");

  comentario.likes = (comentario.likes || 0) + 1;
  await comentario.save();
  return comentario;
};

export const incrementLikeRespuesta = async (comentarioId, respuestaId) => {
  const comentario = await Comentario.findById(comentarioId);
  if (!comentario) throw new Error("Comentario no encontrado");

  const respuesta = comentario.respuestas.id(respuestaId);
  if (!respuesta) throw new Error("Respuesta no encontrada");

  respuesta.likes = (respuesta.likes || 0) + 1;
  await comentario.save();
  return comentario;
};
