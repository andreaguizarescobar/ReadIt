import Votacion from "../models/votacionModel.js";
import Club from "../models/clubModel.js";

export const createVotacion = async (data, clubId) => {
  const nuevaVotacion = new Votacion(data);
  const savedVotacion = await nuevaVotacion.save();

  // Find the club where the votacion was created
  const club = await Club.findById(clubId );
  if (club) {
    club.votacion.push(savedVotacion._id);
    await club.save();
  }

  return savedVotacion;
};

export const getVotacionById = async (id) => {
  return await Votacion.findById(id);
};

// Get current votacion for a club (where current date is between F_Inicio and F_Fin)
export const getCurrentVotacionByClubId = async (clubId) => {
  const today = new Date().toISOString().split('T')[0];
  const club = await Club.findById(clubId).populate('votacion');
  if (!club) throw new Error("Club no encontrado");

  for (const votacion of club.votacion) {
    if (votacion.F_Inicio <= today && votacion.F_Fin >= today) {
      return votacion;
    }
  }
  return null;
};

// Save a user's vote by updating the votacion document
export const saveUserVote = async (votacionId, userId, tituloVotado) => {
  const votacion = await Votacion.findById(votacionId);
  if (!votacion) throw new Error("Votacion no encontrada");

  // Check if user already voted
  if (votacion.participantes.some(participanteId => participanteId.toString() === userId)) {
    throw new Error("El usuario ya ha votado");
  }

  const libro = votacion.Libro.find(l => l.name === tituloVotado);
  if (!libro) throw new Error("Título no encontrado en la votación");

  libro.votos += 1;
  votacion.participantes.push(userId);
  await votacion.save();
  return votacion;
};
