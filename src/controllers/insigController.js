import Insignia from "../models/insigModel.js"; 
// Importa el modelo Insignia para acceder a la colección de insignias en la base de datos
import User from "../models/userModel.js"; 
// Importa el modelo User para acceder a la colección de usuarios

export const getInsignias = async (req, res) => {
  try {
    // Busca todas las insignias en la base de datos
    const insignias = await Insignia.find();
    // Responde con status 200 y el arreglo de insignias
    res.status(200).json(insignias);
  } catch (error) {
    // En caso de error, responde con status 500 y mensaje de error
    res.status(500).json({ message: "Error al obtener las insignias", error });
  }
};

export const getInsigniasByUser = async (req, res) => {
  try {
    // Obtiene el ID del usuario desde los parámetros de la ruta
    const userId = req.params.userId;
    // Busca al usuario por ID y llena el campo 'insignias' con los documentos relacionados
    const user = await User.findById(userId).populate('insignias');
    // Si no se encuentra el usuario, responde con status 404 y mensaje
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    // Si se encuentra, responde con status 200 y las insignias del usuario
    res.status(200).json(user.insignias);
  } catch (error) {
    // Maneja errores con status 500 y mensaje de error
    res.status(500).json({ message: "Error al obtener las insignias del usuario", error });
  }
};
