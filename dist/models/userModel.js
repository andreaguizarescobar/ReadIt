import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  sub: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  picture: {
    type: String
  },
  tipo: {
    type: String,
    default: 'lector'
  },
  descripcion: {
    type: String,
    default: "Hola!, Me gusta leer"
  },
  portada: {
    type: String
  },
  ubicacion: {
    type: String
  },
  insignias: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Insignias'
  }],
  club_admin: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clubes'
  }],
  club_miembro: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clubes'
  }],
  estado: {
    status: {
      type: String,
      default: "Activo"
    },
    // e.g., "Activo", "Suspendido", "Baneado"
    razon: {
      type: String,
      default: ""
    },
    duracion: {
      type: String,
      default: ""
    },
    // duration in days
    finBan: {
      type: Date,
      default: null
    }
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  }
});
const User = mongoose.model('User', userSchema, "User");
export default User;