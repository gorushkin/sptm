import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Relation } from 'typeorm';
import { Book } from './Book.js';
import { User } from './User.js';

@Entity()
export class Basket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => User, (user) => user.id)
  user: Relation<User>;

  @ManyToOne(() => Book, (book) => book.id)
  book: Relation<Book>;
}
