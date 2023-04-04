import fastify, { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { AuthError, ValidateError } from './utils/error.js';
import { userController } from './controllers/users.js';
import { bookController } from './controllers/books.js';

const app = fastify();

const validateTokenMiddleware = (
  request: FastifyRequest,
  _reply: FastifyReply,
  next: HookHandlerDoneFunction
) => {
  const headers = request.headers as { authorization: string };
  const token = headers.authorization;
  if (!token) throw new AuthError();
  next();
};

app.post('/user/register', userController.register.bind(userController));
app.post('/user/login', userController.login.bind(userController));
app.get('/user', { preValidation: [validateTokenMiddleware] }, userController.getUsers);
app.post('/', bookController.addBook);
app.get('/', bookController.getBooks);

app.setErrorHandler(function (error, request, reply) {
  if (error instanceof ValidateError) {
    const { message, errors, statusCode } = error;
    reply.status(statusCode).send({ message, errors });
  }
  if (error instanceof AuthError) {
    const { message, statusCode } = error;
    reply.status(statusCode).send({ message });
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
