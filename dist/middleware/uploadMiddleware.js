import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Define storage for multer to save files in 'perfil' folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join('perfil');
    // Create the directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, {
        recursive: true
      });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Use original name with timestamp to avoid conflicts
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    cb(null, basename + '-' + Date.now() + ext);
  }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes'));
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  } // 5MB limit
});
export default upload;