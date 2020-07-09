import { uuid } from 'uuidv4';

import ITokenProvider from '../models/ITokenProvider';

class FakeJwtTokenProvider implements ITokenProvider {
  validate(_: string): boolean {
    return true;
  }

  generate(): string {
    const token = uuid();
    return token;
  }
}

export default FakeJwtTokenProvider;
