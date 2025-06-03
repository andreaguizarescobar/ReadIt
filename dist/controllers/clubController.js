// Importa todos los métodos del servicio de clubes para utilizarlos en los controladores
import * as clubService from "../services/clubService.js";

// Controlador para obtener todos los clubes
export const getClubs = async (req, res) => {
  try {
    // Llama al servicio para obtener todos los clubes
    const clubes = await clubService.getAllClubs();
    // Envía respuesta con código 200 y lista de clubes en formato JSON
    res.status(200).json(clubes);
  } catch (error) {
    // En caso de error, envía un error 500 con el mensaje del error
    res.status(500).json({
      error: error.message
    });
  }
};

// Nuevo controlador para buscar clubes por query y mostrar nombre del administrador
export const getClubsBySearch = async (req, res) => {
  try {
    // Obtiene la query de búsqueda desde los parámetros de consulta, o cadena vacía si no existe
    const query = req.query.q || '';
    // Llama al servicio para buscar clubes que coincidan con la query
    const clubs = await clubService.searchClubs(query);
    // Envía los clubes encontrados con código 200
    res.status(200).json(clubs);
  } catch (error) {
    // En caso de error, responde con código 500 y el mensaje del error
    res.status(500).json({
      error: error.message
    });
  }
};

// Controlador para obtener un club específico por su ID
export const getClub = async (req, res) => {
  try {
    // Llama al servicio para obtener un club usando el parámetro id de la ruta
    const club = await clubService.getClub(req.params.id);
    // Si no existe el club, responde con código 404 y mensaje de no encontrado
    if (!club) return res.status(404).json({
      message: "Club no encontrado"
    });
    // Si existe, responde con el club y código 200
    res.status(200).json(club);
  } catch (error) {
    // Manejo de error, responde con código 500 y mensaje
    res.status(500).json({
      error: error.message
    });
  }
};

// Controlador para crear un nuevo club con datos enviados en el cuerpo de la petición
export const createClub = async (req, res) => {
  try {
    // Llama al servicio para crear un club pasando el cuerpo de la petición
    const nuevoClub = await clubService.createClub(req.body);
    // Responde con código 201 (creado) y el nuevo club creado
    res.status(201).json(nuevoClub);
  } catch (error) {
    // En caso de error, responde con código 500 y mensaje del error
    res.status(500).json({
      error: error.message
    });
  }
};

// Controlador para actualizar un club existente usando ID y datos del cuerpo
export const updateClub = async (req, res) => {
  try {
    // Llama al servicio para actualizar club con el id y nuevos datos
    const clubActualizado = await clubService.updateClub(req.params.id, req.body);
    // Si no se encuentra el club, responde 404 con mensaje
    if (!clubActualizado) return res.status(404).json({
      message: "Club no encontrado"
    });
    // Responde con el club actualizado y código 200
    res.status(200).json(clubActualizado);
  } catch (error) {
    // Manejo de error con código 500 y mensaje
    res.status(500).json({
      error: error.message
    });
  }
};

// Controlador para eliminar un club por su ID
export const deleteClub = async (req, res) => {
  try {
    // Llama al servicio para eliminar el club con el id especificado
    const clubEliminado = await clubService.deleteClub(req.params.id);
    // Si no se encontró club para eliminar, responde con 404
    if (!clubEliminado) return res.status(404).json({
      message: "Club no encontrado"
    });
    // Si se eliminó correctamente, responde con mensaje de éxito y código 200
    res.status(200).json({
      message: "Club eliminado exitosamente"
    });
  } catch (error) {
    // Manejo de error, responde 500 con mensaje
    res.status(500).json({
      error: error.message
    });
  }
};

// Controlador para incrementar el número de miembros de un club por ID
export const incrementMembers = async (req, res) => {
  try {
    // Llama al servicio para incrementar el contador de miembros del club
    const clubActualizado = await clubService.incrementMembers(req.params.id);
    // Si no se encuentra el club, responde 404
    if (!clubActualizado) return res.status(404).json({
      message: "Club no encontrado"
    });
    // Responde con el club actualizado y código 200
    res.status(200).json(clubActualizado);
  } catch (error) {
    // Manejo de error con respuesta 500 y mensaje
    res.status(500).json({
      error: error.message
    });
  }
};

// Controlador para decrementar el número de miembros de un club por ID
export const decrementMembers = async (req, res) => {
  try {
    // Llama al servicio para decrementar el contador de miembros del club
    const clubActualizado = await clubService.decrementMembers(req.params.id);
    // Si club no encontrado, responde 404
    if (!clubActualizado) return res.status(404).json({
      message: "Club no encontrado"
    });
    // Envía club actualizado con código 200
    res.status(200).json(clubActualizado);
  } catch (error) {
    // En caso de error, responde 500 con mensaje
    res.status(500).json({
      error: error.message
    });
  }
};

// Nuevo controlador para obtener clubes asociados a un usuario por su ID
export const getClubsByUser = async (req, res) => {
  try {
    // Obtiene userId desde los parámetros de la ruta
    const userId = req.params.userId;
    // Llama al servicio para obtener clubes asociados a ese usuario
    const clubs = await clubService.getClubsByUser(userId);
    // Envía lista de clubes con código 200
    res.status(200).json(clubs);
  } catch (error) {
    // En caso de error, responde con 500 y mensaje
    res.status(500).json({
      error: error.message
    });
  }
};
