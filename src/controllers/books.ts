import { FastifyReply, FastifyRequest } from 'fastify';
import { ValidateError } from '../utils/error.js';
import { addJobs } from '../queues.js';
import { service } from '../service.js';
import { validateFields } from '../utils/validator.js';

export type BookData = { title: string; author: string; content: string };

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

    await addJobs(body);

    reply.status(200).send({ message: 'I will add this book a bit later!' });
  }

  async getBooks(_request: FastifyRequest, reply: FastifyReply) {
    const books = await service.getBooks();
    reply.status(200).send(books);
  }
}

export const bookController = new BookController();
