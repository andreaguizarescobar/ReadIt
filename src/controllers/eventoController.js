import * as eventoService from "../services/eventoService.js";

export const getAllEventos = async (req, res) => {
  try {
    const eventos = await eventoService.getAllEventos();
    res.status(200).json(eventos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createEvento = async (req, res) => {
  try {
    const nuevoEvento = await eventoService.createEvento(req.body);
    res.status(201).json(nuevoEvento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
