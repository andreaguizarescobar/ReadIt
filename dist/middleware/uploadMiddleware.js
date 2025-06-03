// Importa multer para manejar subida de archivos multipart/form-data
import multer from 'multer';
// Importa path para manejar rutas de archivos de forma segura y multiplataforma
import path from 'path';
// Importa fs para trabajar con el sistema de archivos (crear carpetas, verificar existencia, etc.)
import fs from 'fs';

// Define la configuración de almacenamiento para multer
const storage = multer.diskStorage({
  // Define la carpeta destino donde se guardarán los archivos subidos
  destination: function (req, file, cb) {
    // Define la ruta de la carpeta 'perfil' donde se guardarán las imágenes
    const uploadPath = path.join('perfil');
    // Verifica si la carpeta 'perfil' existe, si no, la crea (con directorios padres si es necesario)
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, {
        recursive: true
      });
    }
    // Callback para continuar y establecer la carpeta destino
    cb(null, uploadPath);
  },
  // Define el nombre del archivo guardado en el servidor
  filename: function (req, file, cb) {
    // Obtiene la extensión original del archivo (ej. .jpg, .png)
    const ext = path.extname(file.originalname);
    // Obtiene el nombre base del archivo sin extensión
    const basename = path.basename(file.originalname, ext);
    // Genera un nombre único combinando el nombre base, un timestamp y la extensión
    cb(null, basename + '-' + Date.now() + ext);
  }
});

// Filtro para aceptar solo archivos que sean imágenes
const fileFilter = (req, file, cb) => {
  // Expresión regular para tipos permitidos: jpeg, jpg, png, gif
  const allowedTypes = /jpeg|jpg|png|gif/;
  // Verifica que la extensión del archivo sea válida
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  // Verifica que el mimetype sea válido (tipo MIME del archivo)
  const mimetype = allowedTypes.test(file.mimetype);
  // Si ambas validaciones son correctas, acepta el archivo
  if (extname && mimetype) {
    cb(null, true);
  } else {
    // Si no es una imagen válida, retorna un error a multer
    cb(new Error('Solo se permiten imágenes'));
  }
};

// Configura multer con la configuración de almacenamiento, filtro de archivos y límite de tamaño (5MB)
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024  // Limite de 5 megabytes
  }
});

// Exporta el middleware configurado de multer para usarlo en rutas donde se suban archivos
export default upload;
