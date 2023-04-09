import { AppDataSource } from './connections/data-source.js';
import { Book } from './entity/Book.js';
import { setupWorker } from './worker/worker.js';


const getBooks = async () => AppDataSource.manager.find(Book);

const init = async () => {
  try {
    await AppDataSource.initialize();
    setupWorker();
  } catch (error) {
    console.log(error);
  }
};


init();
