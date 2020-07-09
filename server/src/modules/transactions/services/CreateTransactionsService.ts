import { inject, injectable } from 'tsyringe';

import ITransactionsRepository from '@interfaces/transactions/ITransactionsRepository';
import ITransaction from '@interfaces/transactions/ITransaction';
import ICreateTransaction from '@interfaces/transactions/ICreateTransaction';
import IVehicleRepository from '@interfaces/vehicles/IVehiclesRepository';
import IEstablismentRepository from '@interfaces/establishments/IEstablishmentRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateTransactionsService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
    @inject('VehiclesRepository')
    private vehiclesRepository: IVehicleRepository,
    @inject('EstablishmentRepository')
    private establishmentRepository: IEstablismentRepository,
  ) { }

  public async execute({
    establishment_id,
    vehicle_id,
    type,
  }: ICreateTransaction): Promise<ITransaction> {
    const establishmentExists = await this.establishmentRepository.findById(
      establishment_id,
    );

    if (!establishmentExists) {
      throw new AppError('Establishment provided does not exists', 400);
    }

    const vehicleExists = await this.vehiclesRepository.findById(vehicle_id);

    if (!vehicleExists) {
      throw new AppError('Vehicle provided does not exists', 400);
    }

    const transaction = await this.transactionsRepository.create({
      establishment_id,
      vehicle_id,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionsService;
