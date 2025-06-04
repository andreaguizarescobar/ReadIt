// Importa mongoose para definir esquemas y modelos de MongoDB
import mongoose from "mongoose";

// Define el esquema para usuarios
const userSchema = new mongoose.Schema({
  // Identificador único del usuario (por ejemplo, sub de un JWT)
  sub: {
    type: String
  },

  // Correo electrónico del usuario, obligatorio y único
  email: {
    type: String,
    required: true,
    unique: true
  },

  // Indica si el correo electrónico ha sido verificado (default: false)
  emailVerified: {
    type: Boolean,
    default: false
  },

  // Nombre completo del usuario, obligatorio
  name: {
    type: String,
    required: true
  },

  // Contraseña del usuario (almacenada hasheada idealmente)
  password: {
    type: String
  },

  // URL o ruta de la imagen de perfil del usuario
  picture: {
    type: String
  },

  // Tipo de usuario, por defecto 'lector'
  tipo: {
    type: String,
    default: 'lector'
  },

  // Descripción personal del usuario, con un valor por defecto
  descripcion: {
    type: String,
    default: "Hola!, Me gusta leer"
  },

  // Imagen de portada para el perfil del usuario
  portada: {
    type: String
  },

  // Ubicación geográfica o ciudad del usuario
  ubicacion: {
    type: String
  },

  // Array con referencias a insignias que tiene el usuario
  insignias: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Insignias'
  }],

  // Array con referencias a clubes donde el usuario es administrador
  club_admin: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clubes'
  }],

  // Array con referencias a clubes donde el usuario es miembro
  club_miembro: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clubes'
  }],

  // Estado del usuario, incluyendo estatus, razón, duración y fin de baneo
  estado: {
    status: {
      type: String,
      default: "Activo"  // e.g., "Activo", "Suspendido", "Baneado"
    },
    razon: {
      type: String,
      default: ""
    },
    duracion: {
      type: String,
      default: ""
    },
    // Fecha en que termina el baneo, null si no está baneado
    finBan: {
      type: Date,
      default: null
    }
  },

  // Token para resetear contraseña (generado al solicitar recuperación)
  resetPasswordToken: {
    type: String
  },

  // Fecha de expiración del token para resetear contraseña
  resetPasswordExpires: {
    type: Date
  }
});

// Crea el modelo 'User' basado en el esquema y enlazado a la colección 'User'
const User = mongoose.model('User', userSchema, "User");

// Exporta el modelo para usarlo en otras partes de la aplicación
export default User;
