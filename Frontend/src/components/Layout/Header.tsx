import React from 'react';
import { Menu, User, LogOut, PlusCircle, LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  user: any;
  onMenuClick: () => void;
  onCreatePost: () => void;
  onLogin: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onMenuClick, onCreatePost, onLogin }) => {
  const { logout } = useAuth();

  return (
    <header className="glass-effect sticky top-0 z-40 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Mi Blog
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onCreatePost}
              className="btn-primary flex items-center space-x-2 text-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">
                {user ? 'Nueva Publicación' : 'Iniciar Sesión'}
              </span>
            </button>

            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden sm:inline text-sm font-medium text-gray-700">
                    {user?.username}
                  </span>
                </div>

                <button
                  onClick={logout}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Cerrar sesión"
                >
                  <LogOut className="w-5 h-5" />
                </button>

                <button
                  onClick={onMenuClick}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <LogIn className="w-5 h-5" />
                <span className="hidden sm:inline font-medium">Iniciar Sesión</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;