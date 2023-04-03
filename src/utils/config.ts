import * as dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = Number(process.env.PORT) || 3000;

export default {
  MONGODB_URI,
  PORT,
};
