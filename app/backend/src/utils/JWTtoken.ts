import { JwtPayload, Secret, SignOptions, sign } from 'jsonwebtoken';

class JWTtoken {
  static secret: Secret = process.env.JWT_SECRET || 'jwt_secret';

  static jwtConfig: SignOptions = {
    algorithm: 'HS256', expiresIn: '1d',
  };

  static signIn(payload: JwtPayload): string {
    const token = sign(payload, this.secret, this.jwtConfig);
    return token;
  }

  // static verifyToken(token: string) {
  //   const decoded = verify(token, this.secret);
  //   return decoded;
  // }
}

export default JWTtoken;
