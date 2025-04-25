import Insignia from "../models/insigModel.js";

export const getInsignias = async (req, res) => {
  try {
    const insignias = await Insignia.find();
    res.status(200).json(insignias);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las insignias", error });
  }
};
