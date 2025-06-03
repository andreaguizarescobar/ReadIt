// Importa el modelo Club para interactuar con la colección de clubes en la base de datos
import Club from "../models/clubModel.js";
// Importa el modelo User para interactuar con la colección de usuarios
import User from "../models/userModel.js";

// Función que obtiene los 8 clubes con más miembros, ordenados de mayor a menor
export const getAllClubs = async () =>
  await Club.find().sort({ Miembros: -1 }).limit(8);

// Función que obtiene un club específico por su ID, incluyendo los datos del Administrador (solo _id y name)
export const getClub = async id =>
  await Club.findById(id).populate('Administrador', '_id name');

// Función para crear un nuevo club en la base de datos usando los datos recibidos
export const createClub = async data => {
  const nuevoClub = new Club(data); // Crea una instancia nueva de Club con los datos
  return await nuevoClub.save(); // Guarda el club y retorna el resultado
};

// Función para actualizar un club existente por su ID con los datos nuevos, y retorna el club actualizado
export const updateClub = async (id, data) =>
  await Club.findByIdAndUpdate(id, data, { new: true });

// Función para eliminar un club por su ID de la base de datos
export const deleteClub = async id =>
  await Club.findByIdAndDelete(id);

// Función para incrementar el número de miembros en 1 para un club específico
export const incrementMembers = async id => {
  return await Club.findByIdAndUpdate(
    id,
    { $inc: { Miembros: 1 } }, // Incrementa el campo Miembros en 1
    { new: true } // Retorna el documento actualizado
  );
};

// Función para decrementar el número de miembros en 1 para un club específico
export const decrementMembers = async id => {
  return await Club.findByIdAndUpdate(
    id,
    { $inc: { Miembros: -1 } }, // Decrementa el campo Miembros en 1
    { new: true } // Retorna el documento actualizado
  );
};

// Función para obtener los clubes donde un usuario es administrador o miembro
export const getClubsByUser = async userId => {
  const user = await User.findById(userId)
    .populate('club_admin')   // Trae los clubes donde es admin
    .populate('club_miembro'); // Trae los clubes donde es miembro
  if (!user) {
    throw new Error('Usuario no encontrado'); // Arroja error si no existe el usuario
  }
  return {
    adminClubs: user.club_admin,  // Retorna clubes administrados por el usuario
    memberClubs: user.club_miembro // Retorna clubes donde es miembro
  };
};

// Función para buscar clubes por nombre o género con búsqueda insensible a mayúsculas/minúsculas
export const searchClubs = async query => {
  return await Club.find({
    $or: [
      { NombreClub: { $regex: query, $options: 'i' } }, // Busca coincidencia en NombreClub
      { Genero: { $regex: query, $options: 'i' } }      // Busca coincidencia en Genero
    ]
  })
    .limit(10)  // Limita resultados a 10
    .populate('Administrador', 'name'); // Trae solo el nombre del administrador
};
