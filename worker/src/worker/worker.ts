import { Job, Worker } from 'bullmq';
import { bookService } from '../services/book.js';
import { config } from '../utils/config.js';
import { client } from '../connections/data-source.js';

type BookData = { title: string; author: string; content: string };

const handler = async (job: Job) => {
  const { body } = job.data as {
    body: BookData;
  };

  await bookService.addBook(body);
};

export const setupWorker = async () => {
  const connection = { host: config.REDIS_HOST, port: config.REDIS_PORT };

  const myWorker = new Worker('book', handler, { connection });

  myWorker.on('completed', async () => {
    await client.set('books', '');
    console.log('the book was addded to the list!');
  });

  myWorker.on('failed', (err) => {
    console.log('err: ', err);
  });
};
