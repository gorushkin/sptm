import jwt from 'jsonwebtoken';
import { UserDTO } from './controllers/users';

class TokenService {
  getToken(user: UserDTO) {
    const token = jwt.sign(user, 'secret', { expiresIn: 1000 * 10 });
    return token;
  }
}

export const tokenService = new TokenService();
