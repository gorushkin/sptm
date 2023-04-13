import { FastifyReply, FastifyRequest } from 'fastify';
import { ValidateError } from '../utils/error.js';
import { bookService } from '../services/book.js';
import { validateFields } from '../utils/validator.js';
import { queue } from '../queue/queue.js';
import { BookData } from '../types.js';
import { AppDataSource } from '../connections/data-source.js';

const bookMandatoryFileds = [
  {
    field: 'title',
    isCorrect: ({ title }: BookData) => !!title,
    getMessage: (field: string) => `The ${field} field is required!`,
  },
  {
    field: 'author',
    isCorrect: ({ author }: BookData) => !!author,
    getMessage: (field: string) => `The ${field} field is required!`,
  },
];

class BookController {
  async addBook(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as BookData;
    const errors = validateFields(bookMandatoryFileds, body);
    if (!!errors.length) throw new ValidateError('Validate errors', 400, errors);

    await queue.addBook(body);

    await AppDataSource.queryResultCache?.remove(['books']);

    reply.status(200).send({ message: 'I will add this book a bit later!' });
  }

  async getBooks(_request: FastifyRequest, reply: FastifyReply) {
    const books = await bookService.getBooks();
    reply.status(200).send(books);
  }
}

export const bookController = new BookController();
