import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Home, User, Settings, FileText, Image, Link as LinkIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: 'Inicio', action: () => navigate('/') },
    { icon: User, label: 'Mi Perfil', action: () => navigate('/profile') },
    { icon: FileText, label: 'Mis Publicaciones', action: () => navigate('/my-posts') },
    { icon: Image, label: 'Mis Imágenes', action: () => navigate('/my-images') },
    { icon: LinkIcon, label: 'Mis Enlaces', action: () => navigate('/my-links') },
    { icon: Settings, label: 'Configuración', action: () => navigate('/settings') },
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
        className={`fixed top-0 right-0 h-full w-80 glass-effect transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <h2 className="text-xl font-semibold text-gray-800">Menú</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{user?.username}</h3>
                <p className="text-sm text-gray-600">{user?.email}</p>
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
                    className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-white/50 rounded-lg transition-colors group"
                  >
                    <item.icon className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/20">
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="w-full btn-secondary text-red-600 hover:bg-red-50 border-red-200"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;