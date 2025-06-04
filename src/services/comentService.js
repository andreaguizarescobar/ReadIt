import Comentario from "../models/comentModel.js";
import Libro from "../models/libroModel.js";

// Crear un nuevo comentario para un libro específico
export const createComentario = async (libroId, data) => {
  // Asegurar que el campo User sea un arreglo de ObjectIds
  if (data.User && !Array.isArray(data.User)) {
    data.User = [data.User];
  }
  const nuevoComentario = new Comentario(data);
  const savedComentario = await nuevoComentario.save();

  // Agregar el id del comentario recién creado al arreglo comentarios del libro
  const libro = await Libro.findById(libroId);
  if (libro) {
    libro.comentarios.push(savedComentario._id);
    await libro.save();
  }

  return savedComentario;
};

// Agregar una respuesta a un comentario existente
export const addRespuestaToComentario = async (comentarioId, respuestaData) => {
  const comentario = await Comentario.findById(comentarioId);
  if (!comentario) throw new Error("Comentario no encontrado");

  // Asegurar que el campo User en la respuesta sea un arreglo
  if (respuestaData.User && !Array.isArray(respuestaData.User)) {
    respuestaData.User = [respuestaData.User];
  }

  // Añadir la respuesta al arreglo de respuestas del comentario
  comentario.respuestas.push(respuestaData);
  return await comentario.save();
};

// Obtener los comentarios de un libro por su ID, incluyendo datos de usuario y respuestas
export const getComentariosByLibroId = async (libroId) => {
  const libro = await Libro.findById(libroId)
    .populate({
      path: 'comentarios',
      populate: [
        { path: 'User', select: 'name picture' }, // Poblar datos del usuario que hizo el comentario
        { path: 'respuestas.User', select: 'name picture' } // Poblar datos del usuario que respondió
      ]
    });
  if (!libro) throw new Error("Libro no encontrado");

  return libro;
};

// Incrementar el contador de likes de un comentario
export const incrementLikeComentario = async (comentarioId, userId) => {
  const comentario = await Comentario.findById(comentarioId);
  if (!comentario) throw new Error("Comentario no encontrado");

  // Verificar si el usuario ya dio like para evitar duplicados
  if (comentario.likedBy.includes(userId)) {
    throw new Error("El usuario ya ha dado like a este comentario");
  }

  comentario.likes = (comentario.likes || 0) + 1;
  comentario.likedBy.push(userId);
  await comentario.save();
  return comentario;
};

// Incrementar el contador de likes de una respuesta específica dentro de un comentario
export const incrementLikeRespuesta = async (comentarioId, respuestaId, userId) => {
  const comentario = await Comentario.findById(comentarioId);
  if (!comentario) throw new Error("Comentario no encontrado");

  const respuesta = comentario.respuestas.id(respuestaId);
  if (!respuesta) throw new Error("Respuesta no encontrada");

  // Verificar si el usuario ya dio like a la respuesta
  if (respuesta.likedBy.includes(userId)) {
    throw new Error("El usuario ya ha dado like a esta respuesta");
  }

  respuesta.likes = (respuesta.likes || 0) + 1;
  respuesta.likedBy.push(userId);
  await comentario.save();
  return comentario;
};

// Disminuir el contador de likes de un comentario
export const decrementLikeComentario = async (comentarioId, userId) => {
  const comentario = await Comentario.findById(comentarioId);
  if (!comentario) throw new Error("Comentario no encontrado");

  // Verificar que el usuario haya dado like previamente para poder eliminarlo
  if (!comentario.likedBy.includes(userId)) {
    throw new Error("El usuario no ha dado like a este comentario");
  }

  comentario.likes = (comentario.likes || 0) - 1;
  if (comentario.likes < 0) comentario.likes = 0; // Evitar que likes sea negativo
  // Eliminar al usuario del arreglo likedBy
  comentario.likedBy = comentario.likedBy.filter(id => id.toString() !== userId.toString());
  await comentario.save();
  return comentario;
};

// Disminuir el contador de likes de una respuesta específica dentro de un comentario
export const decrementLikeRespuesta = async (comentarioId, respuestaId, userId) => {
  const comentario = await Comentario.findById(comentarioId);
  if (!comentario) throw new Error("Comentario no encontrado");

  const respuesta = comentario.respuestas.id(respuestaId);
  if (!respuesta) throw new Error("Respuesta no encontrada");

  // Verificar que el usuario haya dado like previamente a la respuesta
  if (!respuesta.likedBy.includes(userId)) {
    throw new Error("El usuario no ha dado like a esta respuesta");
  }

  respuesta.likes = (respuesta.likes || 0) - 1;
  if (respuesta.likes < 0) respuesta.likes = 0; // Evitar likes negativos
  // Eliminar al usuario del arreglo likedBy de la respuesta
  respuesta.likedBy = respuesta.likedBy.filter(id => id.toString() !== userId.toString());
  await comentario.save();
  return comentario;
};

// Eliminar un comentario por su ID
export const deleteComentario = async (comentarioId) => {
  const comentario = await Comentario.findById(comentarioId);
  if (!comentario) {
    throw new Error("Comentario no encontrado");
  }
  await Comentario.findByIdAndDelete(comentarioId);
  return true;
};

// Eliminar la referencia de un comentario dentro del arreglo comentarios de un libro
export const removeComentarioReferenceFromLibro = async (comentarioId) => {
  // Buscar el libro que contiene el comentario
  const libro = await Libro.findOne({ comentarios: comentarioId });
  if (!libro) {
    throw new Error("Libro no encontrado para el comentario");
  }
  // Filtrar el arreglo para eliminar el id del comentario
  libro.comentarios = libro.comentarios.filter(id => id.toString() !== comentarioId.toString());
  await libro.save();
  return true;
};
