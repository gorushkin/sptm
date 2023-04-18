import { AppDataSource } from './connections/data-source.js';
import { appStart } from './app/app.js';
import { config } from './utils/config.js';
import { setupWorker } from './worker/worker.js';

const init = async () => {
  try {
    await AppDataSource.initialize();
    await setupWorker();
    appStart(config.PORT, config.API_HOST);
  } catch (error) {
    console.log(error);
  }
};

init();
