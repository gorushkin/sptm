import { MyFastify } from 'src/types.js';
import { userController } from '../controllers/userController.js';

enum ROUTES {
  REGISTER = '/register',
  LOGIN = '/login',
  ROOT = '/',
}

export const userRoutes = async (app: MyFastify) => {
  app.post(ROUTES.REGISTER, userController.register.bind(userController));
  app.post(ROUTES.LOGIN, userController.login.bind(userController));
  app.get(ROUTES.ROOT, { preHandler: app.authenticate }, userController.getUsers);
};
