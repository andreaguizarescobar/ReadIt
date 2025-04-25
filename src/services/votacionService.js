import Votacion from "../models/votacionModel.js";
import Club from "../models/clubModel.js";

export const createVotacion = async (data) => {
  const nuevaVotacion = new Votacion(data);
  const savedVotacion = await nuevaVotacion.save();

  // Find the club where the votacion was created
  const club = await Club.findOne({ NombreClub: data.NombreClub });
  if (club) {
    club.votacion.push(savedVotacion._id);
    await club.save();
  }

  return savedVotacion;
};

export const getVotacionById = async (id) => {
  return await Votacion.findById(id).populate('Libro');
};
