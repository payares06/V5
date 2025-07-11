import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import AuthModal from './components/Auth/AuthModal';
import CreatePostModal from './components/Posts/CreatePostModal';
import PostFeed from './components/Posts/PostFeed';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false);
  const [refreshPosts, setRefreshPosts] = useState(0);

  const handleCreatePost = () => {
    setCreatePostModalOpen(true);
  };

  const handlePostCreated = () => {
    setRefreshPosts(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-effect rounded-2xl p-8 max-w-md w-full mx-4 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Mi Blog Personal
          </h1>
          <p className="text-gray-600 mb-6">
            Comparte tus ideas, imágenes, documentos y enlaces con el mundo
          </p>
          <button
            onClick={() => setAuthModalOpen(true)}
            className="btn-primary w-full"
          >
            Comenzar
          </button>
        </div>

        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header
        onMenuClick={() => setSidebarOpen(true)}
        onCreatePost={handleCreatePost}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PostFeed key={refreshPosts} />
      </main>

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <CreatePostModal
        isOpen={createPostModalOpen}
        onClose={() => setCreatePostModalOpen(false)}
        onPostCreated={handlePostCreated}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;