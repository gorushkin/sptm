import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Book {
  @ObjectIdColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  author: string;
}
