// Importa las funciones del servicio de votaciones
import * as votacionService from "../services/votacionService.js";

// Controlador para crear una nueva votación
export const createVotacion = async (req, res) => {
  try {
    const data = req.body; // Obtiene los datos de la votación del cuerpo de la solicitud
    const clubId = req.body.clubId; // Extrae el ID del club al que pertenece la votación
    const nuevaVotacion = await votacionService.createVotacion(data, clubId); // Crea una nueva votación en la base de datos
    res.status(201).json(nuevaVotacion); // Devuelve la votación creada con código 201 (creado)
  } catch (error) {
    res.status(500).json({
      error: error.message // En caso de error, devuelve mensaje con código 500 (error del servidor)
    });
  }
};

// Controlador para obtener una votación por su ID
export const getVotacionById = async (req, res) => {
  try {
    const votacion = await votacionService.getVotacionById(req.params.id); // Busca la votación por su ID
    if (!votacion) return res.status(404).json({
      message: "Votacion no encontrada" // Si no existe, devuelve 404
    });
    res.status(200).json(votacion); // Si se encuentra, devuelve la votación con código 200
  } catch (error) {
    res.status(500).json({
      error: error.message // Manejo de errores del servidor
    });
  }
};

// Controlador para obtener la votación activa de un club
export const getCurrentVotacionByClubId = async (req, res) => {
  try {
    const clubId = req.params.clubId; // Obtiene el ID del club desde los parámetros de la URL
    const votacion = await votacionService.getCurrentVotacionByClubId(clubId); // Busca la votación activa del club
    if (!votacion) return res.status(404).json({
      message: "No hay votación activa para este club" // Si no hay, devuelve 404
    });
    res.status(200).json(votacion); // Devuelve la votación activa encontrada
  } catch (error) {
    res.status(500).json({
      error: error.message // Manejo de errores del servidor
    });
  }
};

// Controlador para guardar el voto de un usuario
export const saveUserVote = async (req, res) => {
  try {
    const votacionId = req.params.votacionId; // Obtiene el ID de la votación desde los parámetros
    const {
      tituloVotado
    } = req.body; // Extrae el título por el cual se votó
    const userId = req.body.id; // Obtiene el ID del usuario (se asume que proviene del middleware de autenticación)
    const votacion = await votacionService.saveUserVote(votacionId, userId, tituloVotado); // Guarda el voto en la base de datos
    res.status(200).json(votacion); // Devuelve la votación actualizada
  } catch (error) {
    res.status(500).json({
      error: error.message // En caso de error, devuelve mensaje de error
    });
  }
};

// Controlador para verificar si un usuario ya votó en una votación
export const hasUserVoted = async (req, res) => {
  try {
    const {
      votacionId,
      userId
    } = req.params; // Extrae los IDs de los parámetros
    const voted = await votacionService.hasUserVoted(votacionId, userId); // Verifica si el usuario ya ha votado
    res.status(200).json({
      hasVoted: voted // Devuelve true o false dependiendo si ya votó
    });
  } catch (error) {
    res.status(500).json({
      error: error.message // Manejo de errores del servidor
    });
  }
};
