import IVehicleTypesRepository from '@interfaces/vehicleTypes/IVehicleTypesRepository';

import VehicleTypes from '@interfaces/vehicleTypes/IVehicleTypes';

class FakeVehicleTypesRepository implements IVehicleTypesRepository {
  private repository: VehicleTypes[] = [
    {
      name: 'Carro',
    },
    {
      name: 'Moto',
    },
  ];

  public async index(): Promise<VehicleTypes[]> {
    return this.repository;
  }
}

export default FakeVehicleTypesRepository;
