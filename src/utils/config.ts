import * as dotenv from 'dotenv';
dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const SALT = Number(process.env.SALT) || 10;
const REDIS_HOST = process.env.REDIS_HOST || 'redis';
const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;
const POSTGRES_HOST = process.env.POSTGRES_HOST || 'postgres';
const POSTGRES_PORT = Number(process.env.POSTGRES_PORT) || 5432;
const POSTGRES_USER = process.env.POSTGRES_USER || 'booksuser';
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'bookspassword';
const POSTGRES_DB = process.env.POSTGRES_DB || 'books';
const API_HOST = process.env.API_HOST || '0.0.0.0';

export const redisConnection = { host: REDIS_HOST, port: REDIS_PORT };

export const config = {
  PORT,
  JWT_SECRET,
  SALT,
  REDIS_HOST,
  REDIS_PORT,
  POSTGRES_PORT,
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  API_HOST,
};
