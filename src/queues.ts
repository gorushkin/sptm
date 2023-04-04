import { Queue, Worker } from 'bullmq';
import { service } from './service.js';
import { BookData } from './controllers/books.js';

const myQueue = new Queue('book');

const myWorker = new Worker('book', async (job) => {
  const { body } = job.data as {
    body: BookData;
  };

  await service.addBook(body);
});

const addJobs = async (body: BookData) => {
  await myQueue.add('book', { body });
};

myWorker.on('completed', () => {
  console.log('the book was addded to the list!');
});

myWorker.on('failed', (err) => {
  console.log('err: ', err);
});

export { addJobs };
