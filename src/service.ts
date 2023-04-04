import { AppDataSource } from './data-source.js';
import { Book } from './entity/Book.js';
import { User } from './entity/User.js';

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
  await AppDataSource.manager.save(book);
};

const getUser = async (login: string) => await AppDataSource.manager.findOneBy(User, { login });

const adduser = async ({
  firstName,
  lastName,
  hashPassword,
  login,
}: {
  firstName: string;
  lastName: string;
  hashPassword: string;
  login: string;
}) => {
  const user = new User();
  user.firstName = firstName;
  user.lastName = lastName;
  user.hashPassword = hashPassword;
  user.login = login;
  await AppDataSource.manager.save(user);
};

const getUsers = async () => {
  const users = await AppDataSource.manager.find(User);
  return users;
};

export const service = { getBooks, addBook, getUser, adduser, getUsers };
