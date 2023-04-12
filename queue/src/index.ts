import { AppDataSource } from './connections/data-source.js';
import { Book } from './entity/Book.js';
import { setupWorker } from './worker/worker.js';

const init = async () => {
  try {
    await AppDataSource.initialize();
    await AppDataSource.runMigrations();
    setupWorker();
  } catch (error) {
    console.log(error);
  }
};

init();
