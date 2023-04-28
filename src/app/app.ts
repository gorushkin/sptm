import fastify, { FastifyReply } from 'fastify';
import { routes } from '../routes/routes.js';
import { AuthError, ValidateError } from '../utils/error.js';
import { MyRequest } from '../types.js';
import { validateToken } from '../utils/validator.js';

const app = fastify();

app.register(routes);

app.decorateRequest('isAuthenticated', false);

app.addHook('preHandler', (request: MyRequest, _reply: FastifyReply) => {
  const token = request.headers.authorization;
  const isAuthenticated = token ? validateToken(token) : false;
  request.isAuthenticated = isAuthenticated;
});

app.decorate('authenticate', async (request: MyRequest, _reply: FastifyReply) => {
  if (!request.isAuthenticated) throw new AuthError();
});

app.setErrorHandler(function (error, _request, reply) {
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
  console.log(error.message);
  reply.status(500).send({ error: 'Something went wrong' });
});

export const appStart = async (port: number, host: string) => {
  try {
    await app.listen({ port, host }, () => {
      console.log(`Server started at port ${port}`);
    });
  } catch (err) {
    app.log.error(err);
  }
};
