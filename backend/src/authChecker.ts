import 'dotenv/config';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { ContextType, JWTPayload } from './types';
import UserService from './services/user.service';

export async function authChecker({ context }: { context: ContextType }) {
  const { req } = context;
  const tokenInAuthHeaders = req.headers.authorization?.split(' ')[0];
  const tokenInCookie = cookie.parse(req.headers.cookie ?? '').token;
  const token = tokenInAuthHeaders ?? tokenInCookie;
  if (typeof token !== 'string') return false;
  const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY as string) as JWTPayload;
  if (typeof decoded !== 'object') return false;
  const id = decoded.userId;
  const currentUser = await new UserService().findUserById(id);
  if (currentUser === null) return false;
  context.currentUser = currentUser;
}
