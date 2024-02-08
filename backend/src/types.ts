import User from './entities/user.entity';
import express from 'express';

export interface Ad {
  id: number;
  title: string;
  description: string;
  owner: string;
  price: number;
  picture: string;
  createdAt: string;
  location: string;
}
export interface ContextType {
  req: express.Request;
  res: express.Response;
  currentUser?: User | null;
}

export interface JWTPayload {
  userId: number;
}
