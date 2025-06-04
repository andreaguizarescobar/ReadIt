import Club from "../models/clubModel.js";
import User from "../models/userModel.js";

// Obtener todos los clubes, ordenados por número de miembros de mayor a menor, limitando a 8 resultados
export const getAllClubs = async () => await Club.find().sort({ Miembros: -1 }).limit(8);

// Obtener un club por su ID, incluyendo la información del administrador (solo _id y name)
export const getClub = async (id) => await Club.findById(id).populate('Administrador', '_id name');

// Crear un nuevo club con los datos proporcionados y guardarlo en la base de datos
export const createClub = async (data) => {
  const nuevoClub = new Club(data);
  return await nuevoClub.save();
};

// Actualizar un club por su ID con los datos nuevos y retornar el documento actualizado
export const updateClub = async (id, data) =>
  await Club.findByIdAndUpdate(id, data, { new: true });

// Eliminar un club de la base de datos por su ID
export const deleteClub = async (id) => await Club.findByIdAndDelete(id);

// Incrementar el número de miembros del club en 1 y retornar el documento actualizado
export const incrementMembers = async (id) => {
  return await Club.findByIdAndUpdate(
    id,
    { $inc: { Miembros: 1 } },
    { new: true }
  );
};

// Decrementar el número de miembros del club en 1 y retornar el documento actualizado
export const decrementMembers = async (id) => {
  return await Club.findByIdAndUpdate(
    id,
    { $inc: { Miembros: -1 } },
    { new: true }
  );
};

// Nueva función para obtener clubes de un usuario, separando los que administra y los que es miembro
export const getClubsByUser = async (userId) => {
  const user = await User.findById(userId)
    .populate('club_admin') // Poblar con clubes donde es administrador
    .populate('club_miembro'); // Poblar con clubes donde es miembro
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  return {
    adminClubs: user.club_admin,  // Clubes donde el usuario es administrador
    memberClubs: user.club_miembro,  // Clubes donde el usuario es miembro
  };
};

// Nueva función para buscar clubes por nombre o género de forma insensible a mayúsculas/minúsculas
// Limita resultados a 10 y popula el nombre del administrador
export const searchClubs = async (query) => {
  return await Club.find({
    $or: [
      { NombreClub: { $regex: query, $options: 'i' } },  // Buscar coincidencias en el nombre del club
      { Genero: { $regex: query, $options: 'i' } }       // Buscar coincidencias en el género
    ]
  })
    .limit(10)
    .populate('Administrador', 'name'); // Incluir solo el nombre del administrador
};
