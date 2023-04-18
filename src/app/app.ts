import fastify from 'fastify';
import { routes } from '../routes/routes.js';
import { AuthError, ValidateError } from '../utils/error.js';

const app = fastify();

app.register(routes);

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
