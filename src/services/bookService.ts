import { AppDataSource } from '../connections/data-source.js';
import { Book } from '../entity/Book.js';

const bookName = 'books';

const getBooks = async () =>
  AppDataSource.getRepository(Book).find({
    cache: {
      id: bookName,
      milliseconds: 1000,
    },
  });

const addBook = async ({
  title,
  author,
  content,
}: {
  title: string;
  author: string;
  content: string;
}) => {
  const book = new Book();
  book.title = title;
  book.author = author;
  book.content = content;
  await AppDataSource.queryResultCache?.remove([bookName]);
  await AppDataSource.manager.save(book);
};

export const getBook = async (id: number) => {
  const book = await AppDataSource.getRepository(Book).findOneBy({ id });
  return book;
};

export const bookService = { getBooks, addBook, getBook };
