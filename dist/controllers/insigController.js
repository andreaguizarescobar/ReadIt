import Insignia from "../models/insigModel.js";
import User from "../models/userModel.js";
export const getInsignias = async (req, res) => {
  try {
    const insignias = await Insignia.find();
    res.status(200).json(insignias);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las insignias",
      error
    });
  }
};
export const getInsigniasByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate('insignias');
    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado"
      });
    }
    res.status(200).json(user.insignias);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las insignias del usuario",
      error
    });
  }
};