import { AppDataSource } from './connections/data-source.js';
import { Worker } from 'bullmq';
import { handler } from './worker/worker.js';

const init = async () => {
  try {
    await AppDataSource.initialize();

    const myWorker = new Worker('book', handler);

    myWorker.on('completed', () => {
      console.log('the book was addded to the list!');
    });

    myWorker.on('failed', (err) => {
      console.log('err: ', err);
    });

  } catch (error) {
    console.log(error);
  }
};

init();
