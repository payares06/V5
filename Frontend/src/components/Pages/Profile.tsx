import React, { useState, useEffect } from 'react';
import { User, Edit3, Save, X, Grid3X3, Heart, MessageCircle, Calendar, MapPin } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { postsAPI } from '../../services/api';
import { Post } from '../../types';
import ImageModal from '../UI/ImageModal';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [editData, setEditData] = useState({
    username: user?.username || '',
    bio: user?.bio || '',
  });

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
    try {
      const userPosts = await postsAPI.getUserPosts();
      setPosts(userPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const openPostModal = (post: Post) => {
    setSelectedPost(post);
    if (post.images && post.images.length > 0) {
      setCurrentImageIndex(0);
      setImageModalOpen(true);
    }
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
    setSelectedPost(null);
  };

  const goToPreviousImage = () => {
    if (selectedPost?.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedPost.images.length - 1 : prev - 1
      );
    }
  };

  const goToNextImage = () => {
    if (selectedPost?.images) {
      setCurrentImageIndex((prev) => 
        prev === selectedPost.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="glass-effect rounded-2xl overflow-hidden">
        {/* Header del perfil */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32 relative">
          <div className="absolute -bottom-16 left-8">
            <div className="w-32 h-32 bg-white rounded-full p-1 shadow-xl">
              <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="absolute top-4 right-4 bg-white bg-opacity-20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all flex items-center space-x-2"
            >
              <Edit3 className="w-4 h-4" />
              <span>Editar Perfil</span>
            </button>
          )}
        </div>

        {/* Información del perfil */}
        <div className="pt-20 p-8">
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
              {/* Info básica */}
              <div className="ml-40">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {user?.username}
                </h1>
                <p className="text-gray-600 mb-4">{user?.email}</p>
                
                {/* Estadísticas */}
                <div className="flex space-x-8 mb-6">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-800">{posts.length}</div>
                    <div className="text-sm text-gray-600">publicaciones</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-800">0</div>
                    <div className="text-sm text-gray-600">seguidores</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-800">0</div>
                    <div className="text-sm text-gray-600">siguiendo</div>
                  </div>
                </div>

                {/* Biografía */}
                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    {user?.bio || 'No has agregado una biografía aún.'}
                  </p>
                </div>

                {/* Información adicional */}
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Se unió en {formatDate(user?.createdAt || new Date().toISOString())}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Separador */}
        <div className="border-t border-gray-200 mx-8"></div>

        {/* Navegación de contenido */}
        <div className="flex justify-center py-4">
          <div className="flex items-center space-x-2 text-gray-600 border-t-2 border-gray-800 pt-4">
            <Grid3X3 className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-wide">PUBLICACIONES</span>
          </div>
        </div>

        {/* Grid de publicaciones estilo Instagram */}
        <div className="p-8 pt-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 border-2 border-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-gray-300" />
              </div>
              <h3 className="text-xl font-light text-gray-600 mb-2">
                Comparte fotos
              </h3>
              <p className="text-gray-500">
                Cuando compartas fotos, aparecerán en tu perfil.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-4">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="aspect-square relative group cursor-pointer"
                  onClick={() => openPostModal(post)}
                >
                  {post.images && post.images.length > 0 ? (
                    <>
                      <img
                        src={post.images[0]}
                        alt={post.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      {/* Overlay con estadísticas */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-4 text-white">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-5 h-5 fill-current" />
                            <span className="font-semibold">{post.likes.length}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-5 h-5 fill-current" />
                            <span className="font-semibold">{post.comments.length}</span>
                          </div>
                        </div>
                      </div>
                      {/* Indicador de múltiples imágenes */}
                      {post.images.length > 1 && (
                        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
                          {post.images.length}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <User className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-xs text-gray-500 px-2">{post.title}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de imagen */}
      {selectedPost && selectedPost.images && selectedPost.images.length > 0 && (
        <ImageModal
          isOpen={imageModalOpen}
          onClose={closeImageModal}
          images={selectedPost.images}
          currentIndex={currentImageIndex}
          onPrevious={goToPreviousImage}
          onNext={goToNextImage}
        />
      )}
    </div>
  );
};

export default Profile;