import { AppDataSource } from '../src/data-source.js';
import { appStart } from './app.js';
import config from './utils/config.js';

AppDataSource.initialize()
  .then(async () => {
    appStart(config.PORT);
  })
  .catch((error) => console.log(error));
