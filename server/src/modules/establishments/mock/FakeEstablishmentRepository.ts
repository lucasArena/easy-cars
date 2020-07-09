import IEstablismentRepository from '@interfaces/establishments/IEstablishmentRepository';
import ICreateEstablishment from '@interfaces/establishments/ICreateEstablishment';
import Establishment from '@interfaces/establishments/Establishment';
import { uuid } from 'uuidv4';

class EstablishmentRepository implements IEstablismentRepository {
  private repository: Establishment[] = [];

  public async index(): Promise<Establishment[]> {
    return this.repository;
  }

  public async findById(id: string): Promise<Establishment | undefined> {
    const establishment = this.repository.find(
      findEstablishment => findEstablishment.id === id,
    );

    return establishment;
  }

  public async create(data: ICreateEstablishment): Promise<Establishment> {
    const establishment = { id: uuid(), ...data };

    this.repository.push(establishment);
    return establishment;
  }

  public async save(establishment: Establishment): Promise<Establishment> {
    const findIndex = this.repository.findIndex(
      findEstablishment => findEstablishment.id === establishment.id,
    );

    this.repository[findIndex] = establishment;
    return establishment;
  }
}

export default EstablishmentRepository;
