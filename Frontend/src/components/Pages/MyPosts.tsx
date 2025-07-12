import React, { useState, useEffect } from 'react';
import { FileText, Plus, Trash2, Edit3 } from 'lucide-react';
import { Post } from '../../types';
import { postsAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import PostCard from '../Posts/PostCard';

const MyPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const fetchUserPosts = async () => {
    try {
      setLoading(true);
      const userPosts = await postsAPI.getUserPosts();
      setPosts(userPosts);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar las publicaciones');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserPosts();
    }
  }, [user]);

  const handleDeletePost = async (postId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
      try {
        await postsAPI.deletePost(postId);
        fetchUserPosts(); // Recargar la lista
      } catch (error) {
        console.error('Error al eliminar publicación:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <FileText className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Mis Publicaciones</h1>
        </div>
        <div className="text-sm text-gray-600">
          {posts.length} publicación{posts.length !== 1 ? 'es' : ''}
        </div>
      </div>

      {error && (
        <div className="glass-effect rounded-2xl p-6 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="glass-effect rounded-2xl p-8">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No tienes publicaciones aún
            </h3>
            <p className="text-gray-600 mb-6">
              ¡Crea tu primera publicación para comenzar a compartir contenido!
            </p>
            <button className="btn-primary flex items-center space-x-2 mx-auto">
              <Plus className="w-4 h-4" />
              <span>Crear Publicación</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post._id} className="relative">
              <PostCard
                post={post}
                onPostUpdate={fetchUserPosts}
              />
              
              {/* Botones de acción para el autor */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => {
                    // Aquí implementarías la edición
                    console.log('Editar post:', post._id);
                  }}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  title="Editar publicación"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeletePost(post._id)}
                  className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  title="Eliminar publicación"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPosts;