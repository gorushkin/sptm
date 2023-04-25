import { Queue } from 'bullmq';
import { BookDTO } from '../types.js';
import { redisConnection } from '../utils/config.js';

const myQueue = new Queue('book', { connection: redisConnection });

const addBook = async (body: BookDTO) => {
  await myQueue.add('book', { body });
};

export const queue = { addBook };
