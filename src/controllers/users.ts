import { FastifyReply, FastifyRequest } from 'fastify';
import { ValidateError } from '../error.js';
import { User } from '../entity/User.js';
import { tokenService } from '../tokenService.js';
import { AppDataSource } from '../data-source.js';
import bcrypt from 'bcrypt';

export interface UserDTO {
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
  login: string;
}

type Rule = {
  field: string;
  isCorrect: (user: UserDTO) => boolean;
  getMessage: (field: string) => string;
};

const userMandatoryFileds: Rule[] = [
  {
    field: 'firstName',
    isCorrect: (user: UserDTO) => !!user.firstName,
    getMessage: (field: string) => `The ${field} field is required!`,
  },
  {
    field: 'lastName',
    isCorrect: (user: UserDTO) => !!user.lastName,
    getMessage: (field: string) => `The ${field} field is required!`,
  },
  {
    field: 'password',
    isCorrect: (user: UserDTO) => !!user.password,
    getMessage: (field: string) => `The ${field} field is required!`,
  },
  {
    field: 'passwordConfirm',
    isCorrect: (user: UserDTO) => user.password === user.passwordConfirm,
    getMessage: (field: string) => `The password confirm should be equal to password`,
  },
  {
    field: 'login',
    isCorrect: (user: UserDTO) => !!user.login,
    getMessage: (field: string) => `The ${field} field is required!`,
  },
];

class UserController {
  async register(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as UserDTO;

    const errors = userMandatoryFileds
      .map(({ field, isCorrect: check, getMessage }) => (check(body) ? '' : getMessage(field)))
      .filter(Boolean);

    if (!!errors.length) throw new ValidateError('Validate errors', 400, errors);

    const existingUser = await AppDataSource.manager.findOneBy(User, { login: body.login });

    if (existingUser) throw new ValidateError('User with this login is alredy exist', 400);

    const hashPassword = await bcrypt.hash(body.password, 3);

    const user = new User();
    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.hashPassword = hashPassword;
    user.login = body.login;

    await AppDataSource.manager.save(user);

    const token = tokenService.getToken(body);

    reply
      .headers({ Authorization: token })
      .status(200)
      .send({ message: `The user ${user.firstName} was created!` });
  }
}

export const userController = new UserController();
