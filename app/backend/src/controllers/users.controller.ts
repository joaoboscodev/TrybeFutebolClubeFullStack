import { Request, Response } from 'express';
import UsersService from '../services/users.service';

class UsersController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await UsersService.login(email, password);
    return res.status(result.status).json(result.data);
  }

  // static async loginRole(req: Request, res: Response) {
  //   const { user } = res.locals.users;
  //   const result = await UsersService.loginRole(user.id);
  //   return res.status(result.status).json(result.data);
  // }
}

export default UsersController;
