export interface User {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: User;
  images: string[];
  documents: Document[];
  links: Link[];
  likes: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  _id: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  url: string;
}

export interface Link {
  _id: string;
  title: string;
  url: string;
  description?: string;
}

export interface Comment {
  _id: string;
  content: string;
  author: User;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface CreatePostData {
  title: string;
  content: string;
  images?: File[];
  documents?: File[];
  links?: Omit<Link, '_id'>[];
}