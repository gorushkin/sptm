export type BookDTO = { title: string; author: string; content: string };

export type AuthData = { login: string; password: string };

export type UserDTO = {
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
  login: string;
};

export type BasketDTO = {
  book: number;
  user: number;
  quantity: number;
};
