import { AppDataSource } from '../connections/data-source.js';
import { User } from '../entity/User.js';
import { Cart } from '../entity/Cart.js';
import { Book } from '../entity/Book.js';

const cartRepository = AppDataSource.getRepository(Cart);

class CartService {
  async getCartById(id: number) {
    return await cartRepository.findOneBy({ id });
  }

  async getUserCart(user: User) {
    return await cartRepository.find({ where: { user }, relations: ['book'] });
  }

  addCartRecord = async ({
    book,
    quantity,
    user,
  }: {
    user: User;
    book: Book;
    quantity: number;
  }) => {
    const cart = new Cart();
    cart.user = user;
    cart.book = book;
    cart.quantity = quantity;

    return await cartRepository.save(cart);
  };

  async getAllCartRecords() {
    return await cartRepository.find();
  }

  async updateCartRecord({ id, quantity }: { id: number; quantity?: number }) {
    return await cartRepository.update(id, { quantity });
  }

  async deleteCartRecord(id: number) {
    return await cartRepository.delete(id);
  }

  async deleteCart(carts: Cart[]) {
    await Promise.all(carts.map(async (cart) => await this.deleteCartRecord(cart.id)));
  }
}

export const cartService = new CartService();
