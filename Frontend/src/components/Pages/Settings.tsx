import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Palette, Globe, Save } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

const Settings: React.FC = () => {
  const { language, theme, setLanguage, setTheme, t } = useSettings();
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
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">{t('settings.title')}</h1>
      </div>

      <div className="space-y-8">
        {/* Notificaciones */}
        <div className="glass-effect rounded-2xl p-6 dark:bg-gray-800/80 dark:border-gray-700/20">
          <div className="flex items-center space-x-3 mb-6">
            <Bell className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{t('settings.notifications')}</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300">{t('settings.emailNotifications')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings.emailNotificationsDesc')}</p>
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
                <h3 className="font-medium text-gray-700 dark:text-gray-300">{t('settings.browserNotifications')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings.browserNotificationsDesc')}</p>
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
                <h3 className="font-medium text-gray-700 dark:text-gray-300">{t('settings.comments')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings.commentsDesc')}</p>
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
                <h3 className="font-medium text-gray-700 dark:text-gray-300">{t('settings.likes')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings.likesDesc')}</p>
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
        <div className="glass-effect rounded-2xl p-6 dark:bg-gray-800/80 dark:border-gray-700/20">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{t('settings.privacy')}</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300">{t('settings.publicProfile')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings.publicProfileDesc')}</p>
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
                <h3 className="font-medium text-gray-700 dark:text-gray-300">{t('settings.showEmail')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings.showEmailDesc')}</p>
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
                <h3 className="font-medium text-gray-700 dark:text-gray-300">{t('settings.allowMessages')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings.allowMessagesDesc')}</p>
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
        <div className="glass-effect rounded-2xl p-6 dark:bg-gray-800/80 dark:border-gray-700/20">
          <div className="flex items-center space-x-3 mb-6">
            <Palette className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{t('settings.appearance')}</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">{t('settings.theme')}</h3>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as any)}
                className="input-field dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              >
                <option value="light">{t('theme.light')}</option>
                <option value="dark">{t('theme.dark')}</option>
                <option value="auto">{t('theme.auto')}</option>
              </select>
            </div>

            <div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">{t('settings.language')}</h3>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="input-field dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              >
                <option value="es">{t('language.es')}</option>
                <option value="en">{t('language.en')}</option>
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
            <span>{t('settings.save')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;