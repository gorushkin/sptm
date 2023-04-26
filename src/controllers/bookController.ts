import { FastifyReply, FastifyRequest } from 'fastify';
import { ValidateError } from '../utils/error.js';
import { bookService } from '../services/bookService.js';
import { validateFields } from '../utils/validator.js';
import { queue } from '../queue/queue.js';
import { BookDTO } from '../types.js';

const bookMandatoryFileds = [
  {
    field: 'title',
    isCorrect: ({ title }: BookDTO) => !!title,
    getMessage: (field: string) => `The ${field} field is required!`,
  },
  {
    field: 'author',
    isCorrect: ({ author }: BookDTO) => !!author,
    getMessage: (field: string) => `The ${field} field is required!`,
  },
];

class BookController {
  async addBook(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as BookDTO;
    const errors = validateFields(bookMandatoryFileds, body);
    if (!!errors.length) throw new ValidateError('Validate errors', 400, errors);

    await queue.addBook(body);

    reply.status(200).send({ message: 'I will add this book a bit later!' });
  }

  async getBooks(_request: FastifyRequest, reply: FastifyReply) {
    const books = await bookService.getBooks();
    reply.status(200).send(books);
  }
}

export const bookController = new BookController();
