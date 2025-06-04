import mongoose from "mongoose";

// Definición del esquema para la colección "Clubes"
const clubSchema = new mongoose.Schema({
  NombreClub: String,            // Nombre del club (cadena de texto)
  Descripcion: String,           // Descripción del club (cadena de texto)
  Administrador: {               // Referencia al usuario administrador del club
    type: mongoose.Schema.Types.ObjectId, // Tipo ObjectId que referencia a otro documento
    ref: 'User',                 // Referencia a la colección 'User'
  },
  Genero: String,                // Género o categoría del club (cadena de texto)
  Miembros: Number,              // Número de miembros en el club (número)
  Portada: String,               // Ruta o URL de la imagen de portada (cadena de texto)
  Lecturas_curso: [              // Array de lecturas o libros actuales del club
    {
      type: mongoose.Schema.Types.ObjectId, // Cada elemento es un ObjectId
      ref: 'Libros',             // Referencia a la colección 'Libros'
    },
  ],
  votacion: [                   // Array de votaciones asociadas al club
    {
      type: mongoose.Schema.Types.ObjectId, // Cada elemento es un ObjectId
      ref: 'Votaciones',        // Referencia a la colección 'Votaciones'
    }
  ],
  Eventos: [                    // Array de eventos asociados al club
    {
      type: mongoose.Schema.Types.ObjectId, // Cada elemento es un ObjectId
      ref: 'Eventos',           // Referencia a la colección 'Eventos'
    },
  ],
});

// Crea el modelo "Clubes" a partir del esquema y lo exporta
const Club = mongoose.model("Clubes", clubSchema, "Clubes");
export default Club;
