import { AppDataSource } from './connections/data-source.js';
import { appStart } from './app/app.js';
import { config } from './utils/config.js';

const init = async () => {
  try {
    await AppDataSource.initialize();
    await AppDataSource.runMigrations();
    appStart(config.PORT);
  } catch (error) {
    console.log(error);
  }
};

init();
