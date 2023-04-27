import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Relation,
  Index,
} from 'typeorm';
import { Book } from './Book.js';
import { User } from './User.js';

@Entity()
@Index(['user', 'book'], { unique: true })
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  user: Relation<User>;

  @ManyToOne(() => Book, (book) => book.id, { eager: true })
  book: Relation<Book>;
}
