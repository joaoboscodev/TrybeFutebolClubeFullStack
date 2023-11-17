import * as bcrypt from 'bcryptjs';
import JWTtoken from '../utils/JWTtoken';
import loginValidation from '../middlewares/loginValidation';
import Users from '../database/models/Users.model';

class UsersService {
  static async login(email: string, password: string) {
    if (!email || !password) {
      return { status: 400, data: { message: 'All fields must be filled' } };
    }
    const isEmailValid = await loginValidation.isEmailValid(email);
    const isPasswordValid = await loginValidation.isPasswordValid(password);
    const loginData = await Users.findOne({ where: { email } });
    if (
      !isEmailValid
      || !isPasswordValid
      || !loginData
      || !bcrypt.compareSync(password, loginData.password)
    ) {
      return { status: 401, data: { message: 'Invalid email or password' } };
    }
    const token = JWTtoken.signIn({ email });
    return { status: 200, data: { token } };
  }

  static async loginRole(email: string) {
    const emailRole = await Users.findOne({ where: { email } }) as Users;
    const { role } = emailRole;
    return { status: 200, data: { role } };
  }
}

export default UsersService;
