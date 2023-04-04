import { Entity, ObjectIdColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['login'])
export class User {
  @ObjectIdColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  hashPassword: string;

  @Column()
  login: string;
}
