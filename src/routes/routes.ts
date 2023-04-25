import { FastifyInstance } from 'fastify';

import { bookRoutes } from './bookRoutes.js';
import { userRoutes } from './userRoutes.js';

enum ROUTES {
  ROOT = '/',
  USER = '/user',
  BOOK = '/book',
}

export const routes = async (app: FastifyInstance) => {
  app.register(bookRoutes, { prefix: ROUTES.BOOK });
  app.register(userRoutes, { prefix: ROUTES.USER });
};
