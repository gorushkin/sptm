import { FastifyReply, FastifyRequest } from 'fastify';
import { cartService } from '../services/cartService.js';
import { CartDTO, CartProperties, PropertiesList } from '../types.js';
import { userService } from '../services/userService.js';
import { bookService } from '../services/bookService.js';
import { ValidateError } from '../utils/error.js';
import { validateProperties } from '../utils/validator.js';
import { userController } from './userController.js';
import { Book } from 'src/entity/Book.js';

const cartProperties: PropertiesList<CartProperties> = [
  { property: 'quantity', type: 'positiveNumber' },
  { property: 'user', type: 'positiveNumber' },
  { property: 'book', type: 'positiveNumber' },
];

class CartController {
  validateRecord = async (cartId: string | undefined) => this.getRecord(cartId);

  validateProperties = (properties: CartProperties[], data: { [key: string]: unknown }) => {
    const errors = validateProperties<CartProperties>(properties, cartProperties, data);

    if (errors.length) throw new ValidateError('Validate errors', 400, errors);
  };

  getRecord = async (cartId: string | undefined) => {
    const cart = await cartService.getCartById(Number(cartId));
    if (!cart) throw new ValidateError('There is no record with such id', 400);
    return cart;
  };

  validateBelonging = async ({ recordId, userId }: { recordId: string; userId: string }) => {
    const record = await this.getRecord(recordId);
    const isRecordBelongCorrect = record.user.id === Number(userId);
    if (!isRecordBelongCorrect) throw new ValidateError('This record belongs to another user', 400);
  };

  validateBookPrecence = async ({ userId, book }: { userId: number; book: Book }) => {
    const user = await userService.getUserById(userId);
    if (!user) throw new ValidateError('User id is not valid', 400);
    const userBooks = await cartService.getUserCart(user);
    const userBooksIds = userBooks.map(({ book: { id } }) => id);
    const isBookExistInCartAlready = userBooksIds.includes(book.id);
    if (isBookExistInCartAlready) throw new ValidateError('Book is already exist in cart', 400);
  };

  addCartRecord = async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body as CartDTO;

    this.validateProperties(['book', 'quantity', 'user'], body);

    const user = await userService.getUserById(body.user);
    if (!user) throw new ValidateError('User id is not valid', 400);

    const book = await bookService.getBook(Number(body.book));
    if (!book) throw new ValidateError('Book id is not valid', 400);

    const userBooks = await cartService.getUserCart(user);
    const userBooksIds = userBooks.map(({ book: { id } }) => id);

    const isBookExistInCartAlready = userBooksIds.includes(book.id);

    if (isBookExistInCartAlready) throw new ValidateError('Book is already exist in cart', 400);

    const cartRecord = await cartService.addCartRecord({
      book,
      user,
      quantity: body.quantity,
    });

    reply.status(200).send(cartRecord);
  };

  getAllCarts = async (_request: FastifyRequest, reply: FastifyReply) => {
    const carts = await cartService.getAllCartRecords();
    reply.status(200).send(carts);
  };

  getCart = async (request: FastifyRequest, reply: FastifyReply) => {
    const { userId } = request.params as { userId: string };
    const user = await userService.getUserById(Number(userId));
    if (!user) throw new ValidateError('There is no user with such id', 400);
    const cart = await cartService.getUserCart(user);
    reply.status(200).send(cart);
  };

  deleteCartRecord = async (request: FastifyRequest, reply: FastifyReply) => {
    const { recordId, userId } = request.params as {
      recordId: string;
      userId: string;
    };
    await userController.validateUser(userId);
    await this.validateBelonging({ recordId, userId });
    await cartService.deleteCartRecord(Number(recordId));
    reply.status(200).send({ message: `Record ${recordId} was deleted!!!` });
  };

  updateCartRecord = async (request: FastifyRequest, reply: FastifyReply) => {
    // TODO: add validation to middleware
    const { recordId, userId } = request.params as {
      recordId: string;
      userId: string;
    };
    const body = request.body as CartDTO;

    this.validateProperties(['quantity'], body);
    await userController.validateUser(userId);
    await this.validateBelonging({ recordId, userId });

    await cartService.updateCartRecord({
      id: Number(recordId),
      quantity: body.quantity,
    });
    reply.status(200).send({ message: `Record ${recordId} was updated!!!` });
  };

  getCartRecord = async (request: FastifyRequest, reply: FastifyReply) => {
    const { recordId, userId } = request.params as {
      recordId: string;
      userId: string;
    };

    await userController.validateUser(userId);
    const record = await this.getRecord(recordId);
    reply.status(200).send(record);
  };

  deleteCart = async (request: FastifyRequest, reply: FastifyReply) => {
    const { userId } = request.params as { userId: string };
    const user = await userService.getUserById(Number(userId));
    if (!user) throw new ValidateError('There is no user with such id', 400);
    const cart = await cartService.getUserCart(user);
    await cartService.deleteCart(cart);
    reply.status(200).send('deleteCart');
  };
}

export const cartController = new CartController();
