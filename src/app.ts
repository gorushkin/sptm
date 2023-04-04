import fastify from 'fastify';
import { addBook, getBooks } from './controllers/books.js';
import { ValidateError } from './error.js';
import { userController } from './controllers/users.js';

const app = fastify();

app.post('/user/register', userController.register);
app.post('/', addBook);
app.get('/', getBooks);

app.setErrorHandler(function (error, request, reply) {
  if (error instanceof ValidateError) {
    const { message, errors, statusCode } = error;
    reply.status(statusCode).send({ message, errors });
  }
  if (error instanceof SyntaxError) {
    reply.status(400).send({ error: 'Something wrong with your request' });
  }
  reply.status(500).send({ error: 'Something went wrong' });
});

export const appStart = async (port: number) => {
  try {
    await app.listen({ port });
    console.log(`Server started at port ${port}`);
  } catch (err) {
    app.log.error(err);
  }
};
