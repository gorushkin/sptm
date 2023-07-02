import 'reflect-metadata';
import path from 'path';
import { fileURLToPath } from 'url';
import { DataSource } from 'typeorm';

import { config } from '../utils/config.js';
import { Book } from '../entity/Book.js';
import { User } from '../entity/User.js';
import { Cart } from '../entity/Cart.js';
import { Store } from '../entity/Store.js';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.POSTGRES_HOST,
  port: config.POSTGRES_PORT,
  username: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  database: config.POSTGRES_DB,
  logging: false,
  synchronize: false,
  cache: {
    type: 'redis',
    options: { url: `redis://${config.REDIS_HOST}:${config.REDIS_PORT}` },
  },
  entities: [Book, User, Cart, Store],
  migrations: [`${_dirname}/migrations/*.js`],
  subscribers: [],
});
