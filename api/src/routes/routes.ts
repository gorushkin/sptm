import { FastifyInstance } from 'fastify';
import { userController } from '../controllers/users.js';
import { bookController } from '../controllers/books.js';
import { validateTokenMiddleware } from '../middlewares/validateTokenMiddleware.js';

export const routes = async (app: FastifyInstance) => {
  app.post('/user/register', userController.register.bind(userController));
  app.post('/user/login', userController.login.bind(userController));
  app.get('/user', { preValidation: [validateTokenMiddleware] }, userController.getUsers);
  app.post('/', bookController.addBook);
  app.get('/', bookController.getBooks);
};
