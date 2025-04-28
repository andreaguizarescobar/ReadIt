import Evento from "../models/eventoModel.js";
import Club from "../models/clubModel.js";

export const getAllEventos = async () => {
  return await Evento.find();
};

export const createEvento = async (data,clubId) => {
  const nuevoEvento = new Evento(data);
  const savedEvento = await nuevoEvento.save();

  const club = await Club.findById(clubId);
  if (club) {
    club.Eventos.push(savedEvento._id);
    await club.save();
  }

  return savedEvento;
};

export const getEventoById = async (id) => {
  return await Evento.findById(id);
};
