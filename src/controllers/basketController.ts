import { FastifyReply, FastifyRequest } from 'fastify';
import { basketService } from '../services/basketService.js';
import { BasketDTO } from '../types.js';
import { userService } from '../services/userService.js';
import { bookService } from '../services/bookService.js';
import { ValidateError } from '../utils/error.js';
import { validateFields } from '../utils/validator.js';
import { userController } from './userController.js';

const basketRules = [
  {
    field: 'user',
    isCorrect: ({ user }: BasketDTO) => !!user,
    getMessage: (field: string) => `The ${field} property is required!`,
  },
  {
    field: 'book',
    isCorrect: ({ book }: BasketDTO) => !!book,
    getMessage: (field: string) => `The ${field} property is required!`,
  },
  {
    field: 'quantity',
    isCorrect: ({ quantity }: BasketDTO) => !!quantity,
    getMessage: (_field: string) => `There is an error with the payload`,
  },
];

class BasketController {
  validateRecordId = (basketId: string | undefined) => {
    if (!basketId) throw new ValidateError('There is no record id in request', 400);
  };
  validateRecord = async (basketId: string | undefined) => this.getRecord(basketId);
  validateFields = (data: BasketDTO) => {
    const errors = validateFields(basketRules, data);
    if (errors.length) throw new ValidateError('Validate errors', 400, errors);
  };
  getRecord = async (basketId: string | undefined) => {
    this.validateRecordId(basketId);
    const basket = await basketService.getBasketById(Number(basketId));
    if (!basket) throw new ValidateError('There is no record with such id', 400);
    return basket;
  };
  validateBelonging = async ({ recordId, userId }: { recordId: string; userId: string }) => {
    const record = await this.getRecord(recordId);
    const isRecordBelongCorrect = record.user.id === Number(userId);
    if (!isRecordBelongCorrect) throw new ValidateError('This record belongs to another user', 400);
  };
  addBasketRecord = async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body as BasketDTO;

    const errors = validateFields(basketRules, body);
    if (errors.length) throw new ValidateError('Validate errors', 400, errors);

    const user = await userService.getUserById(body.user);
    if (!user) throw new ValidateError('User id is not valid', 400);

    const book = await bookService.getBook(Number(body.book));
    if (!book) throw new ValidateError('Book id is not valid', 400);

    const userBooks = await basketService.getUserBasket(user);
    const userBooksIds = userBooks.map(({ book: { id } }) => id);

    const isBookExistInBasketAlready = userBooksIds.includes(book.id);

    if (isBookExistInBasketAlready) throw new ValidateError('Book is already exist in basket', 400);

    const basketRecord = await basketService.addBasketRecord({
      book,
      user,
      quantity: body.quantity,
    });

    reply.status(200).send(basketRecord);
  };

  getAllBaskets = async (_request: FastifyRequest, reply: FastifyReply) => {
    const baskets = await basketService.getAllBasketRecords();
    reply.status(200).send(baskets);
  };

  getBasket = async (request: FastifyRequest, reply: FastifyReply) => {
    const { userId } = request.params as { userId: string };
    if (!userId) throw new ValidateError('There is no user id in request', 400);
    const user = await userService.getUserById(Number(userId));
    if (!user) throw new ValidateError('There is no user with such id', 400);
    const basket = await basketService.getUserBasket(user);
    reply.status(200).send(basket);
  };

  deleteBasketRecord = async (request: FastifyRequest, reply: FastifyReply) => {
    const { recordId, userId } = request.params as {
      recordId: string;
      userId: string;
    };
    this.validateRecordId(recordId);
    await userController.validateUser(userId);
    await this.validateBelonging({ recordId, userId });
    await basketService.deleteBasketRecord(Number(recordId));
    reply.status(200).send({ message: `Record ${recordId} was deleted!!!` });
  };

  updateBasketRecord = async (request: FastifyRequest, reply: FastifyReply) => {
    // TODO: add validation to middleware
    const { recordId, userId } = request.params as {
      recordId: string;
      userId: string;
    };
    const body = request.body as BasketDTO;

    this.validateFields(body);
    await userController.validateUser(userId);
    this.validateBelonging({ recordId, userId });
    const book = await bookService.getBook(body.book);
    if (!book) throw new ValidateError('There is no book for this basket record', 400);
    const record = await this.getRecord(recordId);
    await basketService.updateBasketRecord({
      id: Number(recordId),
      quantity: body.quantity,
      book,
    });
    reply.status(200).send(record);
  };

  // deleteBasket = async (request: FastifyRequest, reply: FastifyReply) => {
  //   const { userId } = request.params as { userId: string | undefined };

  //   const user = await userController.getUser(userId);
  //   const baskets = await basketService.getUserBasket(user);

  //   await basketService.deleteBasket(baskets);

  //   reply.status(200).send({ message: 'The basket was deleted!!!!' });
  // };
}

export const basketController = new BasketController();
