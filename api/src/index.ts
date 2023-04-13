import { AppDataSource, client } from './connections/data-source.js';
import { appStart } from './app/app.js';
import { config } from './utils/config.js';

const init = async () => {
  try {
    await client.connect();
    await AppDataSource.initialize();
    appStart(config.PORT);
  } catch (error) {
    console.log(error);
  }
};

init();
