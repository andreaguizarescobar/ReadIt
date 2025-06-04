import * as comentService from "../services/comentService.js"; 
// Importa todas las funciones del servicio de comentarios para ser usadas en los controladores

export const createComentario = async (req, res) => {
  try {
    // Crea un nuevo comentario asociado a un libro, usando el ID del libro en los parámetros y datos en el cuerpo
    const nuevoComentario = await comentService.createComentario(req.params.libroId, req.body);
    // Responde con status 201 (creado) y el nuevo comentario creado
    res.status(201).json(nuevoComentario);
  } catch (error) {
    // Si ocurre un error, responde con status 500 y el mensaje de error
    res.status(500).json({ error: error.message });
  }
};

export const addRespuestaToComentario = async (req, res) => {
  try {
    // Agrega una respuesta a un comentario existente usando el ID del comentario y datos en el cuerpo
    const comentarioActualizado = await comentService.addRespuestaToComentario(req.params.comentarioId, req.body);
    // Envía el comentario actualizado con status 200
    res.status(200).json(comentarioActualizado);
  } catch (error) {
    // Maneja errores con status 500
    res.status(500).json({ error: error.message });
  }
};

export const getComentariosByLibroId = async (req, res) => {
  try {
    // Obtiene el ID del libro desde los parámetros de la ruta
    const libroId = req.params.libroId;
    // Obtiene todos los comentarios asociados a ese libro desde el servicio
    const comentarios = await comentService.getComentariosByLibroId(libroId);
    // Envía los comentarios con status 200
    res.status(200).json(comentarios);
  } catch (error) {
    // Envía error 500 en caso de falla
    res.status(500).json({ error: error.message });
  }
};

export const incrementLikeComentario = async (req, res) => {
  try {
    // Obtiene el ID del comentario de los parámetros
    const comentarioId = req.params.comentarioId;
    // Extrae el token JWT del encabezado Authorization (formato "Bearer <token>")
    const token = req.headers.authorization?.split(' ')[1];
    // Si no hay token, responde con status 401 (no autorizado)
    if (!token) {
      return res.status(401).json({ error: 'No autorizado' });
    }
    // Decodifica la parte payload del token para obtener datos del usuario
    const payloadBase64 = token.split('.')[1];
    const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf-8');
    const user = JSON.parse(payloadJson);
    // Obtiene el ID del usuario del payload
    const userId = user.id;

    // Incrementa el contador de "likes" del comentario para el usuario dado
    const updatedComentario = await comentService.incrementLikeComentario(comentarioId, userId);
    // Envía el comentario actualizado con status 200
    res.status(200).json(updatedComentario);
  } catch (error) {
    // Maneja errores internos con status 500
    res.status(500).json({ error: error.message });
  }
};

export const incrementLikeRespuesta = async (req, res) => {
  try {
    // Obtiene IDs del comentario y respuesta desde los parámetros
    const comentarioId = req.params.comentarioId;
    const respuestaId = req.params.respuestaId;
    // Extrae y valida token JWT en encabezados
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No autorizado' });
    }
    // Decodifica el payload para obtener información del usuario
    const payloadBase64 = token.split('.')[1];
    const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf-8');
    const user = JSON.parse(payloadJson);
    const userId = user.id;

    // Incrementa el "like" para la respuesta específica del comentario
    const updatedComentario = await comentService.incrementLikeRespuesta(comentarioId, respuestaId, userId);
    // Envía el comentario actualizado con status 200
    res.status(200).json(updatedComentario);
  } catch (error) {
    // Maneja errores con status 500
    res.status(500).json({ error: error.message });
  }
};

export const decrementLikeComentario = async (req, res) => {
  try {
    // Obtiene el ID del comentario desde los parámetros
    const comentarioId = req.params.comentarioId;
    // Extrae y valida el token JWT en el encabezado Authorization
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No autorizado' });
    }
    // Decodifica el payload del token para obtener datos del usuario
    const payloadBase64 = token.split('.')[1];
    const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf-8');
    const user = JSON.parse(payloadJson);
    const userId = user.id;

    // Decrementa el "like" del comentario para el usuario autenticado
    const updatedComentario = await comentService.decrementLikeComentario(comentarioId, userId);
    // Envía el comentario actualizado con status 200
    res.status(200).json(updatedComentario);
  } catch (error) {
    // Maneja errores internos con status 500
    res.status(500).json({ error: error.message });
  }
};

export const decrementLikeRespuesta = async (req, res) => {
  try {
    // Obtiene IDs del comentario y respuesta desde los parámetros
    const comentarioId = req.params.comentarioId;
    const respuestaId = req.params.respuestaId;
    // Extrae el token JWT del encabezado Authorization
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No autorizado' });
    }
    // Decodifica y parsea el payload para obtener usuario
    const payloadBase64 = token.split('.')[1];
    const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf-8');
    const user = JSON.parse(payloadJson);
    const userId = user.id;

    // Decrementa el "like" para la respuesta del comentario para el usuario autenticado
    const updatedComentario = await comentService.decrementLikeRespuesta(comentarioId, respuestaId, userId);
    // Envía el comentario actualizado con status 200
    res.status(200).json(updatedComentario);
  } catch (error) {
    // Maneja errores con status 500
    res.status(500).json({ error: error.message });
  }
};
