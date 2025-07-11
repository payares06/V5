const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título del enlace es requerido'],
    trim: true,
    maxlength: [200, 'El título no puede tener más de 200 caracteres']
  },
  url: {
    type: String,
    required: [true, 'La URL es requerida'],
    trim: true,
    match: [/^https?:\/\/.+/, 'Por favor ingresa una URL válida']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'La descripción no puede tener más de 500 caracteres']
  }
});

const documentSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'El contenido del comentario es requerido'],
    trim: true,
    maxlength: [1000, 'El comentario no puede tener más de 1000 caracteres']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título es requerido'],
    trim: true,
    maxlength: [200, 'El título no puede tener más de 200 caracteres']
  },
  content: {
    type: String,
    required: [true, 'El contenido es requerido'],
    trim: true,
    maxlength: [5000, 'El contenido no puede tener más de 5000 caracteres']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  images: [{
    type: String, // URLs de las imágenes
    trim: true
  }],
  documents: [documentSchema],
  links: [linkSchema],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [commentSchema],
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  isPublished: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Índices para mejorar el rendimiento
postSchema.index({ author: 1, createdAt: -1 });
postSchema.index({ title: 'text', content: 'text' });
postSchema.index({ tags: 1 });
postSchema.index({ createdAt: -1 });

// Middleware para popular automáticamente el autor y los comentarios
postSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'author',
    select: 'username email avatar'
  }).populate({
    path: 'comments.author',
    select: 'username email avatar'
  });
  next();
});

// Método virtual para contar likes
postSchema.virtual('likesCount').get(function() {
  return this.likes.length;
});

// Método virtual para contar comentarios
postSchema.virtual('commentsCount').get(function() {
  return this.comments.length;
});

// Asegurar que los virtuals se incluyan en JSON
postSchema.set('toJSON', { virtuals: true });
postSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Post', postSchema);