import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Plus, LogIn, User, LogOut } from 'lucide-react';
import { User as UserType } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useSettings } from '../../contexts/SettingsContext';

interface HeaderProps {
  user: UserType | null;
  onMenuClick: () => void;
  onCreatePost: () => void;
  onLogin: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onMenuClick, onCreatePost, onLogin }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { t } = useSettings();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="glass-effect sticky top-0 z-40 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all dark:from-blue-400 dark:to-purple-400"
            >
              {t('header.blog')}
            </button>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigate('/')}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors dark:text-gray-300 dark:hover:text-blue-400"
            >
              {t('header.home')}
            </button>
            {user && (
              <>
                <button
                  onClick={() => navigate('/profile')}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors dark:text-gray-300 dark:hover:text-blue-400"
                >
                  {t('header.profile')}
                </button>
                <button
                  onClick={() => navigate('/my-posts')}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors dark:text-gray-300 dark:hover:text-blue-400"
                >
                  {t('header.myPosts')}
                </button>
              </>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <button
                  onClick={onCreatePost}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('header.newPost')}</span>
                </button>

                <div className="flex items-center space-x-3">
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.username}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                  
                  <div className="relative group">
                    <button className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </button>
                    
                    {/* Dropdown menu */}
                    <div className="absolute right-0 mt-2 w-48 glass-effect rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 dark:bg-gray-800/80 dark:border-gray-700/20">
                      <div className="py-2">
                        <button
                          onClick={() => navigate('/profile')}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-white/50 flex items-center space-x-2 dark:text-gray-300 dark:hover:bg-gray-700/50"
                        >
                          <User className="w-4 h-4" />
                          <span>{t('header.profile')}</span>
                        </button>
                        <button
                          onClick={() => navigate('/settings')}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-white/50 flex items-center space-x-2 dark:text-gray-300 dark:hover:bg-gray-700/50"
                        >
                          <User className="w-4 h-4" />
                          <span>{t('header.settings')}</span>
                        </button>
                        <hr className="my-1 border-gray-200 dark:border-gray-700" />
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 dark:text-red-400 dark:hover:bg-red-900/20"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>{t('header.logout')}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={onMenuClick}
                    className="md:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={onLogin}
                className="btn-primary flex items-center space-x-2"
              >
                <LogIn className="w-4 h-4" />
                  <span>{t('header.login')}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;