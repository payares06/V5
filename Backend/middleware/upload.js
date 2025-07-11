const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento en memoria
const storage = multer.memoryStorage();

// Filtro de archivos
const fileFilter = (req, file, cb) => {
  // Tipos de archivo permitidos
  const allowedTypes = {
    images: /jpeg|jpg|png|gif|webp/,
    documents: /pdf|doc|docx|txt|xlsx|xls|pptx|ppt/
  };

  const extname = allowedTypes.images.test(path.extname(file.originalname).toLowerCase()) ||
                  allowedTypes.documents.test(path.extname(file.originalname).toLowerCase());
  
  const mimetype = file.mimetype.startsWith('image/') || 
                   file.mimetype.startsWith('application/') ||
                   file.mimetype === 'text/plain';

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido'), false);
  }
};

// Configuración de multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB por archivo
    files: 10 // máximo 10 archivos por request
  },
  fileFilter: fileFilter
});

// Middleware para manejar múltiples tipos de archivos
const uploadFiles = upload.fields([
  { name: 'images', maxCount: 5 },
  { name: 'documents', maxCount: 5 }
]);

// Middleware de manejo de errores de multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'El archivo es demasiado grande. Máximo 10MB.' });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ message: 'Demasiados archivos. Máximo 5 por tipo.' });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ message: 'Campo de archivo inesperado.' });
    }
  }
  
  if (err.message === 'Tipo de archivo no permitido') {
    return res.status(400).json({ message: 'Tipo de archivo no permitido.' });
  }
  
  next(err);
};

module.exports = {
  uploadFiles,
  handleMulterError,
  upload
};