import { FastifyInstance } from 'fastify';
import { userController } from '../controllers/users.js';
import { validateTokenMiddleware } from '../middlewares/validateTokenMiddleware.js';

enum ROUTES {
  REGISTER = '/register',
  LOGIN = '/login',
  ROOT = '/',
}

export const userRoutes = async (app: FastifyInstance) => {
  app.post(ROUTES.REGISTER, userController.register.bind(userController));
  app.post(ROUTES.LOGIN, userController.login.bind(userController));
  app.get(ROUTES.ROOT, { preValidation: [validateTokenMiddleware] }, userController.getUsers);
};
