import { FastifyReply, FastifyRequest } from 'fastify';
import { basketService } from '../services/basketService.js';
import { BasketDTO } from '../types.js';
import { userService } from '../services/userService.js';
import { bookService } from '../services/bookService.js';
import { ValidateError } from '../utils/error.js';

class BasketController {
  async validateBasket(basketId: number | undefined) {
    if (!basketId) throw new ValidateError('There is no basket id in request', 400);
    const basket = await basketService.getBasketById(basketId);
    if (!basket) throw new ValidateError('There is no basket with such id', 400);
    return basket;
  }

  async addBasket(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as BasketDTO;

    const user = await userService.getUserById(body.user);
    const book = await bookService.getBook(body.book);

    if (!user || !book)
      throw new ValidateError('There is something wrong with book or user id', 400);

    const basket = await basketService.addBasket({ user, book, quantity: body.quantity });
    reply.status(200).send(basket);
  }

  async getAllBaskets(_request: FastifyRequest, reply: FastifyReply) {
    const baskets = await basketService.getAllBaskets();
    reply.status(200).send(baskets);
  }

  async getBasketByUserId(request: FastifyRequest, reply: FastifyReply) {
    const { userId } = request.params as { userId: string };
    if (!userId) throw new ValidateError('There is no user id in request', 400);
    const user = await userService.getUserById(Number(userId));
    if (!user) throw new ValidateError('There is no user with such id', 400);
    const basket = await basketService.getBasketByUserId(user);
    reply.status(200).send(basket);
  }

  async getBasketById(request: FastifyRequest, reply: FastifyReply) {
    const { basketId } = request.params as { basketId: string };
    if (!basketId) throw new ValidateError('There is no basket id in request', 400);
    const basket = await basketService.getBasketById(Number(basketId));
    if (!basket) throw new ValidateError('There is no basket with such id', 400);
    reply.status(200).send(basket);
  }

  async updateBasket(request: FastifyRequest, reply: FastifyReply) {
    const { basketId } = request.params as { basketId: string };
    const { quantity } = request.body as Pick<BasketDTO, 'quantity'>;
    if (!quantity) throw new ValidateError('There is no quantity', 400);
    await this.validateBasket(Number(basketId));
    const basket = await basketService.updarteBasket(Number(basketId), quantity);
    reply.status(200).send(basket);
  }
}

export const basketController = new BasketController();
