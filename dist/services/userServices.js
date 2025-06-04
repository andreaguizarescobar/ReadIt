import User from "../models/userModel.js"; // Importar modelo User para manejar usuarios en BD
import { OAuth2Client } from "google-auth-library"; // Cliente OAuth2 para validar tokens Google
import bcrypt from "bcrypt"; // Librería para hashear y comparar contraseñas

const GOOGLE_CLIENT_ID = '442472453936-ihjkn2bismfff6safne168lj91mtolrb.apps.googleusercontent.com'; // ID cliente Google OAuth2
const CLIENT_URL = 'https://read-it-es-e4ec0ccdc25d.herokuapp.com'; // URL del cliente frontend

const client = new OAuth2Client(GOOGLE_CLIENT_ID); // Crear instancia cliente OAuth2

// Función para verificar token de Google y obtener datos del usuario
async function verifyGoogleToken(idToken) {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: GOOGLE_CLIENT_ID // Validar que el token sea para nuestro cliente
  });
  const payload = ticket.getPayload(); // Obtener payload con info del usuario
  const userData = {
    sub: payload.sub, // ID único de usuario Google
    name: payload.name,
    email: payload.email,
    picture: payload.picture
  };

  // Buscar usuario en BD por sub (ID Google)
  let user = await User.findOne({
    sub: userData.sub
  });
  if (user) {
    // Si existe, actualizar datos básicos
    user.name = userData.name;
    user.email = userData.email;
    user.picture = userData.picture;
    await user.save();
  } else {
    // Si no existe, crear nuevo usuario con datos de Google
    user = await User.create(userData);
  }
  return user; // Retornar usuario actualizado o creado
}

// Registrar usuario con token Google
export const registerUser = async token => {
  const user = await verifyGoogleToken(token);
  return user;
};

import nodemailer from "nodemailer"; // Librería para enviar correos

// Registro de usuario con email y password
export const register = async data => {
  // Verificar si email ya está registrado
  const existingUser = await User.findOne({
    email: data.email
  });
  if (existingUser) {
    throw new Error('El email ya está registrado');
  }
  // Hashear contraseña antes de guardar
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const nuevoUser = new User({
    ...data,
    password: hashedPassword
  });
  // Guardar nuevo usuario en BD
  const savedUser = await nuevoUser.save();
  // Enviar email de verificación
  await sendVerificationEmail(savedUser.email, savedUser.name, savedUser._id);
  return savedUser;
};

import { generateToken, verifyToken } from "../utils/jwtUtils.js"; // Funciones para generar y verificar JWT

// Función para enviar correo de verificación con token
async function sendVerificationEmail(email, name, userId) {
  // Crear transportador SMTP con Gmail
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "connectReadit@gmail.com",
      pass: "addalnjufqpnkwoi"
    }
  });

  /*
  // Alternativa con Mailtrap para pruebas
  async function sendVerificationEmail(email, name, userId) {
      let transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "8a296281b32d18",
          pass: "1c64f8690d0223"
        },
    });
  */

  // Generar token JWT para verificación
  const verificationToken = generateToken({
    id: userId,
    email
  });
  // URL de verificación con token como query
  const verificationUrl = `${CLIENT_URL}/verify-email?token=${verificationToken}`;

  // Contenido del correo (texto y HTML)
  let mailOptions = {
    from: "ReadIt",
    to: email,
    subject: "Verificación de correo electrónico",
    text: `Hola ${name},\n\nPor favor verifica tu correo electrónico para completar el registro haciendo clic en el siguiente enlace:\n${verificationUrl}\n\nGracias!`,
    html: `<p>Hola ${name},</p><p>Por favor verifica tu correo electrónico para completar el registro haciendo clic en el siguiente enlace:</p><p><a href="${verificationUrl}">${verificationUrl}</a></p><p>Gracias!</p>`
  };

  // Enviar correo de verificación
  await transporter.sendMail(mailOptions);
}

// Verificar email con token recibido
export const verifyEmail = async token => {
  const decoded = verifyToken(token); // Decodificar token JWT
  if (!decoded) {
    throw new Error('Token de verificación inválido o expirado');
  }
  // Buscar usuario por ID decodificado
  const user = await User.findById(decoded.id);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  if (user.emailVerified) {
    return user; // Si ya verificado, retornar usuario
  }
  // Marcar email como verificado y guardar
  user.emailVerified = true;
  await user.save();
  return user;
};

// Login con email y contraseña
export const login = async (email, password) => {
  const user = await User.findOne({
    email
  });
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  // Comparar contraseña hasheada con la ingresada
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Contraseña incorrecta');
  }
  // Verificar que el email esté validado
  if (!user.emailVerified) {
    throw new Error('Correo electrónico no verificado');
  }
  return user;
};

// Obtener usuario por ID
export const getUserById = async id => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  return user;
};

// Obtener todos los usuarios excepto ciertos tipos
export const getAllUsers = async () => {
  const users = await User.find({
    tipo: {
      $nin: ['asociacion', 'adminPrincipal'] // Excluir estos roles
    }
  });
  return users;
};

