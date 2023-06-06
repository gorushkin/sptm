import { FastifyInstance } from 'fastify';

import { bookRoutes } from './bookRoutes.js';
import { userRoutes } from './userRoutes.js';
import { cartRoutes } from './cartRoutes.js';

enum ROUTES {
  ROOT = '/',
  USER = '/user',
  BOOK = '/book',
  CART = '/cart',
}

export const routes = async (app: FastifyInstance) => {
  app.register(bookRoutes, { prefix: ROUTES.BOOK });
  app.register(userRoutes, { prefix: ROUTES.USER });
  app.register(cartRoutes, { prefix: ROUTES.CART });
};
