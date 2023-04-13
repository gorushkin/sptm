import { AppDataSource } from './connections/data-source.js';
import { setupWorker } from './worker/worker.js';

const init = async () => {
  try {
    await AppDataSource.initialize();
    setupWorker();
  } catch (error) {
    console.log(error);
  }

  try {
    await AppDataSource.runMigrations();
  } catch (error) {}
};

init();
