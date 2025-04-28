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
      sub: user.sub
    });
    res.json({ message: 'Login exitoso', user, token: jwtToken });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Token inválido' });
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

<<<<<<< HEAD
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
=======
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // El ID lo sacamos del token
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({
      name: user.name,
      descripcion: user.descripcion,
      ubicacion: user.ubicacion,
      fechaRegistro: user.createdAt, // Si quieres mostrarlo (asegúrate que tu esquema tenga timestamps)
      picture: user.picture,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
>>>>>>> cdfe9ab7ba673ba45db2ec1cc8f59616868d623e
