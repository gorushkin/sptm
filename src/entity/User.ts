import { Entity, Column, Unique, PrimaryGeneratedColumn, OneToMany, Relation } from 'typeorm';
import { Cart } from './Cart.js';

@Entity()
@Unique(['login'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  hashPassword: string;

  @Column()
  login: string;

  @OneToMany(() => Cart, (cart) => cart.id)
  cart: Relation<Cart[]>;
}
