import { Repository, getRepository } from 'typeorm';

import IUserRepository from '@interfaces/users/IUserRepository';
import ICreateUser from '@interfaces/users/ICreateUser';
import User from './entities/User';

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.repository.findOne({ email });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.repository.findOne(id);

    return user;
  }

  public async create(data: ICreateUser): Promise<User> {
    const user = this.repository.create(data);

    await this.repository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.repository.save(user);
  }
}

export default UserRepository;
