import * as comentService from "../services/comentService.js"; 
// Importa todos los métodos del servicio de comentarios desde el archivo comentService.js

export const createComentario = async (req, res) => {
  try {
    // Llama al servicio para crear un nuevo comentario asociado a un libro
    const nuevoComentario = await comentService.createComentario(req.params.libroId, req.body);
    // Responde con el comentario creado y código HTTP 201 (creado)
    res.status(201).json(nuevoComentario);
  } catch (error) {
    // En caso de error, responde con código 500 y el mensaje de error
    res.status(500).json({
      error: error.message
    });
  }
};

export const addRespuestaToComentario = async (req, res) => {
  try {
    // Añade una respuesta a un comentario existente usando el ID del comentario y el cuerpo de la petición
    const comentarioActualizado = await comentService.addRespuestaToComentario(req.params.comentarioId, req.body);
    // Responde con el comentario actualizado y código HTTP 200 (OK)
    res.status(200).json(comentarioActualizado);
  } catch (error) {
    // En caso de error, responde con código 500 y el mensaje de error
    res.status(500).json({
      error: error.message
    });
  }
};

export const getComentariosByLibroId = async (req, res) => {
  try {
    // Obtiene el ID del libro desde los parámetros de la URL
    const libroId = req.params.libroId;
    // Llama al servicio para obtener todos los comentarios asociados a ese libro
    const comentarios = await comentService.getComentariosByLibroId(libroId);
    // Envía los comentarios con código 200 (OK)
    res.status(200).json(comentarios);
  } catch (error) {
    // Manejo de errores con código 500 y mensaje de error
    res.status(500).json({
      error: error.message
    });
  }
};

export const incrementLikeComentario = async (req, res) => {
  try {
    // Obtiene el ID del comentario desde los parámetros de la URL
    const comentarioId = req.params.comentarioId;
    // Extrae el token JWT del header de autorización (Bearer token)
    const token = req.headers.authorization?.split(' ')[1];
    // Si no hay token, responde con error 401 (no autorizado)
    if (!token) {
      return res.status(401).json({
        error: 'No autorizado'
      });
    }
    // Decodifica el payload del token para obtener la información del usuario
    const payloadBase64 = token.split('.')[1];
    const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf-8');
    const user = JSON.parse(payloadJson);
    // Extrae el ID del usuario del payload
    const userId = user.id;
    // Llama al servicio para incrementar el like en el comentario para el usuario dado
    const updatedComentario = await comentService.incrementLikeComentario(comentarioId, userId);
    // Envía el comentario actualizado con código 200 (OK)
    res.status(200).json(updatedComentario);
  } catch (error) {
    // Manejo de errores con código 500 y mensaje de error
    res.status(500).json({
      error: error.message
    });
  }
};

export const incrementLikeRespuesta = async (req, res) => {
  try {
    // Obtiene el ID del comentario y la respuesta desde los parámetros de la URL
    const comentarioId = req.params.comentarioId;
    const respuestaId = req.params.respuestaId;
    // Extrae el token JWT del header de autorización (Bearer token)
    const token = req.headers.authorization?.split(' ')[1];
    // Si no hay token, responde con error 401 (no autorizado)
    if (!token) {
      return res.status(401).json({
        error: 'No autorizado'
      });
    }
    // Decodifica el payload del token para obtener la información del usuario
    const payloadBase64 = token.split('.')[1];
    const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf-8');
    const user = JSON.parse(payloadJson);
    // Extrae el ID del usuario del payload
    const userId = user.id;
    // Llama al servicio para incrementar el like en la respuesta específica para el usuario dado
    const updatedComentario = await comentService.incrementLikeRespuesta(comentarioId, respuestaId, userId);
    // Envía el comentario actualizado con código 200 (OK)
    res.status(200).json(updatedComentario);
  } catch (error) {
    // Manejo de errores con código 500 y mensaje de error
    res.status(500).json({
      error: error.message
    });
  }
};

export const decrementLikeComentario = async (req, res) => {
  try {
    // Obtiene el ID del comentario desde los parámetros de la URL
    const comentarioId = req.params.comentarioId;
    // Extrae el token JWT del header de autorización (Bearer token)
    const token = req.headers.authorization?.split(' ')[1];
    // Si no hay token, responde con error 401 (no autorizado)
    if (!token) {
      return res.status(401).json({
        error: 'No autorizado'
      });
    }
    // Decodifica el payload del token para obtener la información del usuario
    const payloadBase64 = token.split('.')[1];
    const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf-8');
    const user = JSON.parse(payloadJson);
    // Extrae el ID del usuario del payload
    const userId = user.id;
    // Llama al servicio para decrementar el like en el comentario para el usuario dado
    const updatedComentario = await comentService.decrementLikeComentario(comentarioId, userId);
    // Envía el comentario actualizado con código 200 (OK)
    res.status(200).json(updatedComentario);
  } catch (error) {
    // Manejo de errores con código 500 y mensaje de error
    res.status(500).json({
      error: error.message
    });
  }
};

export const decrementLikeRespuesta = async (req, res) => {
  try {
    // Obtiene el ID del comentario y la respuesta desde los parámetros de la URL
    const comentarioId = req.params.comentarioId;
    const respuestaId = req.params.respuestaId;
    // Extrae el token JWT del header de autorización (Bearer token)
    const token = req.headers.authorization?.split(' ')[1];
    // Si no hay token, responde con error 401 (no autorizado)
    if (!token) {
      return res.status(401).json({
        error: 'No autorizado'
      });
    }
    // Decodifica el payload del token para obtener la información del usuario
    const payloadBase64 = token.split('.')[1];
    const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf-8');
    const user = JSON.parse(payloadJson);
    // Extrae el ID del usuario del payload
    const userId = user.id;
    // Llama al servicio para decrementar el like en la respuesta específica para el usuario dado
    const updatedComentario = await comentService.decrementLikeRespuesta(comentarioId, respuestaId, userId);
    // Envía el comentario actualizado con código 200 (OK)
    res.status(200).json(updatedComentario);
  } catch (error) {
    // Manejo de errores con código 500 y mensaje de error
    res.status(500).json({
      error: error.message
    });
  }
};
