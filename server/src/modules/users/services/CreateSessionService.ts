import { inject, injectable } from 'tsyringe';

import IUserRepository from '@interfaces/users/IUserRepository';
import User from '@interfaces/users/User';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import ITokenProvider from '../providers/TokenProvider/models/ITokenProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  user: User;
}

@injectable()
class CreateSessionService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) { }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email/password does not exists', 401);
    }

    const convertedPassword = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!convertedPassword) {
      throw new AppError('Email/password does not exists', 401);
    }

    const token = this.tokenProvider.generate();

    return { user, token };
  }
}

export default CreateSessionService;
