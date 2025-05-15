import mongoose from "mongoose";
const insigSchema = new mongoose.Schema({
  img: String,
  nombre: String,
  descripcion: String,
  porcentaje: Number
});
const Insignia = mongoose.model("Insignias", insigSchema, "Insignias");
export default Insignia;