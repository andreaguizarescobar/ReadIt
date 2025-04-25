import Club from "../models/clubModel.js";

export const getAllClubs = async () => await Club.find();
export const getClub = async (nombreClub) => await Club.findOne({ NombreClub: nombreClub });
export const createClub = async (data) => {
  const nuevoClub = new Club(data);
  return await nuevoClub.save();
};
export const updateClub = async (nombreClub, data) =>
  await Club.findOneAndUpdate({NombreClub: nombreClub}, data, { new: true });
export const deleteClub = async (id) => await Club.findByIdAndDelete(id);

export const incrementMembers = async (nombreClub) => {
  return await Club.findOneAndUpdate(
    { NombreClub: nombreClub },
    { $inc: { Miembros: 1 } },
    { new: true }
  );
};
