import { MyFastify } from 'src/types.js';
import { storeController } from '../controllers/storeController.js';

enum ROUTES {
  ROOT = '/',
}

export const storeRoutes = async (app: MyFastify) => {
  app.get(ROUTES.ROOT, storeController.getStoreRecords);
  app.post(ROUTES.ROOT, storeController.updateStoreRecordQuantity);
  app.delete(ROUTES.ROOT, storeController.deleteStoreRecord);
};
