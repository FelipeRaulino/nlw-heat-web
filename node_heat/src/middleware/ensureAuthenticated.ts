import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayloadResponse{
  sub: string;
}

export function ensureAuthenticated(
  request: Request, 
  response: Response, 
  next: NextFunction
){
  const bearerToken = request.headers.authorization;

  if (!bearerToken){
    response.status(401).json({ error: 'Missing token or invalid.' });
  }

  const [, token] = bearerToken.split(' ');

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayloadResponse;

    request.user_id = sub;

    next();
  } catch (error) {
    response.status(401).json({ error: 'Token invalid or expired.' });
  }
}