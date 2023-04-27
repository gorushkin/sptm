import { FastifyInstance } from 'fastify';
import { cartController } from '../controllers/cartController.js';

enum ROUTES {
  ROOT = '/',
  USER_ID = '/user/:userId',
  USER_ID_CART_ID = '/user/:userId/record/:recordId',
}

export const cartRoutes = async (app: FastifyInstance) => {
  app.get(ROUTES.ROOT, cartController.getAllCarts);
  app.post(ROUTES.ROOT, cartController.addCartRecord);
  app.delete(ROUTES.USER_ID_CART_ID, cartController.deleteCartRecord);
  app.get(ROUTES.USER_ID_CART_ID, cartController.getCartRecord);
  app.patch(ROUTES.USER_ID_CART_ID, cartController.updateCartRecord);
  app.get(ROUTES.USER_ID, cartController.getCart);
  app.delete(ROUTES.USER_ID, cartController.deleteCart);
};
