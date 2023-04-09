import { Queue, Worker } from 'bullmq';
import { BookData } from 'src/types.js';
import { bookService } from '../services/book.js';

const myQueue = new Queue('book');

const myWorker = new Worker('book', async (job) => {
  const { body } = job.data as {
    body: BookData;
  };

  await bookService.addBook(body);
});

const addBook = async (body: BookData) => {
  await myQueue.add('book', { body });
};

myWorker.on('completed', () => {
  console.log('the book was addded to the list!');
});

myWorker.on('failed', (err) => {
  console.log('err: ', err);
});

export const queue = { addBook };
