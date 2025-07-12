const cloudinary = require('cloudinary').v2;

// Verificar que las variables de entorno estén configuradas
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error('❌ ERROR: Variables de Cloudinary no configuradas');
  console.error('Por favor configura CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY y CLOUDINARY_API_SECRET en tu archivo .env');
}

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log('🔧 Cloudinary configurado con cloud_name:', process.env.CLOUDINARY_CLOUD_NAME);

// Función para subir imagen a Cloudinary
const uploadImage = async (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    if (!buffer || buffer.length === 0) {
      reject(new Error('Buffer de imagen vacío'));
      return;
    }

    const uploadOptions = {
      resource_type: 'auto',
      folder: 'blog-images',
      quality: 'auto:good',
      fetch_format: 'auto',
      ...options
    };

    console.log('📤 Subiendo imagen a Cloudinary...');

    cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          console.error('❌ Error de Cloudinary:', error);
          reject(error);
        } else {
          console.log('✅ Imagen subida exitosamente:', result.secure_url);
          resolve(result);
        }
      }
    ).end(buffer);
  });
};

// Función para subir documento a Cloudinary
const uploadDocument = async (buffer, filename, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      resource_type: 'raw',
      folder: 'blog-documents',
      public_id: `doc_${Date.now()}_${filename}`,
      ...options
    };

    cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    ).end(buffer);
  });
};

// Función para eliminar archivo de Cloudinary
const deleteFile = async (publicId, resourceType = 'image') => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType
    });
    return result;
  } catch (error) {
    console.error('Error eliminando archivo de Cloudinary:', error);
    throw error;
  }
};

module.exports = {
  cloudinary,
  uploadImage,
  uploadDocument,
  deleteFile
};