import User from './User';
import ICreateUser from './ICreateUser';

export default interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  create(data: ICreateUser): Promise<User>;
  save(dataUser: User): Promise<User>;
}
