import { MyFastify } from 'src/types.js';
import { bookController } from '../controllers/bookController.js';

enum ROUTES {
  ROOT = '/',
}

export const bookRoutes = async (app: MyFastify) => {
  app.post(ROUTES.ROOT, bookController.addBook);
  app.get(ROUTES.ROOT, bookController.getBooks);
};
