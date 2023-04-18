import { FastifyReply, FastifyRequest } from 'fastify';
import { ValidateError } from '../utils/error.js';
import bcrypt from 'bcrypt';
import { validateFields } from '../utils/validator.js';
import jwt from 'jsonwebtoken';
import { config } from '../utils/config.js';
import { userService } from '../services/user.js';
import { AuthData, UserDTO } from 'src/types.js';

const userMandatoryFileds = [
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
    getMessage: (_field: string) => `The password confirm should be equal to password`,
  },
  {
    field: 'login',
    isCorrect: (user: UserDTO) => !!user.login,
    getMessage: (field: string) => `The ${field} field is required!`,
  },
];

const authMandatoryFileds = [
  {
    field: 'password',
    isCorrect: (user: AuthData) => !!user.password,
    getMessage: (field: string) => `The ${field} field is required!`,
  },
  {
    field: 'login',
    isCorrect: (user: AuthData) => !!user.login,
    getMessage: (field: string) => `The ${field} field is required!`,
  },
];

class UserController {
  getToken(payload: { login: string }) {
    return jwt.sign(payload, config.JWT_SECRET, { expiresIn: 1000 * 60 });
  }

  async register(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as UserDTO;

    const errors = validateFields(userMandatoryFileds, body);

    if (!!errors.length) throw new ValidateError('Validate errors', 400, errors);

    const existingUser = await userService.getUser(body.login);

    if (existingUser) throw new ValidateError('User with this login is alredy exist', 400);

    const hashPassword = await bcrypt.hash(body.password, config.SALT);

    await userService.adduser({ ...body, hashPassword });

    const token = this.getToken({ login: body.login });

    reply
      .headers({ Authorization: token })
      .status(200)
      .send({ message: `The user ${body.firstName} was created!` });
  }

  async login(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as AuthData;

    const errors = validateFields(authMandatoryFileds, body);

    if (!!errors.length) throw new ValidateError('Validate errors', 400, errors);

    const user = await userService.getUser(body.login);

    if (!user) throw new ValidateError('Wrong login or password', 400);

    const isPasswordCorrect = await bcrypt.compare(body.password, user.hashPassword);

    if (!isPasswordCorrect) throw new ValidateError('Wrong login or password', 400);

    const token = this.getToken({ login: body.login });

    reply.headers({ Authorization: token }).status(200);
  }

  async getUsers(_request: FastifyRequest, reply: FastifyReply) {
    const users = await userService.getUsers();
    reply.status(200).send(users);
  }
}

export const userController = new UserController();
