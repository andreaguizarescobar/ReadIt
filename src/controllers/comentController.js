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
    const comentarios = await comentService.getComentariosByLibroId(req.params.libroId);
    res.status(200).json(comentarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
