import React, { useState } from 'react';
import { User, Edit3, Save, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: user?.username || '',
    bio: user?.bio || '',
  });

  const handleSave = () => {
    // Aquí implementarías la lógica para actualizar el perfil
    console.log('Guardando perfil:', editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      username: user?.username || '',
      bio: user?.bio || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="glass-effect rounded-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Mi Perfil</h1>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Edit3 className="w-4 h-4" />
              <span>Editar</span>
            </button>
          )}
        </div>

        <div className="flex items-start space-x-8">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Información del perfil */}
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de usuario
                  </label>
                  <input
                    type="text"
                    value={editData.username}
                    onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Biografía
                  </label>
                  <textarea
                    value={editData.bio}
                    onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                    className="input-field min-h-[100px] resize-vertical"
                    placeholder="Cuéntanos sobre ti..."
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleSave}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancelar</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    {user?.username}
                  </h2>
                  <p className="text-gray-600">{user?.email}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Biografía</h3>
                  <p className="text-gray-600">
                    {user?.bio || 'No has agregado una biografía aún.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">0</div>
                    <div className="text-sm text-gray-600">Publicaciones</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">0</div>
                    <div className="text-sm text-gray-600">Seguidores</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">0</div>
                    <div className="text-sm text-gray-600">Siguiendo</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;