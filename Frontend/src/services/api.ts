import axios from 'axios';
import { AuthResponse, Post, CreatePostData } from '../types';

const API_BASE_URL = 'https://blog-backen-qgmz.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos de timeout
});

// Interceptor para agregar el token a las requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  signup: async (username: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/signup', { username, email, password });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

export const postsAPI = {
  getAllPosts: async (): Promise<Post[]> => {
    const response = await api.get('/posts');
    return response.data;
  },

  getUserPosts: async (): Promise<Post[]> => {
    const response = await api.get('/posts/user');
    return response.data;
  },

  createPost: async (postData: CreatePostData): Promise<Post> => {
    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('content', postData.content);

    if (postData.images) {
      postData.images.forEach((image) => {
        formData.append('images', image);
      });
    }

    if (postData.documents) {
      postData.documents.forEach((doc) => {
        formData.append('documents', doc);
      });
    }

    if (postData.links) {
      formData.append('links', JSON.stringify(postData.links));
    }

    const response = await api.post('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  likePost: async (postId: string): Promise<Post> => {
    const response = await api.post(`/posts/${postId}/like`);
    return response.data;
  },

  addComment: async (postId: string, content: string): Promise<Post> => {
    const response = await api.post(`/posts/${postId}/comment`, { content });
    return response.data;
  },

  deletePost: async (postId: string): Promise<void> => {
    await api.delete(`/posts/${postId}`);
  },
};

export default api;