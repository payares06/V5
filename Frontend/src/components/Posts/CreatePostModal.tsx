import React, { useState } from 'react';
import { X, Image, FileText, Link as LinkIcon, Plus, Trash2 } from 'lucide-react';
import { postsAPI } from '../../services/api';
import { CreatePostData } from '../../types';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onPostCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [images, setImages] = useState<File[]>([]);
  const [documents, setDocuments] = useState<File[]>([]);
  const [links, setLinks] = useState<{ title: string; url: string; description: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const postData: CreatePostData = {
        title: formData.title,
        content: formData.content,
        images: images.length > 0 ? images : undefined,
        documents: documents.length > 0 ? documents : undefined,
        links: links.length > 0 ? links.filter(link => link.title && link.url) : undefined,
      };

      await postsAPI.createPost(postData);
      onPostCreated();
      onClose();
      resetForm();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear la publicación');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', content: '' });
    setImages([]);
    setDocuments([]);
    setLinks([]);
    setError('');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocuments([...documents, ...Array.from(e.target.files)]);
    }
  };

  const addLink = () => {
    setLinks([...links, { title: '', url: '', description: '' }]);
  };

  const updateLink = (index: number, field: string, value: string) => {
    const updatedLinks = [...links];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setLinks(updatedLinks);
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const removeDocument = (index: number) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center sidebar-overlay overflow-y-auto">
      <div className="glass-effect rounded-2xl p-8 w-full max-w-2xl mx-4 my-8 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Nueva Publicación</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-field"
              placeholder="Escribe el título de tu publicación..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contenido
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="input-field min-h-[120px] resize-vertical"
              placeholder="¿Qué quieres compartir?"
              required
            />
          </div>

          {/* Imágenes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imágenes
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="images"
              />
              <label
                htmlFor="images"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Image className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">Seleccionar imágenes</span>
              </label>
            </div>
            {images.length > 0 && (
              <div className="mt-2 space-y-2">
                {images.map((image, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm text-gray-700">{image.name}</span>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Documentos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Documentos
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt,.xlsx,.pptx"
                onChange={handleDocumentChange}
                className="hidden"
                id="documents"
              />
              <label
                htmlFor="documents"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <FileText className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">Seleccionar documentos</span>
              </label>
            </div>
            {documents.length > 0 && (
              <div className="mt-2 space-y-2">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm text-gray-700">{doc.name}</span>
                    <button
                      type="button"
                      onClick={() => removeDocument(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Enlaces */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Enlaces
              </label>
              <button
                type="button"
                onClick={addLink}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar enlace</span>
              </button>
            </div>
            {links.map((link, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 mb-3">
                <div className="flex items-center justify-between mb-3">
                  <LinkIcon className="w-5 h-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => removeLink(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Título del enlace"
                    value={link.title}
                    onChange={(e) => updateLink(index, 'title', e.target.value)}
                    className="input-field"
                  />
                  <input
                    type="url"
                    placeholder="URL del enlace"
                    value={link.url}
                    onChange={(e) => updateLink(index, 'url', e.target.value)}
                    className="input-field"
                  />
                  <input
                    type="text"
                    placeholder="Descripción (opcional)"
                    value={link.description}
                    onChange={(e) => updateLink(index, 'description', e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>
            ))}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Publicando...' : 'Publicar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;