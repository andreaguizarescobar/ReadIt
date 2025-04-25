import * as clubService from "../services/clubService.js";

export const getClubs = async (req, res) => {
  try {
    const clubes = await clubService.getAllClubs();
    res.status(200).json(clubes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getClub = async (req, res) => {
  try {
    const club = await clubService.getClub(req.params.NombreClub);
    if (!club) return res.status(404).json({ message: "Club no encontrado" });
    res.status(200).json(club);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createClub = async (req, res) => {
  try {
    const nuevoClub = await clubService.createClub(req.body);
    res.status(201).json(nuevoClub);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateClub = async (req, res) => {
  try {
    const clubActualizado = await clubService.updateClub(req.params.nombreClub, req.body);
    if (!clubActualizado) return res.status(404).json({ message: "Club no encontrado" });
    res.status(200).json(clubActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteClub = async (req, res) => {
  try {
    const clubEliminado = await clubService.deleteClub(req.params.id);
    if (!clubEliminado) return res.status(404).json({ message: "Club no encontrado" });
    res.status(200).json({ message: "Club eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const incrementMembers = async (req, res) => {
  try {
    const clubActualizado = await clubService.incrementMembers(req.params.nombreClub);
    if (!clubActualizado) return res.status(404).json({ message: "Club no encontrado" });
    res.status(200).json(clubActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
