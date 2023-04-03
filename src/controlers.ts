import { FastifyReply, FastifyRequest } from 'fastify';
import { Book } from './entity/Book.js';
import { AppDataSource } from './data-source.js';
import { ValidateError } from './error.js';

export const addBook = async (request: FastifyRequest, reply: FastifyReply) => {
  const body = request.body as { title: string; author: string; content: string };
  if (!body.title || !body.author || !body.content)
    throw new ValidateError('There is no required information', 403);
  console.log('body: ', body);
  const book = new Book();
  book.title = body.title;
  book.author = body.author;
  book.content = body.content;
  // await AppDataSource.manager.save(book)
  reply.status(200).send({ message: 'I will add this book a bit later!' });
};

export const getBooks = async (request: FastifyRequest, reply: FastifyReply) => {
  const books = await AppDataSource.manager.find(Book);
  reply.status(200).send(books);
};
