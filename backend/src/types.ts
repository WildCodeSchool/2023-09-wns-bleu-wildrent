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
  currentUser?: User;
}

export interface JWTPayload {
  userId: number;
}

export type Message = {
  success: boolean;
  message: string;
};
