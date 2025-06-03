// Importa todas las funciones del servicio eventoService para usarlas en este controlador
import * as eventoService from "../services/eventoService.js";

// Controlador para obtener todos los eventos
export const getAllEventos = async (req, res) => {
  try {
    // Llama al servicio para obtener todos los eventos
    const eventos = await eventoService.getAllEventos();
    // Responde con status 200 y la lista de eventos en formato JSON
    res.status(200).json(eventos);
  } catch (error) {
    // En caso de error, responde con status 500 y el mensaje del error en JSON
    res.status(500).json({
      error: error.message
    });
  }
};

// Controlador para crear un nuevo evento asociado a un club
export const createEvento = async (req, res) => {
  try {
    // Obtiene los datos enviados en el cuerpo de la petición
    const data = req.body;
    // Obtiene el id del club desde el cuerpo de la petición
    const clubId = req.body.clubId;
    // Llama al servicio para crear el evento, pasando los datos y el clubId
    const nuevoEvento = await eventoService.createEvento(data, clubId);
    // Responde con status 201 (creado) y el nuevo evento en JSON
    res.status(201).json(nuevoEvento);
  } catch (error) {
    // En caso de error, responde con status 500 y el mensaje del error
    res.status(500).json({
      error: error.message
    });
  }
};

// Controlador para crear un evento asociado a una asociación (sin club)
export const createEventoAsociacion = async (req, res) => {
  try {
    // Obtiene los datos enviados en el cuerpo de la petición
    const data = req.body;
    // Llama al servicio para crear el evento de asociación con los datos
    const nuevoEvento = await eventoService.createEventoAsociacion(data);
    // Responde con status 201 y el evento creado en JSON
    res.status(201).json(nuevoEvento);
  } catch (error) {
    // En caso de error, responde con status 500 y el mensaje del error
    res.status(500).json({
      error: error.message
    });
  }
};

// Controlador para obtener un evento específico por su id
export const getEventoById = async (req, res) => {
  try {
    // Llama al servicio para obtener el evento usando el id de los parámetros de la ruta
    const evento = await eventoService.getEventoById(req.params.id);
    // Si no se encuentra el evento, responde con status 404 y mensaje
    if (!evento) return res.status(404).json({
      message: "Evento no encontrado"
    });
    // Si se encuentra, responde con status 200 y el evento en JSON
    res.status(200).json(evento);
  } catch (error) {
    // En caso de error, responde con status 500 y mensaje de error
    res.status(500).json({
      error: error.message
    });
  }
};

// Controlador para obtener eventos futuros de una asociación específica
export const getUpcomingEventosByAsociacion = async (req, res) => {
  try {
    // Obtiene el id de la asociación desde los parámetros de la ruta
    const asociacionId = req.params.id;
    // Llama al servicio para obtener los eventos futuros de esa asociación
    const eventos = await eventoService.getUpcomingEventosByAsociacion(asociacionId);
    // Responde con status 200 y la lista de eventos en JSON
    res.status(200).json(eventos);
  } catch (error) {
    // En caso de error, responde con status 500 y mensaje de error
    res.status(500).json({
      error: error.message
    });
  }
};

// Controlador para obtener todos los eventos futuros junto con la información de la asociación
export const getAllUpcomingEventosWithAsociacion = async (req, res) => {
  try {
    // Llama al servicio que obtiene todos los eventos futuros con su asociación
    const eventos = await eventoService.getAllUpcomingEventosWithAsociacion();
    // Responde con status 200 y la lista de eventos en JSON
    res.status(200).json(eventos);
  } catch (error) {
    // En caso de error, responde con status 500 y mensaje de error
    res.status(500).json({
      error: error.message
    });
  }
};
