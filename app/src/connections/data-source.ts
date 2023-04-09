import 'reflect-metadata';
import path from 'path';
import { fileURLToPath } from 'url';
import { DataSource } from 'typeorm';

import { config } from '../utils/config.js';
import { Book } from '../entity/Book.js';
import { User } from '../entity/User.js';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.POSTRGERSS_HOST,
  port: config.POSTRGERSS_PORT,
  logging: true,
  username: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  database: config.POSTGRES_DB,
  synchronize: false,
  entities: [Book, User],
  migrations: [`${_dirname}/migrations/*.ts`],
  subscribers: [],
});
