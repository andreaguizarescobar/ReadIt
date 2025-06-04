import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Define el almacenamiento para multer para guardar archivos en la carpeta 'perfil'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join('perfil');
    // Crea el directorio si no existe
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    // Pasa la ruta de destino al callback
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Obtiene la extensión del archivo
    const ext = path.extname(file.originalname);
    // Obtiene el nombre base del archivo sin extensión
    const basename = path.basename(file.originalname, ext);
    // Crea un nombre único concatenando el nombre base con timestamp y extensión
    cb(null, basename + '-' + Date.now() + ext);
  }
});

// Filtro de archivos para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
  // Expresión regular con extensiones permitidas
  const allowedTypes = /jpeg|jpg|png|gif/;
  // Verifica que la extensión del archivo sea permitida
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  // Verifica que el tipo MIME sea permitido
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    // Acepta el archivo si cumple las condiciones
    cb(null, true);
  } else {
    // Rechaza el archivo y lanza error si no es imagen
    cb(new Error('Solo se permiten imágenes'));
  }
};

const upload = multer({
  storage: storage,              // Configura el almacenamiento definido arriba
  fileFilter: fileFilter,        // Aplica el filtro de archivos para imágenes
  limits: { fileSize: 5 * 1024 * 1024 } // Limita el tamaño a 5MB
});

export default upload;
