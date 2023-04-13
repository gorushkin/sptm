import { AppDataSource, client } from './connections/data-source.js';
import { setupWorker } from './worker/worker.js';

const init = async () => {
  try {
    await AppDataSource.initialize();
    await client.connect();
    setupWorker();
  } catch (error) {
    console.log(error);
  }

  try {
    await AppDataSource.runMigrations();
  } catch (error) {}
};

init();
