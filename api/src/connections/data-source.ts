import 'reflect-metadata';
import path from 'path';
import { fileURLToPath } from 'url';
import { DataSource } from 'typeorm';
import { createClient } from 'redis';

import { config } from '../utils/config.js';
import { Book } from '../entity/Book.js';
import { User } from '../entity/User.js';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

export const client = createClient({
  url: `redis://${config.REDIS_HOST}:${config.REDIS_PORT}`,
});

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.POSTRGERSS_HOST,
  port: config.POSTRGERSS_PORT,
  username: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  database: config.POSTGRES_DB,
  logging: true,
  synchronize: false,
  cache: {
    type: 'redis',
    options: {
      host: 'localhost',
      port: 6379,
    },
  },
  entities: [Book, User],
  migrations: [`${_dirname}/migrations/*.ts`],
  subscribers: [],
});
