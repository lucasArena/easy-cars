import { inject, injectable } from 'tsyringe';

import Vehicle from '@interfaces/vehicles/Vehicle';
import IVehiclesRepository from '@interfaces/vehicles/IVehiclesRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

@injectable()
class ListOneVehiclesService {
  constructor(
    @inject('VehiclesRepository')
    private vehiclesRepository: IVehiclesRepository,
  ) { }

  public async execute({ id }: IRequest): Promise<Vehicle> {
    const vehicle = await this.vehiclesRepository.findById(id);

    if (!vehicle) {
      throw new AppError('Vehicle does not exists', 400);
    }

    return vehicle;
  }
}

export default ListOneVehiclesService;
