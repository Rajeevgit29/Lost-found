import React from 'react';

export interface Item {
  id: string;
  title: string;
  category: 'electronics' | 'clothing' | 'keys' | 'books' | 'other';
  status: 'lost' | 'found';
  location: string;
  timeAgo: string;
  image: string;
}

export interface Testimonial {
  id: string;
  text: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface User {
  name: string;
  email: string;
  university: string;
  avatar?: string;
}