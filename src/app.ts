import fastify from 'fastify';
import { addBook, getBooks } from './controlers.js';
import { CustomError } from './error.js';

const app = fastify();

app.post('/', addBook);
app.get('/', getBooks);

app.setErrorHandler(function (error, request, reply) {
  if (error instanceof CustomError) {
    reply.status(error.statusCode).send({ error: error.message });
  }
  throw error;
});

export const appStart = async (port: number) => {
  try {
    await app.listen({ port });
    console.log(`Server started at port ${port}`);
  } catch (err) {
    console.log('err: ', err);
    app.log.error(err);
    process.exit(1);
  }
};
