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
export const getComentariosByLibroId = async libroId => {
  const libro = await Libro.findById(libroId).populate({
    path: 'comentarios',
    populate: [{
      path: 'User',
      select: 'name picture'
    }, {
      path: 'respuestas.User',
      select: 'name picture'
    }]
  });
  if (!libro) throw new Error("Libro no encontrado");
  return libro;
};
export const incrementLikeComentario = async (comentarioId, userId) => {
  const comentario = await Comentario.findById(comentarioId);
  if (!comentario) throw new Error("Comentario no encontrado");

  // Check if user already liked
  if (comentario.likedBy.includes(userId)) {
    throw new Error("El usuario ya ha dado like a este comentario");
  }
  comentario.likes = (comentario.likes || 0) + 1;
  comentario.likedBy.push(userId);
  await comentario.save();
  return comentario;
};
export const incrementLikeRespuesta = async (comentarioId, respuestaId, userId) => {
  const comentario = await Comentario.findById(comentarioId);
  if (!comentario) throw new Error("Comentario no encontrado");
  const respuesta = comentario.respuestas.id(respuestaId);
  if (!respuesta) throw new Error("Respuesta no encontrada");

  // Check if user already liked
  if (respuesta.likedBy.includes(userId)) {
    throw new Error("El usuario ya ha dado like a esta respuesta");
  }
  respuesta.likes = (respuesta.likes || 0) + 1;
  respuesta.likedBy.push(userId);
  await comentario.save();
  return comentario;
};
export const decrementLikeComentario = async (comentarioId, userId) => {
  const comentario = await Comentario.findById(comentarioId);
  if (!comentario) throw new Error("Comentario no encontrado");

  // Check if user has liked
  if (!comentario.likedBy.includes(userId)) {
    throw new Error("El usuario no ha dado like a este comentario");
  }
  comentario.likes = (comentario.likes || 0) - 1;
  if (comentario.likes < 0) comentario.likes = 0;
  comentario.likedBy = comentario.likedBy.filter(id => id.toString() !== userId.toString());
  await comentario.save();
  return comentario;
};
export const decrementLikeRespuesta = async (comentarioId, respuestaId, userId) => {
  const comentario = await Comentario.findById(comentarioId);
  if (!comentario) throw new Error("Comentario no encontrado");
  const respuesta = comentario.respuestas.id(respuestaId);
  if (!respuesta) throw new Error("Respuesta no encontrada");

  // Check if user has liked
  if (!respuesta.likedBy.includes(userId)) {
    throw new Error("El usuario no ha dado like a esta respuesta");
  }
  respuesta.likes = (respuesta.likes || 0) - 1;
  if (respuesta.likes < 0) respuesta.likes = 0;
  respuesta.likedBy = respuesta.likedBy.filter(id => id.toString() !== userId.toString());
  await comentario.save();
  return comentario;
};
export const deleteComentario = async comentarioId => {
  const comentario = await Comentario.findById(comentarioId);
  if (!comentario) {
    throw new Error("Comentario no encontrado");
  }
  await Comentario.findByIdAndDelete(comentarioId);
  return true;
};
export const removeComentarioReferenceFromLibro = async comentarioId => {
  // Find the libro that contains the comentarioId in its comentarios array
  const libro = await Libro.findOne({
    comentarios: comentarioId
  });
  if (!libro) {
    throw new Error("Libro no encontrado para el comentario");
  }
  // Remove the comentarioId from the comentarios array
  libro.comentarios = libro.comentarios.filter(id => id.toString() !== comentarioId.toString());
  await libro.save();
  return true;
};