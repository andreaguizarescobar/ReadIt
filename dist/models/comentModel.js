import mongoose from "mongoose";
const comentSchema = new mongoose.Schema({
  User: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comentario: String,
  likes: {
    type: Number,
    default: 0
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  fecha: String,
  respuestas: [{
    User: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    comentario: String,
    likes: {
      type: Number,
      default: 0
    },
    likedBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    fecha: String
  }]
});
const Comentario = mongoose.model("Comentarios", comentSchema, "Comentarios");
export default Comentario;