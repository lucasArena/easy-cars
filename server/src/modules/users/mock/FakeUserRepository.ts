import { uuid } from 'uuidv4';

import IUserRepository from '@interfaces/users/IUserRepository';
import User from '@interfaces/users/User';

class FakeUserRepository implements IUserRepository {
  public repository: User[] = [];

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.repository.find(findUser => findUser.email === email);

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.repository.find(findUser => findUser.id === id);

    return user;
  }

  public async create(userData: User): Promise<User> {
    const user = { id: uuid(), ...userData };

    this.repository.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.repository.findIndex(
      findUser => findUser.id === user.id,
    );

    this.repository[findIndex] = user;
    return user;
  }
}

export default FakeUserRepository;
