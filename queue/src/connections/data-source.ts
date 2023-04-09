import 'reflect-metadata';
import path from 'path';
import { fileURLToPath, } from 'url';
import { DataSource, } from 'typeorm';

import config from '../utils/config.js';
import { Book } from '../entity/Book.js';

const _filename = fileURLToPath(import.meta.url,);
const _dirname = path.dirname(_filename,);

const MongoDataSource = new DataSource({
  type: 'mongodb',
  url: config.MONGODB_URI,
  useNewUrlParser: true,
  synchronize: true,
  useUnifiedTopology: true,
  username: "booksuser",
  password: "bookspassword",
  logging: true,
  database: 'books',
  ssl: false,
  entities: [ Book],
  migrations: [ `${_dirname}/migrations/*.ts`, ],
  subscribers: [],
},);


export { MongoDataSource as AppDataSource, };
