import { inject, injectable } from 'tsyringe';

import Establishment from '@interfaces/establishments/Establishment';
import IEstablismentRepository from '@interfaces/establishments/IEstablishmentRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class UpdateEstablishmentsService {
  constructor(
    @inject('EstablishmentRepository')
    private establishmentRepository: IEstablismentRepository,
  ) { }

  public async execute({
    id,
    name,
    address,
    phone,
    quantity_cars,
    quantity_motorcycles,
  }: Omit<Establishment, 'cnpj'>): Promise<Establishment> {
    const establishmentExists = await this.establishmentRepository.findById(
      String(id),
    );

    if (!establishmentExists) {
      throw new AppError('Establishment does not exists', 400);
    }

    const establishment = await this.establishmentRepository.save({
      id,
      name,
      address,
      phone,
      quantity_cars,
      quantity_motorcycles,
    });

    return establishment;
  }
}

export default UpdateEstablishmentsService;
