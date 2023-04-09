import { Job } from 'bullmq';
import { bookService } from '../services/book.js';

type BookData = { title: string; author: string; content: string };

export const handler = async (job: Job) => {
  const { body } = job.data as {
    body: BookData;
  };

  await bookService.addBook(body);
};
