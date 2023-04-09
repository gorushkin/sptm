import * as dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongo';
const REDIS_HOST = process.env.REDIS_HOST || 'redis';
const POSTRGERSS_HOST = process.env.POSTRGERSS_HOST || 'postgres';
const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;
const POSTRGERSS_PORT = Number(process.env.POSTRGERSS_PORT) || 5432;
const POSTGRES_USER = process.env.POSTGRES_USER || 'booksuser';
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'bookspassword';
const POSTGRES_DB = process.env.POSTGRES_PASSWORD || 'books';

export const config = {
  MONGODB_URI,
  REDIS_HOST,
  REDIS_PORT,
  POSTRGERSS_PORT,
  POSTRGERSS_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
};
