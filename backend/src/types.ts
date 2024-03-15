import User from './entities/user.entity';
import express from 'express';

export interface ContextType {
  req: express.Request;
  res: express.Response;
  currentUser?: User | null;
}

export interface Payload {
  userId: number;
  role: string;
}
