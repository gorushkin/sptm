import { AppDataSource } from '../connections/data-source.js';
import { User } from '../entity/User.js';

const getUser = async (login: string) => await AppDataSource.manager.findOneBy(User, { login });

const getUserById = async (id: number) => await AppDataSource.manager.findOneBy(User, { id });

const addUser = async ({
  firstName,
  lastName,
  hashPassword,
  login,
}: {
  firstName: string;
  lastName: string;
  hashPassword: string;
  login: string;
}) => {
  const user = new User();
  user.firstName = firstName;
  user.lastName = lastName;
  user.hashPassword = hashPassword;
  user.login = login;
  await AppDataSource.manager.save(user);
};

const getUsers = async () => {
  const users = await AppDataSource.manager.find(User);
  return users;
};

export const userService = { getUser, adduser: addUser, getUsers, getUserById };
