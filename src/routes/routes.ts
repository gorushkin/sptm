import { FastifyInstance } from 'fastify';

import { bookRoutes } from './bookRoutes.js';
import { userRoutes } from './userRoutes.js';
import { basketRoutes } from './basketRoutes.js';

enum ROUTES {
  ROOT = '/',
  USER = '/user',
  BOOK = '/book',
  BASKET = '/basket',
}

export const routes = async (app: FastifyInstance) => {
  app.register(bookRoutes, { prefix: ROUTES.BOOK });
  app.register(userRoutes, { prefix: ROUTES.USER });
  app.register(basketRoutes, { prefix: ROUTES.BASKET });
};
