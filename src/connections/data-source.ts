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
  host: config.POSTGRES_HOST,
  port: config.POSTGRES_PORT,
  username: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  database: config.POSTGRES_DB,
  logging: true,
  synchronize: false,
  cache: {
    type: 'redis',
    options: { url: `redis://${config.REDIS_HOST}:${config.REDIS_PORT}` },
  },
  entities: [Book, User],
  migrations: [`${_dirname}/migrations/*.js`],
  subscribers: [],
});
