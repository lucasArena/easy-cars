import { inject, injectable } from 'tsyringe';

import IVehicleTypes from '@interfaces/vehicleTypes/IVehicleTypes';
import IVehicleTypesRepository from '@interfaces/vehicleTypes/IVehicleTypesRepository';

@injectable()
class ListAllVehicleTypesService {
  constructor(
    @inject('VehicleTypesRepository')
    private vehicleTypesRepostory: IVehicleTypesRepository,
  ) { }

  public async execute(): Promise<IVehicleTypes[]> {
    const vehiclesTypes = await this.vehicleTypesRepostory.index();
    return vehiclesTypes;
  }
}

export default ListAllVehicleTypesService;
