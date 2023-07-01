import { AppDataSource } from '../connections/data-source.js';
import { User } from '../entity/User.js';
import { Cart } from '../entity/Cart.js';
import { Book } from '../entity/Book.js';

const cartRepository = AppDataSource.getRepository(Cart);

type AddCartRecordProps = {
  user: User;
  book: Book;
  quantity: number;
};

type UpdateCartRecordProps = { id: number; quantity?: number };

class CartService {
  async getCartById(id: number) {
    return await cartRepository.findOneBy({ id });
  }

  getUserCart = async (user: User) => {
    return await cartRepository.find({ where: { user }, relations: ['book'] });
  };

  addCartRecord = async ({ book, quantity, user }: AddCartRecordProps) => {
    const cart = new Cart();
    cart.user = user;
    cart.book = book;
    cart.quantity = quantity;

    return await cartRepository.save(cart);
  };

  getAllCartRecords = async () => {
    return await cartRepository.find();
  };

  updateCartRecord = async ({ id, quantity }: UpdateCartRecordProps) => {
    return await cartRepository.update(id, { quantity });
  };

  async deleteCartRecord(id: number) {
    return await cartRepository.delete(id);
  }

  async deleteCart(carts: Cart[]) {
    await Promise.all(carts.map(async (cart) => await this.deleteCartRecord(cart.id)));
  }
}

export const cartService = new CartService();
