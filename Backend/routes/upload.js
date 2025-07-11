const express = require('express');
const auth = require('../middleware/auth');
const { upload, handleMulterError } = require('../middleware/upload');
const { uploadImage, uploadDocument } = require('../config/cloudinary');

const router = express.Router();

// @route   POST /api/upload/image
// @desc    Subir imagen individual
// @access  Private
router.post('/image', auth, upload.single('image'), handleMulterError, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se proporcionó ninguna imagen' });
    }

    const result = await uploadImage(req.file.buffer, {
      public_id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    });

    res.json({
      message: 'Imagen subida exitosamente',
      url: result.secure_url,
      publicId: result.public_id
    });

  } catch (error) {
    console.error('Error subiendo imagen:', error);
    res.status(500).json({ 
      message: 'Error al subir la imagen',
      error: error.message 
    });
  }
});

// @route   POST /api/upload/document
// @desc    Subir documento individual
// @access  Private
router.post('/document', auth, upload.single('document'), handleMulterError, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se proporcionó ningún documento' });
    }

    const result = await uploadDocument(req.file.buffer, req.file.originalname);

    res.json({
      message: 'Documento subido exitosamente',
      document: {
        filename: result.public_id,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: result.secure_url
      }
    });

  } catch (error) {
    console.error('Error subiendo documento:', error);
    res.status(500).json({ 
      message: 'Error al subir el documento',
      error: error.message 
    });
  }
});

// @route   POST /api/upload/multiple
// @desc    Subir múltiples archivos
// @access  Private
router.post('/multiple', auth, upload.fields([
  { name: 'images', maxCount: 5 },
  { name: 'documents', maxCount: 5 }
]), handleMulterError, async (req, res) => {
  try {
    const results = {
      images: [],
      documents: []
    };

    // Procesar imágenes
    if (req.files && req.files.images) {
      const imagePromises = req.files.images.map(async (file) => {
        const result = await uploadImage(file.buffer, {
          public_id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        });
        return {
          url: result.secure_url,
          publicId: result.public_id
        };
      });

      results.images = await Promise.all(imagePromises);
    }

    // Procesar documentos
    if (req.files && req.files.documents) {
      const documentPromises = req.files.documents.map(async (file) => {
        const result = await uploadDocument(file.buffer, file.originalname);
        return {
          filename: result.public_id,
          originalName: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          url: result.secure_url
        };
      });

      results.documents = await Promise.all(documentPromises);
    }

    res.json({
      message: 'Archivos subidos exitosamente',
      results
    });

  } catch (error) {
    console.error('Error subiendo archivos:', error);
    res.status(500).json({ 
      message: 'Error al subir los archivos',
      error: error.message 
    });
  }
});

module.exports = router;