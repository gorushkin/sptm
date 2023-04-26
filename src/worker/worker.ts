import { Worker, Job } from 'bullmq';
import { bookService } from '../services/bookService.js';
import { BookDTO } from '../types';
import { redisConnection } from '../utils/config.js';

const handler = async (job: Job) => {
  const { body } = job.data as {
    body: BookDTO;
  };

  await bookService.addBook(body);
};

export const setupWorker = async () => {
  const myWorker = new Worker('book', handler, { connection: redisConnection });

  myWorker.on('completed', () => {
    console.log('the book was addded to the list!');
  });

  myWorker.on('failed', (err) => {
    console.log('err: ', err);
  });
};
