import { FastifyReply, FastifyRequest } from 'fastify';
import { ValidateError } from '../error.js';
import { addJobs } from '../queues.js';
import { service } from '../service.js';

export const addBook = async (request: FastifyRequest, reply: FastifyReply) => {
  const body = request.body as { title: string; author: string; content: string };
  if (!body.title || !body.author || !body.content)
    throw new ValidateError('There is no required information', 400);

  await addJobs(body);
  reply.status(200).send({ message: 'I will add this book a bit later!' });
};

export const getBooks = async (_request: FastifyRequest, reply: FastifyReply) => {
  const books = await service.getBooks();
  reply.status(200).send(books);
};
