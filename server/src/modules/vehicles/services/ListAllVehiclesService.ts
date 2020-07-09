import { inject, injectable } from 'tsyringe';

import Vehicle from '@interfaces/vehicles/Vehicle';
import IVehiclesRepository from '@interfaces/vehicles/IVehiclesRepository';

@injectable()
class ListAllVehiclesService {
  constructor(
    @inject('VehiclesRepository')
    private vehiclesRepository: IVehiclesRepository,
  ) { }

  public async execute(): Promise<Vehicle[]> {
    const establishments = await this.vehiclesRepository.index();
    return establishments;
  }
}

export default ListAllVehiclesService;
