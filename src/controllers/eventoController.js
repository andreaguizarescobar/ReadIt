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
    const data = req.body;
    const clubId = req.body.clubId;
    const nuevoEvento = await eventoService.createEvento(data, clubId);
    res.status(201).json(nuevoEvento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEventoById = async (req, res) => {
  try {
    const evento = await eventoService.getEventoById(req.params.id);
    if (!evento) return res.status(404).json({ message: "Evento no encontrado" });
    res.status(200).json(evento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
