import * as votacionService from "../services/votacionService.js";

export const createVotacion = async (req, res) => {
  try {
    const data = req.body;
    const clubId = req.body.clubId;
    const nuevaVotacion = await votacionService.createVotacion(data,clubId);
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

// Get current votacion for a club
export const getCurrentVotacionByClubId = async (req, res) => {
  try {
    const clubId = req.params.clubId;
    const votacion = await votacionService.getCurrentVotacionByClubId(clubId);
    if (!votacion) return res.status(404).json({ message: "No hay votación activa para este club" });
    res.status(200).json(votacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Save a user's vote
export const saveUserVote = async (req, res) => {
  try {
    const votacionId = req.params.votacionId;
    const { tituloVotado } = req.body;
    const userId = req.body.id; // Assuming user ID is available in req.user from auth middleware
    const votacion = await votacionService.saveUserVote(votacionId, userId, tituloVotado);
    res.status(200).json(votacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const hasUserVoted = async (req, res) => {
  try {
    const { votacionId, userId } = req.params;
    const voted = await votacionService.hasUserVoted(votacionId, userId);
    res.status(200).json({ hasVoted: voted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
