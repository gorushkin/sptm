import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { User } from './entity/User';

export type BookDTO = { title: string; author: string; content: string };

export type AuthData = { login: string; password: string };

export type UserDTO = {
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
  login: string;
};

export type CartRecordDTO = {
  book: number;
  quantity: number;
};

export type CartDTO = {
  user: number;
  book: number;
  quantity: number;
};

export type Rule<T> = {
  field: string;
  isCorrect: (user: T) => boolean;
  getMessage: (field: string) => string;
};

export type Validators = 'string' | 'positiveNumber';

export type CartProperties = 'quantity' | 'user' | 'book' | 'ddd';

export type PropertiesList<T> = { property: T; type: Validators }[];

export type MyRequest = FastifyRequest & {
  user: User | null;
  isAuthenticated: boolean;
};

export type MyFastify = FastifyInstance & {
  authenticate: (request: MyRequest, reply: FastifyReply) => void;
};

export type CartRequest = MyRequest & {
  params: {
    recordId: string;
    userId: string;
  };
  body: CartDTO;
};
