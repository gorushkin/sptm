import { AppDataSource } from '../connections/data-source.js';
import { User } from '../entity/User.js';
import { Basket } from '../entity/Basket.js';
import { Book } from '../entity/Book.js';

const basketRepository = AppDataSource.getRepository(Basket);

class BasketService {
  async getBasketById(id: number) {
    return await basketRepository.findOneBy({ id });
  }

  async getBasketByUserId(user: User) {
    return await basketRepository.find({ where: { user }, relations: ['book'] });
  }

  async addBasket({ user, book, quantity }: { user: User; book: Book; quantity: number }) {
    const basket = new Basket();
    basket.user = user;
    basket.book = book;
    basket.quantity = quantity;
    return await basketRepository.save(basket);
  }

  async getAllBaskets() {
    return await basketRepository.find();
  }

  async updarteBasket(id: number, quantity: number) {
    return await basketRepository.update(id, { quantity });
  }
}

export const basketService = new BasketService();
