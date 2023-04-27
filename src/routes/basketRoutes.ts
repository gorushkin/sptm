import { FastifyInstance } from 'fastify';
import { basketController } from '../controllers/basketController.js';

enum ROUTES {
  ROOT = '/',
  USER_ID = '/user/:userId',
  USER_ID_BASKET_ID = '/user/:userId/record/:recordId',
  BASKET_ID = '/:basketId',
}

export const basketRoutes = async (app: FastifyInstance) => {
  app.get(ROUTES.ROOT, basketController.getAllBaskets);
  // TODO: addBasketRecord = USER_ID
  app.post(ROUTES.ROOT, basketController.addBasketRecord);
  app.get(ROUTES.USER_ID, basketController.getBasket);
  app.delete(ROUTES.USER_ID_BASKET_ID, basketController.deleteBasketRecord);
  app.patch(ROUTES.USER_ID_BASKET_ID, basketController.updateBasketRecord);
  // app.get(ROUTES.BASKET_ID, basketController.getBasketRecord);
  // app.delete(ROUTES.USER_ID, basketController.deleteBasket);
  // app.patch(ROUTES.BASKET_ID, basketController.updateBasket.bind(basketController));
};
