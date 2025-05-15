import Club from "../models/clubModel.js";
import User from "../models/userModel.js";
export const getAllClubs = async () => await Club.find();
export const getClub = async id => await Club.findById(id);
export const createClub = async data => {
  const nuevoClub = new Club(data);
  return await nuevoClub.save();
};
export const updateClub = async (id, data) => await Club.findByIdAndUpdate(id, data, {
  new: true
});
export const deleteClub = async id => await Club.findByIdAndDelete(id);
export const incrementMembers = async id => {
  return await Club.findByIdAndUpdate(id, {
    $inc: {
      Miembros: 1
    }
  }, {
    new: true
  });
};
export const decrementMembers = async id => {
  return await Club.findByIdAndUpdate(id, {
    $inc: {
      Miembros: -1
    }
  }, {
    new: true
  });
};

// New function to get clubs by user with roles
export const getClubsByUser = async userId => {
  const user = await User.findById(userId).populate('club_admin').populate('club_miembro');
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  return {
    adminClubs: user.club_admin,
    memberClubs: user.club_miembro
  };
};