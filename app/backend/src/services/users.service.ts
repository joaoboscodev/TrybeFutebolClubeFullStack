import JWTtoken from '../utils/JWTtoken';

class UsersService {
  static async login(email: string, password: string) {
    if (!email || !password) {
      return { status: 400, data: { message: 'All fields must be filled' } };
    }
    const token = JWTtoken.signIn({ email });
    return { status: 200, data: { token } };
  }
}

export default UsersService;
