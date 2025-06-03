import Comentario from "../models/comentModel.js";
import Libro from "../models/libroModel.js";

// Crea un nuevo comentario para un libro específico
export const createComentario = async (libroId, data) => {
  // Asegura que el campo User sea un array de ObjectIds, aunque venga uno solo
  if (data.User && !Array.isArray(data.User)) {
    data.User = [data.User];
  }
  // Crea una instancia nueva de Comentario con los datos recibidos
  const nuevoComentario = new Comentario(data);
  // Guarda el comentario en la base de datos
  const savedComentario = await nuevoComentario.save();

  // Busca el libro al que se le va a asociar el comentario
  const libro = await Libro.findById(libroId);
  if (libro) {
    // Añade el ID del comentario al array de comentarios del libro
    libro.comentarios.push(savedComentario._id);
    // Guarda los cambios en el libro
    await libro.save();
  }
  // Retorna el comentario creado y guardado
  return savedComentario;
};

// Añade una respuesta a un comentario existente
export const addRespuestaToComentario = async (comentarioId, respuestaData) => {
  // Busca el comentario por su ID
  const comentario = await Comentario.findById(comentarioId);
  if (!comentario) throw new Error("Comentario no encontrado");

  // Asegura que el campo User en la respuesta sea un array
  if (respuestaData.User && !Array.isArray(respuestaData.User)) {
    respuestaData.User = [respuestaData.User];
  }
  // Añade la respuesta al array de respuestas del comentario
  comentario.respuestas.push(respuestaData);
  // Guarda y retorna el comentario actualizado
  return await comentario.save();
};

// Obtiene todos los comentarios de un libro, con datos del usuario que comenta y responde
export const getComentariosByLibroId = async libroId => {
  // Busca el libro y poblamos los comentarios junto con los usuarios que comentaron y respondieron
  const libro = await Libro.findById(libroId).populate({
    path: 'comentarios',
    populate: [{
      path: 'User',
      select: 'name picture' // Solo traer nombre y foto del usuario
    }, {
      path: 'respuestas.User',
      select: 'name picture' // Solo traer nombre y foto para usuarios que respondieron
    }]
  });
  if (!libro) throw new Error("Libro no encontrado");
  return libro;
};

// Incrementa el número de likes de un comentario, asegurando que un usuario no pueda dar like más de una vez
export const incrementLikeComentario = async (comentarioId, userId) => {
  const comentario = await Comentario.findById(comentarioId);
  if (!comentario) throw new Error("Comentario no encontrado");

  // Verifica que el usuario no haya dado like previamente
  if (comentario.likedBy.includes(userId)) {
    throw new Error("El usuario ya ha dado like a este comentario");
  }
  // Incrementa el conteo de likes y agrega el usuario a likedBy
  comentario.likes = (comentario.likes || 0) + 1;
  comentario.likedBy.push(userId);
  await comentario.save();
  return comentario;
};

// Incrementa likes de una respuesta dentro de un comentario, con la misma lógica que para comentarios
export const incrementLikeRespuesta = async (comentarioId, respuestaId, userId) => {
  const comentario = await Comentario.findById(comentarioId);
  if (!comentario) throw new Error("Comentario no encontrado");

  // Busca la respuesta dentro del arreglo de respuestas del comentario
  const respuesta = comentario.respuestas.id(respuestaId);
  if (!respuesta) throw new Error("Respuesta no encontrada");

  // Verifica que el usuario no haya dado like previamente a la respuesta
  if (respuesta.likedBy.includes(userId)) {
    throw new Error("El usuario ya ha dado like a esta respuesta");
  }
  // Incrementa los likes y añade el usuario
  respuesta.likes = (respuesta.likes || 0) + 1;
  respuesta.likedBy.push(userId);
  await comentario.save();
  return comentario;
};

// Decrementa los likes de un comentario, asegurando que el usuario haya dado like antes
export const decrementLikeComentario = async (comentarioId, userId) => {
  const comentario = await Comentario.findById(comentarioId);
  if (!comentario) throw new Error("Comentario no encontrado");

  // Verifica que el usuario haya dado like antes de intentar quitarlo
  if (!comentario.likedBy.includes(userId)) {
    throw new Error("El usuario no ha dado like a este comentario");
  }
  // Decrementa los likes, evitando que bajen de 0
  comentario.likes = (comentario.likes || 0) - 1;
  if (comentario.likes < 0) comentario.likes = 0;

  // Remueve al usuario del arreglo de likedBy
  comentario.likedBy = comentario.likedBy.filter(id => id.toString() !== userId.toString());
  await comentario.save();
  return comentario;
};

// Decrementa likes de una respuesta dentro de un comentario, con verificación similar
export const decrementLikeRespuesta = async (comentarioId, respuestaId, userId) => {
  const comentario = await Comentario.findById(comentarioId);
  if (!comentario) throw new Error("Comentario no encontrado");

  // Busca la respuesta en el arreglo usando id()
  const respuesta = comentario.respuestas.id(respuestaId);
  if (!respuesta) throw new Error("Respuesta no encontrada");

  // Verifica que el usuario haya dado like antes
  if (!respuesta.likedBy.includes(userId)) {
    throw new Error("El usuario no ha dado like a esta respuesta");
  }

  // Decrementa los likes con límite inferior en 0
  respuesta.likes = (respuesta.likes || 0) - 1;
  if (respuesta.likes < 0) respuesta.likes = 0;

  // Elimina el usuario del likedBy
  respuesta.likedBy = respuesta.likedBy.filter(id => id.toString() !== userId.toString());
  await comentario.save();
  return comentario;
};

// Elimina un comentario dado su ID
export const deleteComentario = async comentarioId => {
  const comentario = await Comentario.findById(comentarioId);
  if (!comentario) {
    throw new Error("Comentario no encontrado");
  }
  // Borra el comentario de la base de datos
  await Comentario.findByIdAndDelete(comentarioId);
  return true;
};

// Elimina la referencia de un comentario dentro de un libro (en su array de comentarios)
export const removeComentarioReferenceFromLibro = async comentarioId => {
  // Busca el libro que contiene el comentario
  const libro = await Libro.findOne({
    comentarios: comentarioId
  });
  if (!libro) {
    throw new Error("Libro no encontrado para el comentario");
  }
  // Filtra el array de comentarios para eliminar el comentario indicado
  libro.comentarios = libro.comentarios.filter(id => id.toString() !== comentarioId.toString());
  // Guarda el libro actualizado sin la referencia al comentario eliminado
  await libro.save();
  return true;
};
