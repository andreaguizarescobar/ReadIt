import User from "../models/userModel.js";
import { OAuth2Client } from "google-auth-library";
import bcrypt from "bcrypt";

const GOOGLE_CLIENT_ID = '442472453936-ihjkn2bismfff6safne168lj91mtolrb.apps.googleusercontent.com';
const CLIENT_URL = 'http://localhost:61398';
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

async function verifyGoogleToken(idToken) {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });
  
    const payload = ticket.getPayload();
  
    const userData = {
      sub: payload.sub,
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
    };
  
    // Guardar o actualizar usuario en la base de datos
    let user = await User.findOne({ googleId: userData.googleId });
    if (!user) {
      user = await User.create(userData);
    }
  
    return user;
}

export const registerUser = async (token) => {
    const user = await verifyGoogleToken(token);
    return user;
};

import nodemailer from "nodemailer";

export const register = async(data) =>{
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new Error('El email ya está registrado');
  }
  // Hash password before saving
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const nuevoUser = new User({
    ...data,
    password: hashedPassword,
  });
  const savedUser = await nuevoUser.save();

  await sendVerificationEmail(savedUser.email, savedUser.name, savedUser._id);

  return savedUser;
}

import { generateToken, verifyToken } from "../utils/jwtUtils.js";

async function sendVerificationEmail(email, name, userId) {
  // Create transporter using environment variables for SMTP
    let transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "8a296281b32d18",
        pass: "1c64f8690d0223"
      },
  });

  // Generate verification token with user id and email
  const verificationToken = generateToken({ id: userId, email });

  // Verification URL (adjust domain as needed)
  const verificationUrl = `${CLIENT_URL}/verify-email?token=${verificationToken}`;

  // Email content
  let mailOptions = {
    from: "ReadIt",
    to: email,
    subject: "Verificación de correo electrónico",
    text: `Hola ${name},\n\nPor favor verifica tu correo electrónico para completar el registro haciendo clic en el siguiente enlace:\n${verificationUrl}\n\nGracias!`,
    html: `<p>Hola ${name},</p><p>Por favor verifica tu correo electrónico para completar el registro haciendo clic en el siguiente enlace:</p><p><a href="${verificationUrl}">${verificationUrl}</a></p><p>Gracias!</p>`,
  };

  // Send mail
  await transporter.sendMail(mailOptions);
}

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
