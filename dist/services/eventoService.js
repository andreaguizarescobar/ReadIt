import Evento from "../models/eventoModel.js";
import Club from "../models/clubModel.js";
export const getAllEventos = async () => {
  return await Evento.find();
};
export const createEvento = async (data, clubId) => {
  const nuevoEvento = new Evento(data);
  const savedEvento = await nuevoEvento.save();
  const club = await Club.findById(clubId);
  if (club) {
    club.Eventos.push(savedEvento._id);
    await club.save();
  }
  return savedEvento;
};
export const createEventoAsociacion = async data => {
  const nuevoEvento = new Evento(data);
  const savedEvento = await nuevoEvento.save();
  return savedEvento;
};
export const getEventoById = async id => {
  return await Evento.findById(id);
};
export const getUpcomingEventosByAsociacion = async asociacionId => {
  const today = new Date();
  // Filter events by asociacion and Fecha >= today
  return await Evento.find({
    asociacion: asociacionId,
    Fecha: {
      $gte: today.toISOString().split('T')[0]
    }
  }).sort({
    Fecha: 1
  });
};
export const getAllUpcomingEventosWithAsociacion = async () => {
  const today = new Date();
  return await Evento.find({
    asociacion: {
      $ne: null
    },
    Fecha: {
      $gte: today.toISOString().split('T')[0]
    }
  }).sort({
    Fecha: 1
  }).populate('asociacion');
};