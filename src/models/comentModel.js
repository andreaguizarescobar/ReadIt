import mongoose from "mongoose";

// Definición del esquema para los comentarios
const comentSchema = new mongoose.Schema({
  User: [  // Array que contiene referencias a usuarios que hicieron el comentario
    {
      type: mongoose.Schema.Types.ObjectId, // Tipo ObjectId para referencia
      ref: 'User',  // Referencia a la colección 'User'
    }
  ],
  comentario: String,  // Texto del comentario
  likes: {             // Número de "me gusta" del comentario
    type: Number,
    default: 0         // Valor inicial predeterminado es 0
  },
  likedBy: [           // Array de usuarios que han dado "like" al comentario
    {
      type: mongoose.Schema.Types.ObjectId, // Referencia a usuarios
      ref: 'User'
    }
  ],
  fecha: String,       // Fecha del comentario, almacenada como cadena de texto
  respuestas: [        // Array de respuestas anidadas al comentario
    {
      User: [          // Array de usuarios que respondieron
        {
          type: mongoose.Schema.Types.ObjectId, // Referencia a usuario
          ref: 'User'
        }
      ],
      comentario: String,   // Texto de la respuesta
      likes: {              // Número de "me gusta" en la respuesta
        type: Number,
        default: 0
      },
      likedBy: [            // Usuarios que han dado "like" a la respuesta
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      ],
      fecha: String         // Fecha de la respuesta
    }
  ]
});

// Creación y exportación del modelo "Comentarios" basado en el esquema comentSchema
const Comentario = mongoose.model("Comentarios", comentSchema, "Comentarios");
export default Comentario;
