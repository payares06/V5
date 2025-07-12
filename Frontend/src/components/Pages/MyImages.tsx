import React, { useState } from 'react';
import { Image, Upload, Trash2, Download } from 'lucide-react';

const MyImages: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Aquí implementarías la subida de imágenes
      console.log('Subiendo imágenes:', files);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Image className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Mis Imágenes</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="btn-primary flex items-center space-x-2 cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Subir Imágenes</span>
          </label>
        </div>
      </div>

      {images.length === 0 ? (
        <div className="text-center py-12">
          <div className="glass-effect rounded-2xl p-8">
            <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No tienes imágenes aún
            </h3>
            <p className="text-gray-600 mb-6">
              Sube tus primeras imágenes para comenzar tu galería personal.
            </p>
            <label
              htmlFor="image-upload"
              className="btn-primary flex items-center space-x-2 mx-auto cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Subir Imágenes</span>
            </label>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <div key={index} className="glass-effect rounded-2xl overflow-hidden group">
              <div className="relative">
                <img
                  src={image}
                  alt={`Imagen ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                    <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyImages;