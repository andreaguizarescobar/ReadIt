import * as clubService from "../services/clubService.js"; 
// Importa todas las funciones del servicio de clubes para usarlas en los controladores

export const getClubs = async (req, res) => {
  try {
    // Obtiene todos los clubes desde el servicio
    const clubes = await clubService.getAllClubs();
    // Responde con status 200 y envía el listado de clubes en formato JSON
    res.status(200).json(clubes);
  } catch (error) {
    // En caso de error, responde con status 500 y el mensaje del error
    res.status(500).json({ error: error.message });
  }
};

export const getClubsBySearch = async (req, res) => {
  try {
    // Obtiene el parámetro de búsqueda 'q' de la query, o cadena vacía si no existe
    const query = req.query.q || '';
    // Busca clubes que coincidan con el parámetro de búsqueda usando el servicio
    const clubs = await clubService.searchClubs(query);
    // Envía los clubes encontrados con status 200
    res.status(200).json(clubs);
  } catch (error) {
    // Envía un error 500 si ocurre un problema
    res.status(500).json({ error: error.message });
  }
};

export const getClub = async (req, res) => {
  try {
    // Obtiene un club específico según el id recibido en los parámetros de la ruta
    const club = await clubService.getClub(req.params.id);
    // Si no se encuentra el club, responde con status 404 y mensaje de no encontrado
    if (!club) return res.status(404).json({ message: "Club no encontrado" });
    // Si se encuentra, envía el club con status 200
    res.status(200).json(club);
  } catch (error) {
    // Maneja errores internos con status 500
    res.status(500).json({ error: error.message });
  }
};

export const createClub = async (req, res) => {
  try {
    // Crea un nuevo club con los datos enviados en el cuerpo de la petición
    const nuevoClub = await clubService.createClub(req.body);
    // Responde con status 201 (creado) y el nuevo club
    res.status(201).json(nuevoClub);
  } catch (error) {
    // En caso de error, responde con status 500 y el mensaje
    res.status(500).json({ error: error.message });
  }
};

export const updateClub = async (req, res) => {
  try {
    // Actualiza un club existente con id de los parámetros y datos del cuerpo
    const clubActualizado = await clubService.updateClub(req.params.id, req.body);
    // Si no se encuentra el club, responde con 404
    if (!clubActualizado) return res.status(404).json({ message: "Club no encontrado" });
    // Si la actualización fue exitosa, envía el club actualizado con status 200
    res.status(200).json(clubActualizado);
  } catch (error) {
    // Maneja errores internos con status 500
    res.status(500).json({ error: error.message });
  }
};

export const deleteClub = async (req, res) => {
  try {
    // Elimina un club según el id recibido en los parámetros
    const clubEliminado = await clubService.deleteClub(req.params.id);
    // Si no existe el club, responde con status 404
    if (!clubEliminado) return res.status(404).json({ message: "Club no encontrado" });
    // Si se eliminó correctamente, responde con un mensaje de éxito
    res.status(200).json({ message: "Club eliminado exitosamente" });
  } catch (error) {
    // Maneja errores con status 500
    res.status(500).json({ error: error.message });
  }
};

export const incrementMembers = async (req, res) => {
  try {
    // Incrementa el número de miembros de un club por id
    const clubActualizado = await clubService.incrementMembers(req.params.id);
    // Si no existe el club, responde con 404
    if (!clubActualizado) return res.status(404).json({ message: "Club no encontrado" });
    // Envía el club actualizado con status 200
    res.status(200).json(clubActualizado);
  } catch (error) {
    // Maneja errores con status 500
    res.status(500).json({ error: error.message });
  }
};

export const decrementMembers = async (req, res) => {
  try {
    // Decrementa el número de miembros de un club por id
    const clubActualizado = await clubService.decrementMembers(req.params.id);
    // Si el club no existe, responde con 404
    if (!clubActualizado) return res.status(404).json({ message: "Club no encontrado" });
    // Envía el club actualizado con status 200
    res.status(200).json(clubActualizado);
  } catch (error) {
    // Maneja errores internos con status 500
    res.status(500).json({ error: error.message });
  }
};

// Nueva función controlador para obtener clubes asociados a un usuario específico
export const getClubsByUser = async (req, res) => {
  try {
    // Obtiene el id del usuario desde los parámetros de la ruta
    const userId = req.params.userId;
    // Obtiene clubes asociados a ese usuario usando el servicio
    const clubs = await clubService.getClubsByUser(userId);
    // Envía los clubes con status 200
    res.status(200).json(clubs);
  } catch (error) {
    // Maneja errores con status 500
    res.status(500).json({ error: error.message });
  }
};
