import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { Post } from '../../types';
import { postsAPI } from '../../services/api';
import PostCard from './PostCard';

const PostFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
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
    fetchPosts();
  }, []);

  const handleRefresh = () => {
    fetchPosts();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="glass-effect rounded-2xl p-8 max-w-md mx-auto">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="btn-primary"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Mis Publicaciones</h2>
        <button
          onClick={handleRefresh}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Actualizar</span>
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="glass-effect rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No tienes publicaciones aún
            </h3>
            <p className="text-gray-600">
              ¡Crea tu primera publicación para comenzar a compartir contenido!
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onPostUpdate={fetchPosts}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostFeed;