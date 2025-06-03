import User from "../models/userModel.js";

// Importación del cliente OAuth2 de Google
import { OAuth2Client } from "google-auth-library";
import bcrypt from "bcrypt";

const GOOGLE_CLIENT_ID = '442472453936-ihjkn2bismfff6safne168lj91mtolrb.apps.googleusercontent.com';
const CLIENT_URL = 'https://read-it-es-e4ec0ccdc25d.herokuapp.com';

// Inicializa cliente OAuth2
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// Verifica el token de Google e identifica al usuario
async function verifyGoogleToken(idToken) {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload(); // Datos extraídos del token

    const userData = {
      sub: payload.sub,         // ID único de Google
      name: payload.name,       // Nombre del usuario
      email: payload.email,     // Correo electrónico
      picture: payload.picture  // URL de la imagen de perfil
    };

    // Verifica si ya existe un usuario con ese ID de Google
    let user = await User.findOne({ sub: userData.sub });

    if (!user) {
      // Si existe otro usuario con el mismo email pero diferente sub, rechaza el registro
      const existingEmailUser = await User.findOne({ email: userData.email });
      if (existingEmailUser) {
        const error = new Error('El correo electrónico ya está registrado con otra cuenta');
        error.code = 'EMAIL_ALREADY_REGISTERED';
        throw error;
      }

      // Crea el nuevo usuario con los datos de Google
      user = await User.create(userData);
    }

    return user;
}

// Registra a un usuario con Google
export const registerUser = async (token) => {
    const user = await verifyGoogleToken(token);
    return user;
};

// Importación de Nodemailer para envío de correos
import nodemailer from "nodemailer";

// Registro manual (email/contraseña)
export const register = async(data) =>{
  const existingUser = await User.findOne({ email: data.email });

  if (existingUser) {
    throw new Error('El email ya está registrado');
  }

  // Cifrado de la contraseña
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const nuevoUser = new User({
    ...data,
    password: hashedPassword,
  });

  const savedUser = await nuevoUser.save();

  // Envío de correo de verificación
  await sendVerificationEmail(savedUser.email, savedUser.name, savedUser._id);

  return savedUser;
}

// Importación de funciones de token JWT personalizadas
import { generateToken, verifyToken } from "../utils/jwtUtils.js";

// Envío de correo de verificación de cuenta
async function sendVerificationEmail(email, name, userId) {
  let transporter = nodemailer.createTransport({
    service: "gmail",  
    auth: {
      user: "connectReadit@gmail.com",
      pass: "addalnjufqpnkwoi" // ⚠️ Deberías usar variables de entorno aquí
    },
  });

  const verificationToken = generateToken({ id: userId, email });

  const verificationUrl = `${CLIENT_URL}/verify-email.html?token=${verificationToken}`;

  let mailOptions = {
    from: "ReadIt",
    to: email,
    subject: "Verificación de correo electrónico",
    text: `Hola ${name},\n\nPor favor verifica tu correo electrónico para completar el registro haciendo clic en el siguiente enlace:\n${verificationUrl}\n\nGracias!`,
    html: `<p>Hola ${name},</p><p>Por favor verifica tu correo electrónico para completar el registro haciendo clic en el siguiente enlace:</p><p><a href="${verificationUrl}">${verificationUrl}</a></p><p>Gracias!</p>`,
  };

  await transporter.sendMail(mailOptions);
}

// Verifica el token de email y activa el usuario
export const verifyEmail = async (token) => {
  const decoded = verifyToken(token);
  if (!decoded) {
    throw new Error('Token de verificación inválido o expirado');
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  if (user.emailVerified) {
    return user;
  }

  user.emailVerified = true;
  await user.save();

  return user;
};

// Login tradicional por correo y contraseña
export const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Contraseña incorrecta');
  }

  if (!user.emailVerified) {
    throw new Error('Correo electrónico no verificado');
  }

  return user;
};

// Obtener usuario por ID
export const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  return user;
};

// Obtener todos los usuarios verificados, excluyendo asociaciones y admins
export const getAllUsers = async () => {
  const users = await User.find({tipo: {$nin: ['asociacion', 'adminPrincipal']}, emailVerified: true});
  return users;
};

// Actualiza el tipo de rol del usuario
export const updateRol = async (id, tipo) => {
  const user = await User.findByIdAndUpdate(id, {tipo: tipo}, {new: true});
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  return user;
};

// Actualiza información básica del perfil del usuario
export const updateUser = async (id, data) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  if (data.name !== undefined) user.name = data.name;
  if (data.descripcion !== undefined) user.descripcion = data.descripcion;
  if (data.ubicacion !== undefined) user.ubicacion = data.ubicacion;
  if (data.picture !== undefined) user.picture = data.picture;
  if (data.portada !== undefined) user.portada = data.portada;

  await user.save();
  return user;
};

// Aplica sanción al usuario
export const applySanctionToUser = async (userId, sanctionData) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  user.estado.status = sanctionData.status || "Suspendido";
  user.estado.razon = sanctionData.razon || "";
  user.estado.duracion = sanctionData.duracion || "";
  user.estado.finBan = sanctionData.finBan || null;

  await user.save();
  return user;
};

// Elimina la sanción de un usuario
export const removeBanFromUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  user.estado.status = "Activo";
  user.estado.razon = "";
  user.estado.duracion = "";
  user.estado.finBan = null;

  await user.save();
  return user;
};

// Añadir usuario como miembro de un club
export const addClubMember = async (userId, clubId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('Usuario no encontrado');

  if (!user.club_miembro.includes(clubId)) {
    user.club_miembro.push(clubId);
    await user.save();
  }
  return user;
};

// Añadir usuario como administrador de un club
export const addClubAdmin = async (userId, clubId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('Usuario no encontrado');

  if (!user.club_admin.includes(clubId)) {
    user.club_admin.push(clubId);
    await user.save();
  }
  return user;
};

// Obtener el rol del usuario en un club específico
export const getUserClubRole = async (userId, clubId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('Usuario no encontrado');

  if (user.club_admin.includes(clubId)) return "admin";
  if (user.club_miembro.includes(clubId)) return "member";
  return "none";
};

// Remover a un usuario como miembro de un club
export const removeClubMember = async (userId, clubId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('Usuario no encontrado');

  user.club_miembro = user.club_miembro.filter(id => id.toString() !== clubId);
  await user.save();
  return user;
};

// Añadir una insignia al perfil del usuario
export const addInsigniaToUser = async (userId, insigniaId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('Usuario no encontrado');

  if (!user.insignias.includes(insigniaId)) {
    user.insignias.push(insigniaId);
    await user.save();
  }
  return user;
};

// Importación de la librería crypto para tokens
import crypto from "crypto";

// Solicitud para restablecer contraseña
export const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

  user.resetPasswordToken = resetTokenHash;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hora

  await user.save();

  await sendResetPasswordEmail(user.email, user.name, resetToken);

  return true;
};

// Enviar correo con link para restablecer contraseña
async function sendResetPasswordEmail(email, name, token) {
  let transporter = nodemailer.createTransport({
    service: "gmail",  
    auth: {
      user: "connectReadit@gmail.com",
      pass: "addalnjufqpnkwoi"
    },
  });

  const resetUrl = `${CLIENT_URL}/reset-password.html?token=${token}`;

  let mailOptions = {
    from: "ReadIt",
    to: email,
    subject: "Restablecer contraseña",
    text: `Hola ${name},\n\nPara restablecer tu contraseña, haz clic en el siguiente enlace:\n${resetUrl}\n\nSi no solicitaste este cambio, ignora este correo.\n\nGracias!`,
    html: `<p>Hola ${name},</p><p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>Si no solicitaste este cambio, ignora este correo.</p><p>Gracias!</p>`,
  };

  await transporter.sendMail(mailOptions);
}

// Cambia la contraseña usando el token recibido
export const resetPassword = async (token, newPassword) => {
  const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken: resetTokenHash,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error('Token inválido o expirado');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  return true;
};
