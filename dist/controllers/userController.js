// Importa las funciones del servicio de usuarios
import * as userService from "../services/userServices.js";
// Importa función para generar token JWT
import { generateToken } from "../utils/jwtUtils.js";

// Registro e inicio de sesión con token (por ejemplo, de Google)
export const registerUser = async (req, res) => {
  try {
    const { token } = req.body; // Obtiene el token del cuerpo de la solicitud
    const user = await userService.registerUser(token); // Registra o verifica el usuario con el token
    const jwtToken = generateToken({ // Genera un JWT con datos del usuario
      id: user._id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      sub: user.sub,
      tipo: user.tipo
    });
    res.json({ // Devuelve el usuario y el token generado
      message: 'Login exitoso',
      user,
      token: jwtToken
    });
  } catch (err) {
    console.error(err); // Muestra el error en consola
    res.status(401).json({ // Devuelve error si el token es inválido
      message: 'Token inválido'
    });
  }
};

// Registro manual de usuario con datos en el cuerpo
export const register = async (req, res) => {
  try {
    const nuevoUser = await userService.register(req.body); // Registra el usuario con los datos recibidos
    const jwtToken = generateToken({ // Genera token JWT
      id: nuevoUser._id,
      email: nuevoUser.email,
      name: nuevoUser.name,
      picture: nuevoUser.picture
    });
    res.json({ // Devuelve el usuario registrado y el token
      message: 'Login exitoso',
      user: nuevoUser,
      token: jwtToken
    });
  } catch (error) {
    res.status(500).json({ // Error del servidor
      error: error.message
    });
  }
};

// Verificación de correo electrónico con token
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query; // Token desde la query string
    const user = await userService.verifyEmail(token); // Verifica el correo
    res.json({ // Devuelve el usuario verificado
      message: 'Correo verificado exitosamente',
      user
    });
  } catch (error) {
    res.status(400).json({ // Error en la verificación
      error: error.message
    });
  }
};

// Inicio de sesión con email y contraseña
export const login = async (req, res) => {
  try {
    const { email, password } = req.body; // Credenciales del cuerpo de la solicitud
    const user = await userService.login(email, password); // Verifica credenciales
    const jwtToken = generateToken({ // Genera JWT
      id: user._id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      tipo: user.tipo
    });
    res.json({ // Devuelve usuario y token
      message: 'Login exitoso',
      user,
      token: jwtToken
    });
  } catch (error) {
    res.status(401).json({ // Error de autenticación
      message: error.message
    });
  }
};

// Obtener usuario por su ID
export const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id); // Busca usuario por ID
    res.status(200).json(user); // Devuelve usuario
  } catch (error) {
    res.status(404).json({ // Usuario no encontrado
      message: error.message
    });
  }
};

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers(); // Obtiene todos los usuarios
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ // Error del servidor
      message: error.message
    });
  }
};

// Actualizar rol de un usuario
export const updateRol = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo } = req.body; // Nuevo tipo (rol)
    const user = await userService.updateRol(id, tipo); // Actualiza el rol
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ // Usuario no encontrado
      message: error.message
    });
  }
};

// Actualizar datos de usuario, incluyendo imágenes si se suben
export const updateUser = async (req, res) => {
  try {
    const updateData = req.body;
    // Procesar archivos subidos si existen
    if (req.files) {
      if (req.files.fotoPerfil && req.files.fotoPerfil.length > 0) {
        let picPath = req.files.fotoPerfil[0].path;
        updateData.picture = picPath;
      }
      if (req.files.portadaUsuario && req.files.portadaUsuario.length > 0) {
        let coverPath = req.files.portadaUsuario[0].path;
        updateData.portada = coverPath;
      }
    }
    const updatedUser = await userService.updateUser(req.params.id, updateData); // Actualiza usuario
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({ // Error al actualizar
      message: error.message
    });
  }
};

// Importa controlador de club para actualizar miembros
import * as clubController from "./clubController.js";

// Agregar un club como miembro del usuario
export const addClubMember = async (req, res) => {
  try {
    const updatedUser = await userService.addClubMember(req.params.userId, req.params.clubId); // Agrega club
    // Incrementa contador de miembros en el club
    await clubController.incrementMembers({
      params: {
        id: req.params.clubId
      }
    }, {
      status: () => ({
        json: () => {}
      })
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({ // Error
      message: error.message
    });
  }
};

// Remover un club como miembro del usuario
export const removeClubMember = async (req, res) => {
  try {
    const updatedUser = await userService.removeClubMember(req.params.userId, req.params.clubId); // Elimina club
    // Disminuye contador de miembros en el club
    await clubController.decrementMembers({
      params: {
        id: req.params.clubId
      }
    }, {
      status: () => ({
        json: () => {}
      })
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({ // Error
      message: error.message
    });
  }
};

// Asignar a usuario como administrador de un club
export const addClubAdmin = async (req, res) => {
  try {
    const updatedUser = await userService.addClubAdmin(req.params.userId, req.params.clubId); // Agrega como admin
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};

// Obtener el rol del usuario dentro de un club
export const getUserClubRole = async (req, res) => {
  try {
    const role = await userService.getUserClubRole(req.params.userId, req.params.clubId); // Consulta rol
    res.status(200).json({
      role
    });
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};

// Agregar una insignia al usuario
export const addInsigniaToUser = async (req, res) => {
  try {
    const { userId, insigniaId } = req.params;
    const updatedUser = await userService.addInsigniaToUser(userId, insigniaId); // Asigna insignia
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};

// Importa servicio de comentarios
import * as comentService from "../services/comentService.js";

// Aplicar sanción a usuario y eliminar comentario
export const applySanctionAndDeleteComment = async (req, res) => {
  try {
    const {
      userId,
      comentarioId,
      status,
      razon,
      duracion,
      finBan
    } = req.body;

    // Verifica que se envíen los datos necesarios
    if (!userId || !comentarioId) {
      return res.status(400).json({
        message: "userId and comentarioId are required"
      });
    }

    // Aplica la sanción al usuario
    const sanctionedUser = await userService.applySanctionToUser(userId, {
      status,
      razon,
      duracion,
      finBan
    });

    // Elimina la referencia del comentario (no borra el comentario)
    await comentService.removeComentarioReferenceFromLibro(comentarioId);
    res.status(200).json({
      message: "Sanction applied and comment reference removed",
      user: sanctionedUser
    });
  } catch (error) {
    res.status(500).json({
      message: "Error applying sanction and removing comment reference",
      error: error.message
    });
  }
};

// Eliminar sanción (ban) de un usuario
export const removeBan = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({
        message: "userId is required"
      });
    }
    const updatedUser = await userService.removeBanFromUser(userId); // Quita la sanción
    res.status(200).json({
      message: "Ban removed",
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      message: "Error removing ban",
      error: error.message
    });
  }
};

// Enviar correo de recuperación de contraseña
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Email is required"
      });
    }
    await userService.forgotPassword(email); // Envía correo de recuperación
    res.status(200).json({
      message: "Correo de restablecimiento enviado"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Restablecer la contraseña usando token
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({
        message: "Token and new password are required"
      });
    }
    await userService.resetPassword(token, newPassword); // Cambia la contraseña
    res.status(200).json({
      message: "Contraseña actualizada exitosamente"
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};
