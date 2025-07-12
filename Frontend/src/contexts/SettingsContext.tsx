import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'es' | 'en';
export type Theme = 'light' | 'dark' | 'auto';

interface SettingsContextType {
  language: Language;
  theme: Theme;
  isDarkMode: boolean;
  setLanguage: (language: Language) => void;
  setTheme: (theme: Theme) => void;
  t: (key: string) => string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

// Traducciones
const translations = {
  es: {
    // Header
    'header.blog': 'Mi Blog',
    'header.home': 'Inicio',
    'header.profile': 'Mi Perfil',
    'header.myPosts': 'Mis Publicaciones',
    'header.newPost': 'Nueva Publicación',
    'header.login': 'Iniciar Sesión',
    'header.logout': 'Cerrar Sesión',
    'header.settings': 'Configuración',

    // Auth
    'auth.login': 'Iniciar Sesión',
    'auth.signup': 'Crear Cuenta',
    'auth.username': 'Nombre de usuario',
    'auth.email': 'Correo electrónico',
    'auth.password': 'Contraseña',
    'auth.loading': 'Cargando...',
    'auth.noAccount': '¿No tienes cuenta?',
    'auth.hasAccount': '¿Ya tienes cuenta?',
    'auth.createAccount': 'Crear cuenta',

    // Posts
    'posts.title': 'Título',
    'posts.content': 'Contenido',
    'posts.images': 'Imágenes',
    'posts.documents': 'Documentos',
    'posts.links': 'Enlaces',
    'posts.publish': 'Publicar',
    'posts.publishing': 'Publicando...',
    'posts.cancel': 'Cancelar',
    'posts.like': 'Me gusta',
    'posts.comment': 'Comentar',
    'posts.share': 'Compartir',
    'posts.addComment': 'Agregar comentario',
    'posts.writeComment': 'Escribe un comentario...',
    'posts.sending': 'Enviando...',
    'posts.noPostsYet': 'No tienes publicaciones aún',
    'posts.createFirst': '¡Crea tu primera publicación para comenzar a compartir contenido!',
    'posts.myPosts': 'Mis Publicaciones',
    'posts.recentPosts': 'Publicaciones Recientes',
    'posts.refresh': 'Actualizar',

    // Profile
    'profile.editProfile': 'Editar Perfil',
    'profile.username': 'Nombre de usuario',
    'profile.bio': 'Biografía',
    'profile.bioPlaceholder': 'Cuéntanos sobre ti...',
    'profile.save': 'Guardar',
    'profile.posts': 'publicaciones',
    'profile.followers': 'seguidores',
    'profile.following': 'siguiendo',
    'profile.joinedOn': 'Se unió en',
    'profile.noBio': 'No has agregado una biografía aún.',
    'profile.sharePhotos': 'Comparte fotos',
    'profile.photosWillAppear': 'Cuando compartas fotos, aparecerán en tu perfil.',

    // Settings
    'settings.title': 'Configuración',
    'settings.notifications': 'Notificaciones',
    'settings.privacy': 'Privacidad',
    'settings.appearance': 'Apariencia',
    'settings.language': 'Idioma',
    'settings.theme': 'Tema',
    'settings.save': 'Guardar Configuración',
    'settings.emailNotifications': 'Notificaciones por correo',
    'settings.emailNotificationsDesc': 'Recibe notificaciones en tu correo electrónico',
    'settings.browserNotifications': 'Notificaciones del navegador',
    'settings.browserNotificationsDesc': 'Recibe notificaciones en el navegador',
    'settings.comments': 'Comentarios',
    'settings.commentsDesc': 'Notificar cuando comenten tus publicaciones',
    'settings.likes': 'Me gusta',
    'settings.likesDesc': 'Notificar cuando den me gusta a tus publicaciones',
    'settings.publicProfile': 'Perfil público',
    'settings.publicProfileDesc': 'Permite que otros usuarios vean tu perfil',
    'settings.showEmail': 'Mostrar correo',
    'settings.showEmailDesc': 'Mostrar tu correo en el perfil público',
    'settings.allowMessages': 'Permitir mensajes',
    'settings.allowMessagesDesc': 'Permite que otros usuarios te envíen mensajes',

    // Theme options
    'theme.light': 'Claro',
    'theme.dark': 'Oscuro',
    'theme.auto': 'Automático',

    // Language options
    'language.es': 'Español',
    'language.en': 'English',

    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
    'common.delete': 'Eliminar',
    'common.edit': 'Editar',
    'common.close': 'Cerrar',
    'common.menu': 'Menú',

    // Sidebar
    'sidebar.menu': 'Menú',
    'sidebar.myProfile': 'Mi Perfil',
    'sidebar.myPosts': 'Mis Publicaciones',
    'sidebar.myImages': 'Mis Imágenes',
    'sidebar.myLinks': 'Mis Enlaces',
    'sidebar.settings': 'Configuración',

    // My Images
    'myImages.title': 'Mis Imágenes',
    'myImages.upload': 'Subir Imágenes',
    'myImages.noImages': 'No tienes imágenes aún',
    'myImages.uploadFirst': 'Sube tus primeras imágenes para comenzar tu galería personal.',

    // My Links
    'myLinks.title': 'Mis Enlaces',
    'myLinks.addLink': 'Agregar Enlace',
    'myLinks.noLinks': 'No tienes enlaces guardados',
    'myLinks.saveLinks': 'Guarda tus enlaces favoritos para acceder a ellos fácilmente.',
    'myLinks.addFirst': 'Agregar Primer Enlace',
    'myLinks.newLink': 'Agregar Nuevo Enlace',
    'myLinks.linkTitle': 'Título del enlace',
    'myLinks.linkUrl': 'URL del enlace',
    'myLinks.linkDescription': 'Descripción del enlace',
    'myLinks.saveLink': 'Guardar Enlace',
    'myLinks.visit': 'Visitar',
    'myLinks.savedOn': 'Guardado el',
  },
  en: {
    // Header
    'header.blog': 'My Blog',
    'header.home': 'Home',
    'header.profile': 'My Profile',
    'header.myPosts': 'My Posts',
    'header.newPost': 'New Post',
    'header.login': 'Login',
    'header.logout': 'Logout',
    'header.settings': 'Settings',

    // Auth
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.username': 'Username',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.loading': 'Loading...',
    'auth.noAccount': "Don't have an account?",
    'auth.hasAccount': 'Already have an account?',
    'auth.createAccount': 'Create account',

    // Posts
    'posts.title': 'Title',
    'posts.content': 'Content',
    'posts.images': 'Images',
    'posts.documents': 'Documents',
    'posts.links': 'Links',
    'posts.publish': 'Publish',
    'posts.publishing': 'Publishing...',
    'posts.cancel': 'Cancel',
    'posts.like': 'Like',
    'posts.comment': 'Comment',
    'posts.share': 'Share',
    'posts.addComment': 'Add comment',
    'posts.writeComment': 'Write a comment...',
    'posts.sending': 'Sending...',
    'posts.noPostsYet': "You don't have any posts yet",
    'posts.createFirst': 'Create your first post to start sharing content!',
    'posts.myPosts': 'My Posts',
    'posts.recentPosts': 'Recent Posts',
    'posts.refresh': 'Refresh',

    // Profile
    'profile.editProfile': 'Edit Profile',
    'profile.username': 'Username',
    'profile.bio': 'Bio',
    'profile.bioPlaceholder': 'Tell us about yourself...',
    'profile.save': 'Save',
    'profile.posts': 'posts',
    'profile.followers': 'followers',
    'profile.following': 'following',
    'profile.joinedOn': 'Joined on',
    'profile.noBio': "You haven't added a bio yet.",
    'profile.sharePhotos': 'Share photos',
    'profile.photosWillAppear': 'When you share photos, they will appear on your profile.',

    // Settings
    'settings.title': 'Settings',
    'settings.notifications': 'Notifications',
    'settings.privacy': 'Privacy',
    'settings.appearance': 'Appearance',
    'settings.language': 'Language',
    'settings.theme': 'Theme',
    'settings.save': 'Save Settings',
    'settings.emailNotifications': 'Email notifications',
    'settings.emailNotificationsDesc': 'Receive notifications in your email',
    'settings.browserNotifications': 'Browser notifications',
    'settings.browserNotificationsDesc': 'Receive notifications in the browser',
    'settings.comments': 'Comments',
    'settings.commentsDesc': 'Notify when someone comments on your posts',
    'settings.likes': 'Likes',
    'settings.likesDesc': 'Notify when someone likes your posts',
    'settings.publicProfile': 'Public profile',
    'settings.publicProfileDesc': 'Allow other users to see your profile',
    'settings.showEmail': 'Show email',
    'settings.showEmailDesc': 'Show your email on public profile',
    'settings.allowMessages': 'Allow messages',
    'settings.allowMessagesDesc': 'Allow other users to send you messages',

    // Theme options
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.auto': 'Auto',

    // Language options
    'language.es': 'Español',
    'language.en': 'English',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.close': 'Close',
    'common.menu': 'Menu',

    // Sidebar
    'sidebar.menu': 'Menu',
    'sidebar.myProfile': 'My Profile',
    'sidebar.myPosts': 'My Posts',
    'sidebar.myImages': 'My Images',
    'sidebar.myLinks': 'My Links',
    'sidebar.settings': 'Settings',

    // My Images
    'myImages.title': 'My Images',
    'myImages.upload': 'Upload Images',
    'myImages.noImages': "You don't have any images yet",
    'myImages.uploadFirst': 'Upload your first images to start your personal gallery.',

    // My Links
    'myLinks.title': 'My Links',
    'myLinks.addLink': 'Add Link',
    'myLinks.noLinks': 'No saved links',
    'myLinks.saveLinks': 'Save your favorite links to access them easily.',
    'myLinks.addFirst': 'Add First Link',
    'myLinks.newLink': 'Add New Link',
    'myLinks.linkTitle': 'Link title',
    'myLinks.linkUrl': 'Link URL',
    'myLinks.linkDescription': 'Link description',
    'myLinks.saveLink': 'Save Link',
    'myLinks.visit': 'Visit',
    'myLinks.savedOn': 'Saved on',
  },
};

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('es');
  const [theme, setThemeState] = useState<Theme>('light');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Función de traducción
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  // Cargar configuraciones guardadas
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    const savedTheme = localStorage.getItem('theme') as Theme;

    if (savedLanguage && ['es', 'en'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }

    if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
      setThemeState(savedTheme);
    }
  }, []);

  // Manejar cambios de tema
  useEffect(() => {
    const updateTheme = () => {
      let shouldBeDark = false;

      if (theme === 'dark') {
        shouldBeDark = true;
      } else if (theme === 'auto') {
        shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }

      setIsDarkMode(shouldBeDark);

      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    updateTheme();

    // Escuchar cambios en la preferencia del sistema
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', updateTheme);
      return () => mediaQuery.removeEventListener('change', updateTheme);
    }
  }, [theme]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const value = {
    language,
    theme,
    isDarkMode,
    setLanguage,
    setTheme,
    t,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};