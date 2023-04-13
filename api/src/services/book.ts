import { AppDataSource } from '../connections/data-source.js';
import { Book } from '../entity/Book.js';

const getBooks = async () =>
  AppDataSource.getRepository(Book).find({
    cache: {
      id: 'books',
      milliseconds: 1000,
    },
  });

export const bookService = { getBooks };
