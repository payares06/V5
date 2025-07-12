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
    if (user) {
      setCreatePostModalOpen(true);
    } else {
      setAuthModalOpen(true);
    }
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

  return (
    <div className="min-h-screen">
      <Header
        user={user}
        onMenuClick={() => setSidebarOpen(true)}
        onCreatePost={handleCreatePost}
        onLogin={() => setAuthModalOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PostFeed key={refreshPosts} />
      </main>

      {user && <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />}

      {user && <CreatePostModal
        isOpen={createPostModalOpen}
        onClose={() => setCreatePostModalOpen(false)}
        onPostCreated={handlePostCreated}
      />}

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
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