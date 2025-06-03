// Importa el modelo Insignia desde el archivo insigModel.js
import Insignia from "../models/insigModel.js";
// Importa el modelo User desde el archivo userModel.js
import User from "../models/userModel.js";

// Controlador para obtener todas las insignias
export const getInsignias = async (req, res) => {
  try {
    // Busca todas las insignias en la base de datos usando el modelo Insignia
    const insignias = await Insignia.find();
    // Responde con estado 200 y envía la lista de insignias en formato JSON
    res.status(200).json(insignias);
  } catch (error) {
    // Si ocurre un error, responde con estado 500 y un mensaje junto con el error
    res.status(500).json({
      message: "Error al obtener las insignias",
      error
    });
  }
};

// Controlador para obtener las insignias asociadas a un usuario específico
export const getInsigniasByUser = async (req, res) => {
  try {
    // Obtiene el id del usuario desde los parámetros de la ruta
    const userId = req.params.userId;
    // Busca el usuario por su id y al mismo tiempo "popula" el campo 'insignias' con los documentos relacionados
    const user = await User.findById(userId).populate('insignias');
    // Si no se encuentra el usuario, responde con estado 404 y un mensaje
    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado"
      });
    }
    // Si se encuentra el usuario, responde con estado 200 y envía las insignias del usuario en JSON
    res.status(200).json(user.insignias);
  } catch (error) {
    // Si ocurre un error, responde con estado 500 y un mensaje junto con el error
    res.status(500).json({
      message: "Error al obtener las insignias del usuario",
      error
    });
  }
};
