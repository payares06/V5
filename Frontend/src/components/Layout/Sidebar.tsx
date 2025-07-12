import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Home, User, Settings, FileText, Image, Link as LinkIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useSettings } from '../../contexts/SettingsContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useSettings();

  const menuItems = [
    { icon: Home, label: t('header.home'), action: () => navigate('/') },
    { icon: User, label: t('sidebar.myProfile'), action: () => navigate('/profile') },
    { icon: FileText, label: t('sidebar.myPosts'), action: () => navigate('/my-posts') },
    { icon: Image, label: t('sidebar.myImages'), action: () => navigate('/my-images') },
    { icon: LinkIcon, label: t('sidebar.myLinks'), action: () => navigate('/my-links') },
    { icon: Settings, label: t('sidebar.settings'), action: () => navigate('/settings') },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 sidebar-overlay"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 glass-effect transform transition-transform duration-300 ease-in-out z-50 dark:bg-gray-800/80 dark:border-gray-700/20 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/20 dark:border-gray-700/20">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{t('sidebar.menu')}</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-white/20 dark:border-gray-700/20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">{user?.username}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      item.action();
                      onClose();
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-white/50 rounded-lg transition-colors group dark:text-gray-300 dark:hover:bg-gray-700/50"
                  >
                    <item.icon className="w-5 h-5 text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/20 dark:border-gray-700/20">
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="w-full btn-secondary text-red-600 hover:bg-red-50 border-red-200 dark:text-red-400 dark:hover:bg-red-900/20 dark:border-red-800"
            >
              {t('header.logout')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;