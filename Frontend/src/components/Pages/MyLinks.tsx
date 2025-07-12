import React, { useState } from 'react';
import { Link as LinkIcon, Plus, ExternalLink, Trash2, Edit3 } from 'lucide-react';

interface SavedLink {
  id: string;
  title: string;
  url: string;
  description?: string;
  createdAt: string;
}

const MyLinks: React.FC = () => {
  const [links, setLinks] = useState<SavedLink[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLink, setNewLink] = useState({
    title: '',
    url: '',
    description: '',
  });

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLink.title && newLink.url) {
      const link: SavedLink = {
        id: Date.now().toString(),
        ...newLink,
        createdAt: new Date().toISOString(),
      };
      setLinks([link, ...links]);
      setNewLink({ title: '', url: '', description: '' });
      setShowAddForm(false);
    }
  };

  const handleDeleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <LinkIcon className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Mis Enlaces</h1>
        </div>
        
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar Enlace</span>
        </button>
      </div>

      {/* Formulario para agregar enlace */}
      {showAddForm && (
        <div className="glass-effect rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Agregar Nuevo Enlace</h3>
          <form onSubmit={handleAddLink} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título
              </label>
              <input
                type="text"
                value={newLink.title}
                onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                className="input-field"
                placeholder="Título del enlace"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL
              </label>
              <input
                type="url"
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                className="input-field"
                placeholder="https://ejemplo.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción (opcional)
              </label>
              <textarea
                value={newLink.description}
                onChange={(e) => setNewLink({ ...newLink, description: e.target.value })}
                className="input-field min-h-[80px] resize-vertical"
                placeholder="Descripción del enlace"
              />
            </div>
            
            <div className="flex space-x-4">
              <button type="submit" className="btn-primary">
                Guardar Enlace
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setNewLink({ title: '', url: '', description: '' });
                }}
                className="btn-secondary"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de enlaces */}
      {links.length === 0 ? (
        <div className="text-center py-12">
          <div className="glass-effect rounded-2xl p-8">
            <LinkIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
             No tienes enlaces guardados
            </h3>
            <p className="text-gray-600 mb-6">
             Guarda tus enlaces favoritos para acceder a ellos fácilmente.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
             className="btn-primary flex items-center space-x-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
             <span>Agregar Primer Enlace</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {links.map((link) => (
            <div key={link.id} className="glass-effect rounded-2xl p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {link.title}
                  </h3>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-2 inline-flex items-center space-x-1"
                  >
                    <span>{link.url}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  {link.description && (
                    <p className="text-gray-600 text-sm">{link.description}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    Guardado el {new Date(link.createdAt).toLocaleDateString('es-ES')}
                  </p>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => {
                      // Implementar edición
                      console.log('Editar enlace:', link.id);
                    }}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Editar enlace"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteLink(link.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar enlace"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLinks;