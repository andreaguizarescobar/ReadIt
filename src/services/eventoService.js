import Evento from "../models/eventoModel.js";
import Club from "../models/clubModel.js";

export const getAllEventos = async () => {
  return await Evento.find();
};

export const createEvento = async (data) => {
  const nuevoEvento = new Evento(data);
  const savedEvento = await nuevoEvento.save();

  // Find the club where the event was created
  const club = await Club.findOne({ NombreClub: data.NombreClub });
  if (club) {
    club.Eventos.push(savedEvento._id);
    await club.save();
  }

  return savedEvento;
};
