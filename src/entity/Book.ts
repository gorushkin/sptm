import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Relation } from 'typeorm';
import { Basket } from './Basket.js';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  author: string;

  @OneToMany(() => Basket, (basket) => basket.id)
  basket: Relation<Basket[]>;
}
