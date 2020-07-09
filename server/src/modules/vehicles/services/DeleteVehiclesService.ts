import { inject, injectable } from 'tsyringe';

import Vehicle from '@interfaces/vehicles/Vehicle';
import IVehiclesRepository from '@interfaces/vehicles/IVehiclesRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

@injectable()
class DeleteVehiclesServices {
  constructor(
    @inject('VehiclesRepository')
    private vehiclesRepository: IVehiclesRepository,
  ) { }

  public async execute({ id }: IRequest): Promise<Vehicle | undefined> {
    const vehicleExists = await this.vehiclesRepository.findById(id);

    if (!vehicleExists) {
      throw new AppError('Vehicle does not exists', 400);
    }

    const vehicle = await this.vehiclesRepository.delete(id);

    return vehicle;
  }
}

export default DeleteVehiclesServices;
