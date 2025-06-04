import Evento from "../models/eventoModel.js";
import Club from "../models/clubModel.js";

// Obtener todos los eventos sin filtro
export const getAllEventos = async () => {
  return await Evento.find();
};

// Crear un nuevo evento asociado a un club específico
export const createEvento = async (data, clubId) => {
  // Crear instancia de Evento con los datos recibidos
  const nuevoEvento = new Evento(data);
  // Guardar el nuevo evento en la base de datos
  const savedEvento = await nuevoEvento.save();

  // Buscar el club por su ID para asociarle el nuevo evento
  const club = await Club.findById(clubId);
  if (club) {
    // Agregar el id del evento al arreglo Eventos del club
    club.Eventos.push(savedEvento._id);
    await club.save();
  }

  return savedEvento;
};

// Crear un nuevo evento asociado a una asociación (sin club)
export const createEventoAsociacion = async (data) => {
  // Crear y guardar el evento con los datos recibidos
  const nuevoEvento = new Evento(data);
  const savedEvento = await nuevoEvento.save();
  return savedEvento;
};

// Obtener un evento por su ID
export const getEventoById = async (id) => {
  return await Evento.findById(id);
};

// Obtener eventos futuros de una asociación específica (fecha igual o mayor a hoy)
export const getUpcomingEventosByAsociacion = async (asociacionId) => {
  const today = new Date();
  // Buscar eventos filtrando por asociación y fecha >= hoy, ordenados por fecha ascendente
  return await Evento.find({
    asociacion: asociacionId,
    Fecha: { $gte: today.toISOString().split('T')[0] }
  }).sort({ Fecha: 1 });
};

// Obtener todos los eventos futuros asociados a cualquier asociación con datos poblados
export const getAllUpcomingEventosWithAsociacion = async () => {
  const today = new Date();
  // Buscar eventos con asociación no nula y fecha >= hoy, ordenados por fecha ascendente
  // Además poblar la información de la asociación en el resultado
  return await Evento.find({
    asociacion: { $ne: null },
    Fecha: { $gte: today.toISOString().split('T')[0] }
  }).sort({ Fecha: 1 }).populate('asociacion');
};
