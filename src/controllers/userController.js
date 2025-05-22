import * as userService from "../services/userServices.js";
import { generateToken } from "../utils/jwtUtils.js";

export const registerUser = async (req, res) => {
  try {
    const { token } = req.body;
    const user = await userService.registerUser(token);
    const jwtToken = generateToken({ 
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
      res.status(400).json({ message: err.message });
    } else {
      res.status(401).json({ message: 'Token inválido' });
    }
  }
};

export const register = async (req, res) => {
  try {
    const nuevoUser = await userService.register(req.body);
    const jwtToken = generateToken({ 
      id: nuevoUser._id, 
      email: nuevoUser.email, 
      name: nuevoUser.name, 
      picture: nuevoUser.picture,
    });
    
    res.json({ message: 'Login exitoso', user: nuevoUser, token: jwtToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const user = await userService.verifyEmail(token);
    res.json({ message: 'Correo verificado exitosamente', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.login(email, password);
    const jwtToken = generateToken({
      id: user._id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      tipo: user.tipo,
    });
    res.json({ message: 'Login exitoso', user, token: jwtToken });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRol = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo } = req.body;
    const user = await userService.updateRol(id, tipo);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const updateUser = async (req, res) => {
  try {
    const updateData = req.body;

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

    const updatedUser = await userService.updateUser(req.params.id, updateData);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

import * as clubController from "./clubController.js";

// Add club as member to user
export const addClubMember = async (req, res) => {
  try {
    const updatedUser = await userService.addClubMember(req.params.userId, req.params.clubId);
    // Increment club member count
    await clubController.incrementMembers({ params: { id: req.params.clubId } }, { status: () => ({ json: () => {} }) });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Remove club member from user
export const removeClubMember = async (req, res) => {
  try {
    const updatedUser = await userService.removeClubMember(req.params.userId, req.params.clubId);
    // Decrement club member count
    await clubController.decrementMembers({ params: { id: req.params.clubId } }, { status: () => ({ json: () => {} }) });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Add club as admin to user
export const addClubAdmin = async (req, res) => {
  try {
    const updatedUser = await userService.addClubAdmin(req.params.userId, req.params.clubId);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get user's role in a club
export const getUserClubRole = async (req, res) => {
  try {
    const role = await userService.getUserClubRole(req.params.userId, req.params.clubId);
    res.status(200).json({ role });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addInsigniaToUser = async (req, res) => {
  try {
    const { userId, insigniaId } = req.params;
    const updatedUser = await userService.addInsigniaToUser(userId, insigniaId);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

import * as comentService from "../services/comentService.js";

export const applySanctionAndDeleteComment = async (req, res) => {
  try {
    const { userId, comentarioId, status, razon, duracion, finBan } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "userId are required" });
    }

    // Apply sanction to user with detailed data
    const sanctionedUser = await userService.applySanctionToUser(userId, {
      status,
      razon,
      duracion,
      finBan
    });

    if (comentarioId != null || comentarioId != undefined || comentarioId != "") {
      await comentService.removeComentarioReferenceFromLibro(comentarioId);
    }
    res.status(200).json({ message: "Sanction applied and comment reference removed", user: sanctionedUser });
  } catch (error) {
    res.status(500).json({ message: "Error applying sanction and removing comment reference", error: error.message });
  }
};

export const removeBan = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    const updatedUser = await userService.removeBanFromUser(userId);
    res.status(200).json({ message: "Ban removed", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error removing ban", error: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    await userService.forgotPassword(email);
    res.status(200).json({ message: "Correo de restablecimiento enviado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password are required" });
    }
    await userService.resetPassword(token, newPassword);
    res.status(200).json({ message: "Contraseña actualizada exitosamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const checkBan = async (req, res) => {
  try {
    const user = await userService.checkBanForUser(req.params.id);
    if (user.estado.status === "Activo") {
      res.status(201).json({ message: "User active", user });
    } else {
      res.status(403).json({ message: "User banned", user });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
