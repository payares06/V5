import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Palette, Globe, Save } from 'lucide-react';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      comments: true,
      likes: true,
    },
    privacy: {
      profilePublic: true,
      showEmail: false,
      allowMessages: true,
    },
    appearance: {
      theme: 'light',
      language: 'es',
    },
  });

  const handleSave = () => {
    // Aquí implementarías la lógica para guardar configuraciones
    console.log('Guardando configuraciones:', settings);
  };

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <SettingsIcon className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-800">Configuración</h1>
      </div>

      <div className="space-y-8">
        {/* Notificaciones */}
        <div className="glass-effect rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Bell className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Notificaciones</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-700">Notificaciones por correo</h3>
                <p className="text-sm text-gray-600">Recibe notificaciones en tu correo electrónico</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.email}
                  onChange={(e) => updateSetting('notifications', 'email', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-700">Notificaciones del navegador</h3>
                <p className="text-sm text-gray-600">Recibe notificaciones en el navegador</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.push}
                  onChange={(e) => updateSetting('notifications', 'push', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-700">Comentarios</h3>
                <p className="text-sm text-gray-600">Notificar cuando comenten tus publicaciones</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.comments}
                  onChange={(e) => updateSetting('notifications', 'comments', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-700">Me gusta</h3>
                <p className="text-sm text-gray-600">Notificar cuando den me gusta a tus publicaciones</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.likes}
                  onChange={(e) => updateSetting('notifications', 'likes', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Privacidad */}
        <div className="glass-effect rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Privacidad</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-700">Perfil público</h3>
                <p className="text-sm text-gray-600">Permite que otros usuarios vean tu perfil</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.privacy.profilePublic}
                  onChange={(e) => updateSetting('privacy', 'profilePublic', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-700">Mostrar correo</h3>
                <p className="text-sm text-gray-600">Mostrar tu correo en el perfil público</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.privacy.showEmail}
                  onChange={(e) => updateSetting('privacy', 'showEmail', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-700">Permitir mensajes</h3>
                <p className="text-sm text-gray-600">Permite que otros usuarios te envíen mensajes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.privacy.allowMessages}
                  onChange={(e) => updateSetting('privacy', 'allowMessages', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Apariencia */}
        <div className="glass-effect rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Palette className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Apariencia</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Tema</h3>
              <select
                value={settings.appearance.theme}
                onChange={(e) => updateSetting('appearance', 'theme', e.target.value)}
                className="input-field"
              >
                <option value="light">Claro</option>
                <option value="dark">Oscuro</option>
                <option value="auto">Automático</option>
              </select>
            </div>

            <div>
              <h3 className="font-medium text-gray-700 mb-2">Idioma</h3>
              <select
                value={settings.appearance.language}
                onChange={(e) => updateSetting('appearance', 'language', e.target.value)}
                className="input-field"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </div>
        </div>

        {/* Botón guardar */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="btn-primary flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Configuración</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;