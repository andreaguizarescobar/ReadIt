import Votacion from "../models/votacionModel.js";
import Club from "../models/clubModel.js";

// Función para crear una nueva votación y asociarla a un club
export const createVotacion = async (data, clubId) => {
  // Crear una nueva instancia de votación con los datos recibidos
  const nuevaVotacion = new Votacion(data);

  // Guardar la nueva votación en la base de datos
  const savedVotacion = await nuevaVotacion.save();

  // Buscar el club al que se le asignará esta votación
  const club = await Club.findById(clubId);
  if (club) {
    // Añadir el ID de la votación recién creada al array de votaciones del club
    club.votacion.push(savedVotacion._id);

    // Guardar los cambios en el club
    await club.save();
  }

  // Devolver la votación creada
  return savedVotacion;
};

// Función para obtener una votación por su ID
export const getVotacionById = async id => {
  // Buscar y devolver la votación usando el ID
  return await Votacion.findById(id);
};

// Función para obtener la votación actual de un club,
// es decir, aquella cuya fecha actual esté entre F_Inicio y F_Fin
export const getCurrentVotacionByClubId = async clubId => {
  // Obtener la fecha actual en formato YYYY-MM-DD para comparación
  const today = new Date().toISOString().split('T')[0];

  // Buscar el club y popular su campo de votaciones para acceder a ellas
  const club = await Club.findById(clubId).populate('votacion');

  // Si no existe el club, lanzar error
  if (!club) throw new Error("Club no encontrado");

  // Recorrer las votaciones del club para encontrar la actual
  for (const votacion of club.votacion) {
    // Comprobar si la fecha actual está dentro del rango de la votación
    if (votacion.F_Inicio <= today && votacion.F_Fin >= today) {
      // Retornar la votación que está vigente
      return votacion;
    }
  }

  // Si no se encuentra votación activa, devolver null
  return null;
};

// Función para guardar el voto de un usuario en una votación específica
export const saveUserVote = async (votacionId, userId, tituloVotado) => {
  // Buscar la votación por su ID
  const votacion = await Votacion.findById(votacionId);

  // Si no existe la votación, lanzar error
  if (!votacion) throw new Error("Votacion no encontrada");

  // Verificar si el usuario ya ha votado en esta votación
  if (votacion.participantes.some(participanteId => participanteId.toString() === userId)) {
    throw new Error("El usuario ya ha votado");
  }

  // Buscar el libro (opción) que el usuario votó en la lista de libros de la votación
  const libro = votacion.Libro.find(l => l.name === tituloVotado);

  // Si el título no existe en la votación, lanzar error
  if (!libro) throw new Error("Título no encontrado en la votación");

  // Incrementar en 1 los votos del libro seleccionado
  libro.votos += 1;

  // Añadir el ID del usuario a la lista de participantes que ya votaron
  votacion.participantes.push(userId);

  // Guardar los cambios en la votación
  await votacion.save();

  // Devolver la votación actualizada
  return votacion;
};

// Función para verificar si un usuario ya ha votado en una votación
export const hasUserVoted = async (votacionId, userId) => {
  // Buscar la votación por su ID
  const votacion = await Votacion.findById(votacionId);

  // Si no existe la votación, lanzar error
  if (!votacion) throw new Error("Votacion no encontrada");

  // Retornar true o false según si el usuario está en la lista de participantes
  return votacion.participantes.some(participanteId => participanteId.toString() === userId);
};
