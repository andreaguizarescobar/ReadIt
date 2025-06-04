import * as eventoService from "../services/eventoService.js"; 
// Importa todas las funciones del servicio de eventos para usarlas en los controladores

export const getAllEventos = async (req, res) => {
  try {
    // Obtiene todos los eventos desde el servicio
    const eventos = await eventoService.getAllEventos();
    // Responde con status 200 y la lista de eventos
    res.status(200).json(eventos);
  } catch (error) {
    // Si ocurre un error, responde con status 500 y el mensaje de error
    res.status(500).json({ error: error.message });
  }
};

export const createEvento = async (req, res) => {
  try {
    // Obtiene los datos del nuevo evento del cuerpo de la petición
    const data = req.body;
    // Extrae el ID del club desde el cuerpo de la petición
    const clubId = req.body.clubId;
    // Crea un nuevo evento asociado a un club usando el servicio
    const nuevoEvento = await eventoService.createEvento(data, clubId);
    // Responde con status 201 (creado) y el evento creado
    res.status(201).json(nuevoEvento);
  } catch (error) {
    // Maneja errores con status 500
    res.status(500).json({ error: error.message });
  }
};

export const createEventoAsociacion = async (req, res) => {
  try {
    // Obtiene datos del nuevo evento desde el cuerpo de la petición
    const data = req.body;
    // Crea un evento asociado a una asociación usando el servicio
    const nuevoEvento = await eventoService.createEventoAsociacion(data);
    // Responde con status 201 y el evento creado
    res.status(201).json(nuevoEvento);
  } catch (error) {
    // Envía error 500 en caso de fallo
    res.status(500).json({ error: error.message });
  }
};

export const getEventoById = async (req, res) => {
  try {
    // Obtiene el evento por su ID, pasado como parámetro en la ruta
    const evento = await eventoService.getEventoById(req.params.id);
    // Si no se encuentra el evento, responde con status 404 y mensaje
    if (!evento) return res.status(404).json({ message: "Evento no encontrado" });
    // Si se encuentra, responde con status 200 y el evento
    res.status(200).json(evento);
  } catch (error) {
    // Maneja errores con status 500
    res.status(500).json({ error: error.message });
  }
};

export const getUpcomingEventosByAsociacion = async (req, res) => {
  try {
    // Obtiene el ID de la asociación desde los parámetros
    const asociacionId = req.params.id;
    // Obtiene los próximos eventos de esa asociación desde el servicio
    const eventos = await eventoService.getUpcomingEventosByAsociacion(asociacionId);
    // Responde con status 200 y la lista de eventos
    res.status(200).json(eventos);
  } catch (error) {
    // Envía error 500 en caso de problema
    res.status(500).json({ error: error.message });
  }
};

export const getAllUpcomingEventosWithAsociacion = async (req, res) => {
  try {
    // Obtiene todos los próximos eventos con información de la asociación relacionada
    const eventos = await eventoService.getAllUpcomingEventosWithAsociacion();
    // Responde con status 200 y la lista de eventos
    res.status(200).json(eventos);
  } catch (error) {
    // Maneja errores internos con status 500
    res.status(500).json({ error: error.message });
  }
};
