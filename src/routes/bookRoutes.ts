import { FastifyInstance } from 'fastify';
import { bookController } from '../controllers/bookController.js';

enum ROUTES {
  ROOT = '/',
}

export const bookRoutes = async (app: FastifyInstance) => {
  app.post(ROUTES.ROOT, bookController.addBook);
  app.get(ROUTES.ROOT, bookController.getBooks);
};
