import Votacion from "../models/votacionModel.js";
import Club from "../models/clubModel.js";

export const createVotacion = async (data, clubId) => {
  // Crear una nueva instancia de votación con los datos recibidos
  const nuevaVotacion = new Votacion(data);
  // Guardar la votación en la base de datos
  const savedVotacion = await nuevaVotacion.save();

  // Buscar el club asociado donde se creó la votación
  const club = await Club.findById(clubId );
  if (club) {
    // Agregar el ID de la votación al arreglo 'votacion' del club
    club.votacion.push(savedVotacion._id);
    // Guardar los cambios en el club
    await club.save();
  }

  // Retornar la votación guardada
  return savedVotacion;
};

export const getVotacionById = async (id) => {
  // Buscar y retornar la votación por su ID
  return await Votacion.findById(id);
};

// Obtener la votación vigente de un club (fecha actual entre F_Inicio y F_Fin)
export const getCurrentVotacionByClubId = async (clubId) => {
  // Obtener la fecha actual en formato 'YYYY-MM-DD'
  const today = new Date().toISOString().split('T')[0];
  // Buscar el club y poblar su campo 'votacion' con los documentos completos
  const club = await Club.findById(clubId).populate('votacion');
  if (!club) throw new Error("Club no encontrado");

  // Recorrer las votaciones del club
  for (const votacion of club.votacion) {
    // Verificar si la fecha actual está dentro del rango de inicio y fin de la votación
    if (votacion.F_Inicio <= today && votacion.F_Fin >= today) {
      // Retornar la votación vigente
      return votacion;
    }
  }
  // Si no hay votación vigente, retornar null
  return null;
};

// Guardar el voto de un usuario actualizando el documento de votación
export const saveUserVote = async (votacionId, userId, tituloVotado) => {
  // Buscar la votación por su ID
  const votacion = await Votacion.findById(votacionId);
  if (!votacion) throw new Error("Votacion no encontrada");

  // Verificar si el usuario ya ha votado en esta votación
  if (votacion.participantes.some(participanteId => participanteId.toString() === userId)) {
    throw new Error("El usuario ya ha votado");
  }

  // Buscar el libro dentro de la votación que coincida con el título votado
  const libro = votacion.Libro.find(l => l.name === tituloVotado);
  if (!libro) throw new Error("Título no encontrado en la votación");

  // Incrementar el contador de votos del libro seleccionado
  libro.votos += 1;
  // Agregar el usuario a la lista de participantes que ya votaron
  votacion.participantes.push(userId);
  // Guardar los cambios en la votación
  await votacion.save();
  // Retornar la votación actualizada
  return votacion;
};

// Verificar si un usuario ya ha votado en una votación específica
export const hasUserVoted = async (votacionId, userId) => {
  // Buscar la votación por su ID
  const votacion = await Votacion.findById(votacionId);
  if (!votacion) throw new Error("Votacion no encontrada");

  // Retornar true si el usuario está en la lista de participantes, false si no
  return votacion.participantes.some(participanteId => participanteId.toString() === userId);
};
