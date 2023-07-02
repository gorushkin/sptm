import { FastifyRequest, FastifyReply } from 'fastify';
import { storeService } from '../services/storeService.js';
import { validateFields } from '../utils/validator.js';
import { ValidateError } from '../utils/error.js';
import { bookController } from './bookController.js';

export type StoreDTO = {
  id: string;
  quantity: number;
};

const storeCreateMandatoryFields = [
  {
    field: 'id',
    isCorrect: ({ id }: StoreDTO) => !!id,
    getMessage: (field: string) => `The ${field} field is required!`,
  },
  {
    field: 'quantity',
    isCorrect: ({ quantity }: StoreDTO) => !!quantity,
    getMessage: (field: string) => `The ${field} field is required!`,
  },
];

const storeDeleteMandatoryFields = [
  {
    field: 'id',
    isCorrect: ({ id }: StoreDTO) => !!id,
    getMessage: (field: string) => `The ${field} field is required!`,
  },
];

class StoreController {
  async getStoreRecords(_: FastifyRequest, reply: FastifyReply) {
    const books = await storeService.getStoreRecords();
    reply.status(200).send({ data: books });
  }

  async updateStoreRecordQuantity(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as StoreDTO;

    const errors = validateFields(storeCreateMandatoryFields, body);
    if (errors.length) throw new ValidateError('Validate errors', 400, errors);

    const book = await bookController.getBook(body.id);
    await storeService.updateStoreRecord(book, body.quantity);

    reply
      .status(200)
      .send({ message: `The book ${book.title} quantity is equal tp ${body.quantity}` });
    console.log('book: ', book);
  }

  async deleteStoreRecord(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as Omit<StoreDTO, 'quantity'>;
    const errors = validateFields(storeDeleteMandatoryFields, body);
    if (errors.length) throw new ValidateError('Validate errors', 400, errors);

    const book = await bookController.getBook(body.id);
    await storeService.deleteStoreRecord(book);

    reply.status(200).send({ message: `The book ${book.title} was deleted from the store` });
  }
}

export const storeController = new StoreController();
