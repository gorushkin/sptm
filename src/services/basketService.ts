import { AppDataSource } from '../connections/data-source.js';
import { User } from '../entity/User.js';
import { Basket } from '../entity/Basket.js';
import { Book } from '../entity/Book.js';

const basketRepository = AppDataSource.getRepository(Basket);

class BasketService {
  async getBasketById(id: number) {
    return await basketRepository.findOneBy({ id });
  }

  async getUserBasket(user: User) {
    return await basketRepository.find({ where: { user }, relations: ['book'] });
  }

  addBasketRecord = async ({
    book,
    quantity,
    user,
  }: {
    user: User;
    book: Book;
    quantity: number;
  }) => {
    const basket = new Basket();
    basket.user = user;
    basket.book = book;
    basket.quantity = quantity;

    return await basketRepository.save(basket);
  };

  async getAllBasketRecords() {
    return await basketRepository.find();
  }

  async updateBasketRecord({ id, book, quantity }: { id: number; quantity?: number; book?: Book }) {
    return await basketRepository.update(id, { quantity, book });
  }

  async deleteBasketRecord(id: number) {
    return await basketRepository.delete(id);
  }

  async deleteBasket(baskets: Basket[]) {
    await Promise.all(baskets.map(async (basket) => await this.deleteBasketRecord(basket.id)));
  }
}

export const basketService = new BasketService();