// Actualizar rol de un usuario por ID
export const updateRol = async (id, tipo) => {
  const user = await User.findByIdAndUpdate(id, {
    tipo: tipo
  }, {
    new: true // Retornar usuario actualizado
  });
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  return user;
};

// Actualizar campos del usuario
export const updateUser = async (id, data) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  // Actualizar campos si están presentes en data
  if (data.name !== undefined) user.name = data.name;
  if (data.descripcion !== undefined) user.descripcion = data.descripcion;
  if (data.ubicacion !== undefined) user.ubicacion = data.ubicacion;
  if (data.picture !== undefined) user.picture = data.picture;
  if (data.portada !== undefined) user.portada = data.portada;

  // Guardar cambios en BD
  await user.save();
  return user;
};

// Aplicar sanción a un usuario
export const applySanctionToUser = async (userId, sanctionData) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  // Actualizar estado con datos de sanción o valores por defecto
  user.estado.status = sanctionData.status || "Suspendido";
  user.estado.razon = sanctionData.razon || "";
  user.estado.duracion = sanctionData.duracion || "";
  user.estado.finBan = sanctionData.finBan || null;
  await user.save();
  return user;
};

// Remover sanción/baneo de usuario
export const removeBanFromUser = async userId => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  // Resetear estado a activo sin sanción
  user.estado.status = "Activo";
  user.estado.razon = "";
  user.estado.duracion = "";
  user.estado.finBan = null;
  await user.save();
  return user;
};

// Añadir club como miembro al usuario
export const addClubMember = async (userId, clubId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('Usuario no encontrado');
  // Solo añadir si no está ya en miembros
  if (!user.club_miembro.includes(clubId)) {
    user.club_miembro.push(clubId);
    await user.save();
  }
  return user;
};

// Añadir club como admin al usuario
export const addClubAdmin = async (userId, clubId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('Usuario no encontrado');
  // Solo añadir si no está ya en admins
  if (!user.club_admin.includes(clubId)) {
    user.club_admin.push(clubId);
    await user.save();
  }
  return user;
};

// Obtener rol del usuario en un club ("admin", "member" o "none")
export const getUserClubRole = async (userId, clubId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('Usuario no encontrado');
  if (user.club_admin.includes(clubId)) return "admin";
  if (user.club_miembro.includes(clubId)) return "member";
  return "none";
};

// Eliminar club como miembro del usuario
export const removeClubMember = async (userId, clubId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('Usuario no encontrado');
  // Filtrar club para removerlo de miembros
  user.club_miembro = user.club_miembro.filter(id => id.toString() !== clubId);
  await user.save();
  return user;
};

// Añadir insignia al usuario
export const addInsigniaToUser = async (userId, insigniaId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('Usuario no encontrado');
  // Añadir insignia solo si no está ya incluida
  if (!user.insignias.includes(insigniaId)) {
    user.insignias.push(insigniaId);
    await user.save();
  }
  return user;
};

import crypto from "crypto"; // Librería para generación de tokens seguros

// Función para solicitud de recuperación de contraseña
export const forgotPassword = async email => {
  const user = await User.findOne({
    email
  });
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  // Generar token aleatorio para reset de contraseña
  const resetToken = crypto.randomBytes(32).toString('hex');
  // Hashear token para almacenar en BD
  const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Guardar token y expiración (1 hora) en usuario
  user.resetPasswordToken = resetTokenHash;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hora en ms

  await user.save();

  // Enviar correo con enlace para resetear contraseña
  await sendResetPasswordEmail(user.email, user.name, resetToken);
  return true;
};

// Enviar correo para restablecer contraseña
async function sendResetPasswordEmail(email, name, token) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "connectReadit@gmail.com",
      pass: "addalnjufqpnkwoi"
    }
  });
  const resetUrl = `${CLIENT_URL}/reset-password.html?token=${token}`; // URL para resetear
  let mailOptions = {
    from: "ReadIt",
    to: email,
    subject: "Restablecer contraseña",
    text: `Hola ${name},\n\nPara restablecer tu contraseña, haz clic en el siguiente enlace:\n${resetUrl}\n\nSi no solicitaste este cambio, ignora este correo.\n\nGracias!`,
    html: `<p>Hola ${name},</p><p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>Si no solicitaste este cambio, ignora este correo.</p><p>Gracias!</p>`
  };
  // Enviar correo con instrucciones
  await transporter.sendMail(mailOptions);
}

// Resetear contraseña con token y nueva contraseña
export const resetPassword = async (token, newPassword) => {
  // Hashear token recibido para comparar con DB
  const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');

  // Buscar usuario con token válido y no expirado
  const user = await User.findOne({
    resetPasswordToken: resetTokenHash,
    resetPasswordExpires: {
      $gt: Date.now()
    }
  });
  if (!user) {
    throw new Error('Token inválido o expirado');
  }
  // Hashear nueva contraseña
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;

  // Limpiar token y expiración
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();
  return true;
};
