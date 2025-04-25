import * as votacionService from "../services/votacionService.js";

export const createVotacion = async (req, res) => {
  try {
    const nuevaVotacion = await votacionService.createVotacion(req.body);
    res.status(201).json(nuevaVotacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getVotacionById = async (req, res) => {
  try {
    const votacion = await votacionService.getVotacionById(req.params.id);
    if (!votacion) return res.status(404).json({ message: "Votacion no encontrada" });
    res.status(200).json(votacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
