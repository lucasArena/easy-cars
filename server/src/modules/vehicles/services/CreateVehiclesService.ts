import { inject, injectable } from 'tsyringe';

import IVehiclesRepository from '@interfaces/vehicles/IVehiclesRepository';
import Vehicle from '@interfaces/vehicles/Vehicle';

@injectable()
class CreateEstablishmentService {
  constructor(
    @inject('VehiclesRepository')
    private vehiclesRepository: IVehiclesRepository,
  ) { }

  public async execute({
    brand,
    color,
    model,
    plate,
    type_id,
  }: Vehicle): Promise<Vehicle> {
    const vehicle = await this.vehiclesRepository.create({
      brand,
      model,
      color,
      plate,
      type_id,
    });

    return vehicle;
  }
}

export default CreateEstablishmentService;
