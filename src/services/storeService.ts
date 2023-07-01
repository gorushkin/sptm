import { Repository } from 'typeorm';
import { AppDataSource } from '../connections/data-source.js';
import { Store } from '../entity/Store.js';
import { Book } from '../entity/Book.js';

class StoreService {
  private repository: Repository<Store>;

  constructor() {
    this.repository = AppDataSource.getRepository(Store);
  }

  getStoreRecords = async () => this.repository.find({ relations: ['book'] });

  getStoreRecord = async (book: Book) =>
    this.repository.findOne({ where: { book }, relations: ['book'] });

  addStoreRecord = async (book: Book, quantity: number) => {
    const newStoreRecord = new Store();
    newStoreRecord.book = book;
    newStoreRecord.quantity = quantity;
    await this.repository.save(newStoreRecord);
  };

  updateStoreRecord = async (book: Book, quantity: number) => {
    const storeRecord = await this.getStoreRecord(book);

    if (!storeRecord) return this.addStoreRecord(book, quantity);

    await this.repository.update(storeRecord.id, { quantity });
  };

  deleteStoreRecord = async (book: Book) => this.repository.delete(book.id);
}

export const storeService = new StoreService();
