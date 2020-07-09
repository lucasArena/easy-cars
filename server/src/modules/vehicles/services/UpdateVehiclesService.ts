import { inject, injectable } from 'tsyringe';

import IVehiclesRepository from '@interfaces/vehicles/IVehiclesRepository';
import Vehicle from '@interfaces/vehicles/Vehicle';
import AppError from '@shared/errors/AppError';

@injectable()
class UpdateVehiclesService {
  constructor(
    @inject('VehiclesRepository')
    private vehiclesRepository: IVehiclesRepository,
  ) { }

  public async execute({
    id,
    brand,
    color,
    model,
    plate,
    type_id,
  }: Vehicle): Promise<Vehicle> {
    const vehicleExists = await this.vehiclesRepository.findById(String(id));

    if (!vehicleExists) {
      throw new AppError('Vehicle does not exists', 400);
    }

    const vehicle = await this.vehiclesRepository.save({
      id,
      brand,
      model,
      color,
      plate,
      type_id,
    });

    return vehicle;
  }
}

export default UpdateVehiclesService;
