import { Repository, getRepository } from 'typeorm';

import IEstablismentRepository from '@interfaces/establishments/IEstablishmentRepository';
import ICreateEstablishment from '@interfaces/establishments/ICreateEstablishment';
import Establishment from './entities/Establishment';

class UserRepository implements IEstablismentRepository {
  private repository: Repository<Establishment>;

  constructor() {
    this.repository = getRepository(Establishment);
  }

  public async index(): Promise<Establishment[]> {
    const establishments = await this.repository.find();

    return establishments;
  }

  public async findById(id: string): Promise<Establishment | undefined> {
    const establishment = this.repository.findOne(id);

    return establishment;
  }

  public async create(data: ICreateEstablishment): Promise<Establishment> {
    const establishment = this.repository.create(data);

    await this.repository.save(establishment);

    return establishment;
  }

  public async save(user: Establishment): Promise<Establishment> {
    return this.repository.save(user);
  }
}

export default UserRepository;
