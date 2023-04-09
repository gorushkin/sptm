import 'reflect-metadata';
import path from 'path';
import { fileURLToPath } from 'url';
import { DataSource } from 'typeorm';

import { config } from '../utils/config.js';
import { Book } from '../entity/Book.js';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.POSTRGERSS_HOST,
  port: config.POSTRGERSS_PORT,
  logging: false,
  username: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  database: config.POSTGRES_DB,
  synchronize: true,

  entities: [Book],
  migrations: [`${_dirname}/migrations/*.ts`],
  subscribers: [],
});
