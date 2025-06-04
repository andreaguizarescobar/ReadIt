import mongoose from "mongoose";

// Definición del esquema para la colección de usuarios
const userSchema = new mongoose.Schema({
  sub: {  // Identificador único externo (por ejemplo, de un proveedor OAuth)
    type: String,
  },
  email: {  // Correo electrónico del usuario, obligatorio y único
    type: String,
    required: true,
    unique: true,
  },
  emailVerified: {  // Indica si el correo electrónico ha sido verificado, por defecto falso
    type: Boolean,
    default: false,
  },
  name: {  // Nombre del usuario, obligatorio
    type: String,
    required: true,
  },
  password: {  // Contraseña del usuario (puede no existir si usa OAuth)
    type: String,
  },
  picture: {  // URL de la foto de perfil del usuario
    type: String,
  },
  tipo: {  // Tipo de usuario, por defecto es 'lector'
    type: String,
    default: 'lector'
  },
  descripcion: {  // Descripción o biografía del usuario, con texto por defecto
    type: String,
    default: "Hola!, Me gusta leer",
  },
  portada: {  // URL de una imagen de portada para el perfil del usuario
    type: String,
  },
  ubicacion: {  // Ubicación geográfica o localización del usuario
    type: String,
  },
  insignias: [{  // Referencias a insignias asociadas al usuario
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Insignias',
  }],
  club_admin: [{  // Referencias a clubes donde el usuario es administrador
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clubes',
  }],
  club_miembro: [{  // Referencias a clubes donde el usuario es miembro
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clubes',
  }],
  estado: {  // Estado del usuario con detalles de status, razón y duración de sanciones
    status: { type: String, default: "Activo" }, // Puede ser "Activo", "Suspendido" o "Baneado"
    razon: { type: String, default: "" },  // Motivo de suspensión o baneo, si aplica
    duracion: { type: String, default: "" },  // Duración estimada de la sanción
    finBan: { type: Date, default: null }  // Fecha en que finaliza el baneo (null si no aplica)
  },
  resetPasswordToken: {  // Token para resetear la contraseña, usado en recuperación
    type: String,
  },
  resetPasswordExpires: {  // Fecha de expiración del token de reseteo de contraseña
    type: Date,
  }
});

// Creación y exportación del modelo 'User' basado en userSchema
const User = mongoose.model('User', userSchema, "User");
export default User;
