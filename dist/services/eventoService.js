import Evento from "../models/eventoModel.js";
import Club from "../models/clubModel.js";

// Obtiene todos los eventos sin filtro alguno
export const getAllEventos = async () => {
  return await Evento.find();
};

// Crea un nuevo evento y lo asocia a un club específico
export const createEvento = async (data, clubId) => {
  // Crea una instancia nueva de Evento con los datos recibidos
  const nuevoEvento = new Evento(data);
  // Guarda el evento en la base de datos
  const savedEvento = await nuevoEvento.save();

  // Busca el club por su ID para asociar el evento
  const club = await Club.findById(clubId);
  if (club) {
    // Añade el ID del evento al array de eventos del club
    club.Eventos.push(savedEvento._id);
    // Guarda los cambios del club en la base de datos
    await club.save();
  }
  // Retorna el evento creado y guardado
  return savedEvento;
};

// Crea un evento sin asociarlo a un club (ej. eventos de una asociación)
export const createEventoAsociacion = async data => {
  const nuevoEvento = new Evento(data);
  const savedEvento = await nuevoEvento.save();
  return savedEvento;
};

// Obtiene un evento específico por su ID
export const getEventoById = async id => {
  return await Evento.findById(id);
};

// Obtiene los eventos futuros (a partir de hoy) de una asociación específica
export const getUpcomingEventosByAsociacion = async asociacionId => {
  const today = new Date();

  // Busca eventos que pertenezcan a la asociación y cuya fecha sea igual o posterior a hoy
  return await Evento.find({
    asociacion: asociacionId,
    Fecha: {
      $gte: today.toISOString().split('T')[0]  // Fecha en formato yyyy-mm-dd para comparación
    }
  }).sort({
    Fecha: 1  // Orden ascendente por fecha (más próximos primero)
  });
};

// Obtiene todos los eventos futuros que tienen asociación, incluyendo los datos de la asociación
export const getAllUpcomingEventosWithAsociacion = async () => {
  const today = new Date();

  // Busca eventos asociados (asociacion != null) y con fecha igual o mayor a hoy
  return await Evento.find({
    asociacion: {
      $ne: null  // No nulos
    },
    Fecha: {
      $gte: today.toISOString().split('T')[0]
    }
  }).sort({
    Fecha: 1
  })
  // Poblamos la referencia para obtener datos completos de la asociación
  .populate('asociacion');
};
