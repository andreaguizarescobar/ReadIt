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
    const updatedComentario = await comentService.incrementLikeComentario(comentarioId);
    res.status(200).json(updatedComentario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const incrementLikeRespuesta = async (req, res) => {
  try {
    const comentarioId = req.params.comentarioId;
    const respuestaId = req.params.respuestaId;
    const updatedComentario = await comentService.incrementLikeRespuesta(comentarioId, respuestaId);
    res.status(200).json(updatedComentario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
