import { FastifyReply, HookHandlerDoneFunction } from "fastify";
import { FastifyRequest } from "fastify/types/request";
import { AuthError } from "../utils/error.js";

export const validateTokenMiddleware = (
  request: FastifyRequest,
  _reply: FastifyReply,
  next: HookHandlerDoneFunction
) => {
  const headers = request.headers as { authorization: string };
  const token = headers.authorization;
  if (!token) throw new AuthError();
  next();
};
