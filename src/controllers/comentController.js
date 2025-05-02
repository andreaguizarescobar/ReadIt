import * as comentService from "../services/comentService.js";

export const createComentario = async (req, res) => {
  try {
    const nuevoComentario = await comentService.createComentario(req.params.libroId, req.body);
    res.status(201).json(nuevoComentario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addRespuestaToComentario = async (req, res) => {
  try {
    const comentarioActualizado = await comentService.addRespuestaToComentario(req.params.comentarioId, req.body);
    res.status(200).json(comentarioActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getComentariosByLibroId = async (req, res) => {
  try {
    const libroId = req.params.libroId;
    const comentarios = await comentService.getComentariosByLibroId(libroId);
    res.status(200).json(comentarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const incrementLikeComentario = async (req, res) => {
  try {
    const comentarioId = req.params.comentarioId;
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No autorizado' });
    }
    const payloadBase64 = token.split('.')[1];
    const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf-8');
    const user = JSON.parse(payloadJson);
    const userId = user.id;

    const updatedComentario = await comentService.incrementLikeComentario(comentarioId, userId);
    res.status(200).json(updatedComentario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const incrementLikeRespuesta = async (req, res) => {
  try {
    const comentarioId = req.params.comentarioId;
    const respuestaId = req.params.respuestaId;
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No autorizado' });
    }
    const payloadBase64 = token.split('.')[1];
    const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf-8');
    const user = JSON.parse(payloadJson);
    const userId = user.id;

    const updatedComentario = await comentService.incrementLikeRespuesta(comentarioId, respuestaId, userId);
    res.status(200).json(updatedComentario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const decrementLikeComentario = async (req, res) => {
  try {
    const comentarioId = req.params.comentarioId;
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No autorizado' });
    }
    const payloadBase64 = token.split('.')[1];
    const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf-8');
    const user = JSON.parse(payloadJson);
    const userId = user.id;

    const updatedComentario = await comentService.decrementLikeComentario(comentarioId, userId);
    res.status(200).json(updatedComentario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const decrementLikeRespuesta = async (req, res) => {
  try {
    const comentarioId = req.params.comentarioId;
    const respuestaId = req.params.respuestaId;
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No autorizado' });
    }
    const payloadBase64 = token.split('.')[1];
    const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf-8');
    const user = JSON.parse(payloadJson);
    const userId = user.id;

    const updatedComentario = await comentService.decrementLikeRespuesta(comentarioId, respuestaId, userId);
    res.status(200).json(updatedComentario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
