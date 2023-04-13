import { AppDataSource, client } from '../connections/data-source.js';
import { Book } from '../entity/Book.js';

const getBooks = async () => {
  const cachedBooks = await client.get('books');

  if (!!cachedBooks) return JSON.parse(cachedBooks) as Book[];

  const books = await AppDataSource.getRepository(Book).find();

  if (!cachedBooks) await client.set('books', JSON.stringify(books));

  return books;
};

export const bookService = { getBooks };
