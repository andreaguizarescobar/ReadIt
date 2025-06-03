import * as userService from "../services/userServices.js";
import { generateToken } from "../utils/jwtUtils.js";
import { updateReportesByUserId } from "../services/reporteService.js";

// Registro de usuario con token externo
export const registerUser = async (req, res) => {
  try {
    const { token } = req.body; // Se extrae el token del cuerpo de la petición
    const user = await userService.registerUser(token); // Se registra o autentica al usuario usando el token
    const jwtToken = generateToken({ // Se genera un token JWT con datos del usuario
      id: user._id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      sub: user.sub,
      tipo: user.tipo
    });
    res.json({ message: 'Login exitoso', user, token: jwtToken });
  } catch (err) {
    console.error(err);
    if (err.code === 'EMAIL_ALREADY_REGISTERED') {
      res.status(400).json({ message: err.message }); // Caso de email ya registrado
    } else {
      res.status(401).json({ message: 'Token inválido' }); // Token inválido
    }
  }
};

// Registro manual de un nuevo usuario
export const register = async (req, res) => {
  try {
    const nuevoUser = await userService.register(req.body); // Registro con datos desde el body
    res.json({ message: 'Registro exitoso', user: nuevoUser });
  } catch (error) {
    res.status(500).json({ error: error.message }); // Error interno
  }
};

// Verificación del correo electrónico mediante token
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query; // Se obtiene token desde query params
    const user = await userService.verifyEmail(token); // Verificación en el servicio
    res.json({ message: 'Correo verificado exitosamente', user }); // Respuesta exitosa
  } catch (error) {
    res.status(400).json({ error: error.message }); // Error de validación
  }
};

// Inicio de sesión de usuario con email y contraseña
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.login(email, password); // Autenticación del usuario
    const jwtToken = generateToken({ // Generación del token JWT
      id: user._id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      tipo: user.tipo,
    });
    res.json({ message: 'Login exitoso', user, token: jwtToken }); // Login correcto
  } catch (error) {
    res.status(401).json({ message: error.message }); // Credenciales incorrectas
  }
};

// Obtener un usuario por su ID
export const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id); // Llama al servicio con el ID
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message }); // Usuario no encontrado
  }
};

// Obtener todos los usuarios del sistema
export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers(); // Llama al servicio que lista todos los usuarios
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message }); // Error del servidor
  }
};

// Actualizar el rol/tipo de un usuario
export const updateRol = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo } = req.body; // Nuevo tipo/rol
    const user = await userService.updateRol(id, tipo); // Llama al servicio para actualizar
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Actualizar información de un usuario (incluye imágenes)
export const updateUser = async (req, res) => {
  try {
    const updateData = req.body;

    // Verifica si hay archivos subidos
    if (req.files) {
      if (req.files.fotoPerfil && req.files.fotoPerfil.length > 0) {
        let picPath = req.files.fotoPerfil[0].path;
        updateData.picture = picPath; // Ruta de la foto de perfil
      }
      if (req.files.portadaUsuario && req.files.portadaUsuario.length > 0) {
        let coverPath = req.files.portadaUsuario[0].path;
        updateData.portada = coverPath; // Ruta de la portada
      }
    }

    const updatedUser = await userService.updateUser(req.params.id, updateData); // Actualiza usuario
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Importa controlador de clubes para manipulación de miembros
import * as clubController from "./clubController.js";

// Añadir club como miembro a un usuario
export const addClubMember = async (req, res) => {
  try {
    const updatedUser = await userService.addClubMember(req.params.userId, req.params.clubId); // Agrega relación
    await clubController.incrementMembers({ params: { id: req.params.clubId } }, { status: () => ({ json: () => {} }) }); // Incrementa contador de miembros en club
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Eliminar a un usuario de la membresía de un club
export const removeClubMember = async (req, res) => {
  try {
    const updatedUser = await userService.removeClubMember(req.params.userId, req.params.clubId); // Quita relación
    await clubController.decrementMembers({ params: { id: req.params.clubId } }, { status: () => ({ json: () => {} }) }); // Decrementa el número de miembros
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Añadir club como administrador a un usuario
export const addClubAdmin = async (req, res) => {
  try {
    const updatedUser = await userService.addClubAdmin(req.params.userId, req.params.clubId); // Agrega como admin
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Obtener el rol de un usuario dentro de un club
export const getUserClubRole = async (req, res) => {
  try {
    const role = await userService.getUserClubRole(req.params.userId, req.params.clubId); // Obtiene el rol
    res.status(200).json({ role });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Añadir una insignia a un usuario
export const addInsigniaToUser = async (req, res) => {
  try {
    const { userId, insigniaId } = req.params;
    const updatedUser = await userService.addInsigniaToUser(userId, insigniaId); // Añade la insignia
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Servicio de comentarios
import * as comentService from "../services/comentService.js";

// Aplicar sanción al usuario y eliminar comentario asociado
export const applySanctionAndDeleteComment = async (req, res) => {
  try {
    const { userId, comentarioId, status, razon, duracion, finBan } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "userId are required" });
    }

    // Aplica la sanción al usuario
    const sanctionedUser = await userService.applySanctionToUser(userId, {
      status,
      razon,
      duracion,
      finBan
    });

    // Elimina la referencia al comentario si existe
    if (comentarioId != null || comentarioId != undefined || comentarioId != "") {
      await comentService.removeComentarioReferenceFromLibro(comentarioId);
    }

    // Actualiza el estado de los reportes del usuario
    await updateReportesByUserId(userId, { estado: status });

    res.status(200).json({ message: "Sanction applied, comment reference removed, and reports updated", user: sanctionedUser });
  } catch (error) {
    res.status(500).json({ message: "Error applying sanction and removing comment reference", error: error.message });
  }
};

// Remover sanción (ban) de un usuario
export const removeBan = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    const updatedUser = await userService.removeBanFromUser(userId); // Quita el ban
    res.status(200).json({ message: "Ban removed", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error removing ban", error: error.message });
  }
};

// Enviar correo para restablecer contraseña
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    await userService.forgotPassword(email); // Envía correo con enlace
    res.status(200).json({ message: "Correo de restablecimiento enviado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Restablecer contraseña con token
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password are required" });
    }
    await userService.resetPassword(token, newPassword); // Restablece la contraseña
    res.status(200).json({ message: "Contraseña actualizada exitosamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Verificar si el usuario está baneado
export const checkBan = async (req, res) => {
  try {
    const user = await userService.checkBanForUser(req.params.id); // Consulta estado
    if (user.estado.status === "Activo") {
      res.status(201).json({ message: "User active", user });
    } else {
      res.status(403).json({ message: "User banned", user }); // Usuario baneado
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
