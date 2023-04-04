import { AppDataSource } from '../src/data-source.js';
import { appStart } from './app.js';
import config from './utils/config.js';

const init = async () => {
  try {
    await AppDataSource.initialize();
    appStart(config.PORT);
  } catch (error) {
    console.log(error);
  }
};

init();
