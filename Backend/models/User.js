const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'El nombre de usuario es requerido'],
    unique: true,
    trim: true,
    minlength: [3, 'El nombre de usuario debe tener al menos 3 caracteres'],
    maxlength: [30, 'El nombre de usuario no puede tener más de 30 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingresa un email válido']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
  },
  avatar: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    maxlength: [500, 'La biografía no puede tener más de 500 caracteres'],
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Middleware para hashear la contraseña antes de guardar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Método para obtener datos públicos del usuario
userSchema.methods.toPublicJSON = function() {
  return {
    _id: this._id,
    username: this.username,
    email: this.email,
    avatar: this.avatar,
    bio: this.bio,
    createdAt: this.createdAt
  };
};

module.exports = mongoose.model('User', userSchema);