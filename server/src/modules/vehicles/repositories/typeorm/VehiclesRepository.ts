import { Repository, getRepository } from 'typeorm';

import IVehiclesRepository from '@interfaces/vehicles/IVehiclesRepository';
import ICreateVehicle from '@interfaces/vehicles/ICreateVehicle';
import Vehicle from './entities/Vehicle';

class UserRepository implements IVehiclesRepository {
  private repository: Repository<Vehicle>;

  constructor() {
    this.repository = getRepository(Vehicle);
  }

  public async index(): Promise<Vehicle[]> {
    const vehicles = await this.repository.find();

    return vehicles;
  }

  public async findById(id: string): Promise<Vehicle | undefined> {
    const vehicle = await this.repository.findOne(id);

    return vehicle;
  }

  public async create(data: ICreateVehicle): Promise<Vehicle> {
    const vehicle = this.repository.create(data);

    await this.repository.save(vehicle);

    return vehicle;
  }

  public async save(user: Omit<Vehicle, 'cnpj'>): Promise<Vehicle> {
    return this.repository.save(user);
  }

  public async delete(id: string): Promise<Vehicle | undefined> {
    const vehicle = await this.repository.findOne(id);

    await this.repository.delete(id);

    return vehicle;
  }
}

export default UserRepository;
