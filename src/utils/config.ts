import * as dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = Number(process.env.PORT) || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const SALT = process.env.SALT || 'salt';

export default {
  MONGODB_URI,
  PORT,
  JWT_SECRET,
  SALT
};
