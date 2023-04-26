import { Entity, Column, Unique, PrimaryGeneratedColumn, OneToMany, Relation } from 'typeorm';
import { Basket } from './Basket.js';

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

  @OneToMany(() => Basket, (basket) => basket.id)
  basket: Relation<Basket[]>;
}
