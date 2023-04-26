import { FastifyInstance } from 'fastify';
import { basketController } from '../controllers/basketController.js';

enum ROUTES {
  ROOT = '/',
  USER_ID = '/:userId',
}

export const basketRoutes = async (app: FastifyInstance) => {
  app.post(ROUTES.ROOT, basketController.addBasket);
  app.get(ROUTES.ROOT, basketController.getAllBaskets);
  app.get(ROUTES.USER_ID, basketController.getBasketByUserId);
};
