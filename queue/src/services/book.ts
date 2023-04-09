import { AppDataSource } from '../connections/data-source.js';
import { Book } from '../entity/Book.js';

const getBooks = async () => AppDataSource.manager.find(Book);

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
  console.log('book: ', book);
  try {
    await AppDataSource.manager.save(book);
  } catch (error) {
    console.log('error: ', error);
  }
};

export const bookService = { getBooks, addBook };
