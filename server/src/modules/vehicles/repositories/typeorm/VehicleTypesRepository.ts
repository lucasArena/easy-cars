import { Repository, getRepository } from 'typeorm';

import IVehicleTypesRepository from '@interfaces/vehicleTypes/IVehicleTypesRepository';

import VehicleTypes from './entities/VehicleTypes';

class VehicleTypesRepository implements IVehicleTypesRepository {
  private repository: Repository<VehicleTypes>;

  constructor() {
    this.repository = getRepository(VehicleTypes);
  }

  public async index(): Promise<VehicleTypes[]> {
    const vehicleTypes = await this.repository.find();

    return vehicleTypes;
  }
}

export default VehicleTypesRepository;
