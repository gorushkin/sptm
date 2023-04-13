import { Queue } from 'bullmq';
import { BookData } from '../types.js';
import { config } from '../utils/config.js';

const connection = { host: config.REDIS_HOST, port: config.REDIS_PORT };

const myQueue = new Queue('book', { connection });

const addBook = async (body: BookData) => {
  await myQueue.add('book', { body });
};

export const queue = { addBook };
