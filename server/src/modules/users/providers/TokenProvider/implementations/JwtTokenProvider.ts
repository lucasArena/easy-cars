import jwt from 'jsonwebtoken';

import authConfig from '@config/auth';
import ITokenProvider from '../models/ITokenProvider';

class JwtTokenProvider implements ITokenProvider {
  validate(token: string): boolean {
    try {
      jwt.verify(token, authConfig.jwt.secret);
      return true;
    } catch (error) {
      return false;
    }
  }

  generate(): string {
    const token = jwt.sign({}, authConfig.jwt.secret, {
      expiresIn: authConfig.jwt.expiresIn,
    });

    return token;
  }
}

export default JwtTokenProvider;
