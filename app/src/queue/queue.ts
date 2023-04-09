import { Queue } from 'bullmq';
import { BookData } from 'src/types.js';

const myQueue = new Queue('book');

const addBook = async (body: BookData) => {
  await myQueue.add('book', { body });
};

export const queue = { addBook };
