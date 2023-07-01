import { AppDataSource } from '../connections/data-source.js';
import { User } from '../entity/User.js';
import { Cart } from '../entity/Cart.js';
import { Book } from '../entity/Book.js';
import { Store } from '../entity/Store.js';
import { CustomError } from '../utils/error.js';

const cartRepository = AppDataSource.getRepository(Cart);

type AddCartRecordProps = {
  user: User;
  book: Book;
  quantity: number;
  storeRecord: Store;
  newStoreQuantity: number;
};

type UpdateCartRecordProps = {
  id: number;
  quantity?: number;
  storeRecord: Store;
  newStoreQuantity: number;
};

class CartService {
  async getCartById(id: number) {
    return await cartRepository.findOneBy({ id });
  }

  getUserCart = async (user: User) => {
    return await cartRepository.find({ where: { user }, relations: ['book'] });
  };

  addCartRecord = async ({
    book,
    quantity,
    user,
    newStoreQuantity,
    storeRecord,
  }: AddCartRecordProps) => {
    const cart = new Cart();
    cart.user = user;
    cart.book = book;
    cart.quantity = quantity;

    await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
      try {
        await transactionalEntityManager.update(Store, storeRecord.id, {
          quantity: newStoreQuantity,
        });
        await transactionalEntityManager.save(cart);
      } catch (error) {
        throw new CustomError('There was an error during transaction', 400);
      }
    });
  };

  getAllCartRecords = async () => {
    return await cartRepository.find();
  };

  updateCartRecord = async ({
    id,
    quantity,
    newStoreQuantity,
    storeRecord,
  }: UpdateCartRecordProps) => {
    await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
      try {
        await transactionalEntityManager.update(Store, storeRecord.id, {
          quantity: newStoreQuantity,
        });
        await transactionalEntityManager.update(Cart, id, { quantity });
      } catch (error) {
        throw new CustomError('There was an error during transaction', 400);
      }
    });
  };

  async deleteCartRecord(id: number) {
    return await cartRepository.delete(id);
  }

  async deleteCart(carts: Cart[]) {
    await Promise.all(carts.map(async (cart) => await this.deleteCartRecord(cart.id)));
  }
}

export const cartService = new CartService();
