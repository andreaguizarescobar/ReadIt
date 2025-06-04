import * as votacionService from "../services/votacionService.js";
// Importa todas las funciones del servicio votacionService para manejar la lógica de votaciones

export const createVotacion = async (req, res) => {
  try {
    // Obtiene los datos para crear la votación desde el cuerpo de la petición
    const data = req.body;
    // Obtiene el ID del club desde el cuerpo de la petición
    const clubId = req.body.clubId;
    // Llama al servicio para crear una nueva votación con los datos y clubId
    const nuevaVotacion = await votacionService.createVotacion(data,clubId);
    // Responde con estado 201 (creado) y la nueva votación en formato JSON
    res.status(201).json(nuevaVotacion);
  } catch (error) {
    // En caso de error, responde con estado 500 y el mensaje de error
    res.status(500).json({ error: error.message });
  }
};

export const getVotacionById = async (req, res) => {
  try {
    // Obtiene el ID de la votación desde los parámetros de la ruta
    const votacion = await votacionService.getVotacionById(req.params.id);
    // Si no existe la votación con ese ID, responde con estado 404 y mensaje
    if (!votacion) return res.status(404).json({ message: "Votacion no encontrada" });
    // Si se encuentra, responde con estado 200 y la votación en JSON
    res.status(200).json(votacion);
  } catch (error) {
    // En caso de error, responde con estado 500 y mensaje de error
    res.status(500).json({ error: error.message });
  }
};

// Get current votacion for a club
export const getCurrentVotacionByClubId = async (req, res) => {
  try {
    // Obtiene el ID del club desde los parámetros de la ruta
    const clubId = req.params.clubId;
    // Valida que el clubId exista
    if (!clubId) {
      // Si clubId no es válido, responde con estado 201 y mensaje
      return res.status(201).json({ message: "ClubId inválido" });
    }
    // Llama al servicio para obtener la votación activa actual del club
    const votacion = await votacionService.getCurrentVotacionByClubId(clubId);
    // Si no hay votación activa, responde con mensaje informativo y estado 201
    if (!votacion) return res.status(201).json({ message: "No hay votación activa para este club" });
    // Si existe, responde con estado 200 y la votación activa
    res.status(200).json(votacion);
  } catch (error) {
    // Si el error es porque no se encontró el club, responde con mensaje adecuado y estado 201
    if (error.message === "Club no encontrado") {
      return res.status(201).json({ message: "Club no encontrado" });
    }
    // Para otros errores responde con estado 500 y mensaje de error
    res.status(500).json({ error: error.message });
  }
};

// Save a user's vote
export const saveUserVote = async (req, res) => {
  try {
    // Obtiene el ID de la votación desde los parámetros de la ruta
    const votacionId = req.params.votacionId;
    // Obtiene el título votado desde el cuerpo de la petición
    const { tituloVotado } = req.body;
    // Obtiene el ID del usuario (se asume que viene en req.body.id o del middleware de autenticación)
    const userId = req.body.id; 
    // Llama al servicio para guardar el voto del usuario en la votación
    const votacion = await votacionService.saveUserVote(votacionId, userId, tituloVotado);
    // Responde con estado 200 y la votación actualizada
    res.status(200).json(votacion);
  } catch (error) {
    // En caso de error, responde con estado 500 y mensaje de error
    res.status(500).json({ error: error.message });
  }
};

export const hasUserVoted = async (req, res) => {
  try {
    // Obtiene el ID de la votación y el ID del usuario desde los parámetros de la ruta
    const { votacionId, userId } = req.params;
    // Llama al servicio para verificar si el usuario ya votó en esa votación
    const voted = await votacionService.hasUserVoted(votacionId, userId);
    // Responde con estado 200 y un objeto indicando si ha votado o no
    res.status(200).json({ hasVoted: voted });
  } catch (error) {
    // En caso de error, responde con estado 500 y mensaje de error
    res.status(500).json({ error: error.message });
  }
};
