import * as userService from "../services/userServices.js";
import { generateToken } from "../utils/jwtUtils.js";

export const registerUser = async (req, res) => {
  try {
    const { token } = req.body;
    const user = await userService.registerUser(token);
    // Include all user info in the token payload
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
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
