const express = require('express');
const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');
const auth = require('../middleware/auth');
const { uploadFiles, handleMulterError } = require('../middleware/upload');
const { uploadImage, uploadDocument } = require('../config/cloudinary');

const router = express.Router();

// @route   GET /api/posts
// @desc    Obtener todas las publicaciones
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments({ isPublished: true });

    res.json({
      posts,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });

  } catch (error) {
    console.error('Error obteniendo posts:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// @route   GET /api/posts/user
// @desc    Obtener publicaciones del usuario autenticado
// @access  Private
router.get('/user', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ author: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments({ author: req.user._id });

    res.json(posts);

  } catch (error) {
    console.error('Error obteniendo posts del usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// @route   POST /api/posts
// @desc    Crear nueva publicación
// @access  Private
router.post('/', auth, uploadFiles, handleMulterError, [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('El título es requerido')
    .isLength({ max: 200 })
    .withMessage('El título no puede tener más de 200 caracteres'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('El contenido es requerido')
    .isLength({ max: 5000 })
    .withMessage('El contenido no puede tener más de 5000 caracteres')
], async (req, res) => {
  try {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Datos inválidos',
        errors: errors.array()
      });
    }

    const { title, content, links } = req.body;
    
    // Crear el post base
    const postData = {
      title,
      content,
      author: req.user._id,
      images: [],
      documents: [],
      links: []
    };

    // Procesar imágenes si existen
    if (req.files && req.files.images) {
      const imagePromises = req.files.images.map(async (file) => {
        try {
          const result = await uploadImage(file.buffer, {
            public_id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
          });
          return result.secure_url;
        } catch (error) {
          console.error('Error subiendo imagen:', error);
          throw new Error('Error al subir imagen');
        }
      });

      postData.images = await Promise.all(imagePromises);
    }

    // Procesar documentos si existen
    if (req.files && req.files.documents) {
      const documentPromises = req.files.documents.map(async (file) => {
        try {
          const result = await uploadDocument(file.buffer, file.originalname);
          return {
            filename: result.public_id,
            originalName: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            url: result.secure_url
          };
        } catch (error) {
          console.error('Error subiendo documento:', error);
          throw new Error('Error al subir documento');
        }
      });

      postData.documents = await Promise.all(documentPromises);
    }

    // Procesar enlaces si existen
    if (links) {
      try {
        const parsedLinks = typeof links === 'string' ? JSON.parse(links) : links;
        if (Array.isArray(parsedLinks)) {
          postData.links = parsedLinks.filter(link => link.title && link.url);
        }
      } catch (error) {
        console.error('Error procesando enlaces:', error);
      }
    }

    // Crear y guardar el post
    const post = new Post(postData);
    await post.save();

    // Poblar los datos del autor antes de enviar la respuesta
    await post.populate('author', 'username email avatar');

    res.status(201).json({
      message: 'Publicación creada exitosamente',
      post
    });

  } catch (error) {
    console.error('Error creando post:', error);
    res.status(500).json({ 
      message: 'Error interno del servidor',
      error: error.message 
    });
  }
});

// @route   GET /api/posts/:id
// @desc    Obtener publicación por ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    // Incrementar contador de vistas
    post.views += 1;
    await post.save();

    res.json(post);

  } catch (error) {
    console.error('Error obteniendo post:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// @route   PUT /api/posts/:id
// @desc    Actualizar publicación
// @access  Private
router.put('/:id', auth, [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El título no puede estar vacío')
    .isLength({ max: 200 })
    .withMessage('El título no puede tener más de 200 caracteres'),
  body('content')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El contenido no puede estar vacío')
    .isLength({ max: 5000 })
    .withMessage('El contenido no puede tener más de 5000 caracteres')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Datos inválidos',
        errors: errors.array()
      });
    }

    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    // Verificar que el usuario sea el autor
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'No tienes permisos para editar esta publicación' });
    }

    const { title, content, tags } = req.body;

    if (title) post.title = title;
    if (content) post.content = content;
    if (tags) post.tags = tags;

    await post.save();

    res.json({
      message: 'Publicación actualizada exitosamente',
      post
    });

  } catch (error) {
    console.error('Error actualizando post:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// @route   DELETE /api/posts/:id
// @desc    Eliminar publicación
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    // Verificar que el usuario sea el autor
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'No tienes permisos para eliminar esta publicación' });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: 'Publicación eliminada exitosamente' });

  } catch (error) {
    console.error('Error eliminando post:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// @route   POST /api/posts/:id/like
// @desc    Dar/quitar like a una publicación
// @access  Private
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    const userId = req.user._id;
    const likeIndex = post.likes.indexOf(userId);

    if (likeIndex > -1) {
      // Quitar like
      post.likes.splice(likeIndex, 1);
    } else {
      // Agregar like
      post.likes.push(userId);
    }

    await post.save();

    res.json({
      message: likeIndex > -1 ? 'Like removido' : 'Like agregado',
      post
    });

  } catch (error) {
    console.error('Error procesando like:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// @route   POST /api/posts/:id/comment
// @desc    Agregar comentario a una publicación
// @access  Private
router.post('/:id/comment', auth, [
  body('content')
    .trim()
    .notEmpty()
    .withMessage('El contenido del comentario es requerido')
    .isLength({ max: 1000 })
    .withMessage('El comentario no puede tener más de 1000 caracteres')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Datos inválidos',
        errors: errors.array()
      });
    }

    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    const newComment = {
      content: req.body.content,
      author: req.user._id
    };

    post.comments.push(newComment);
    await post.save();

    // Poblar el comentario recién agregado
    await post.populate('comments.author', 'username email avatar');

    res.status(201).json({
      message: 'Comentario agregado exitosamente',
      post
    });

  } catch (error) {
    console.error('Error agregando comentario:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;