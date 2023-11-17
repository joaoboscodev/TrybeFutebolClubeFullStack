import { NextFunction, Request, Response } from 'express';
import JWTtoken from '../utils/JWTtoken';

class tokenValidation {
  static isTokenValid(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const tokenSplited = authorization.split(' ')[1];
    try {
      const result = JWTtoken.verifyToken(tokenSplited);
      req.body.users = result;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}

export default tokenValidation;
