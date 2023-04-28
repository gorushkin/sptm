import { config } from '../utils/config.js';
import jwt from 'jsonwebtoken';

export const validateToken = async (token: string) => {
  try {
    jwt.verify(token, config.JWT_SECRET) as { login: string };
    return true;
  } catch (error) {
    return false;
  }
};
