import { inject, injectable } from 'tsyringe';

import Establishment from '@interfaces/establishments/Establishment';
import IEstablismentRepository from '@interfaces/establishments/IEstablishmentRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

@injectable()
class ListOneEstablishmentsService {
  constructor(
    @inject('EstablishmentRepository')
    private establishmentRepository: IEstablismentRepository,
  ) { }

  public async execute({ id }: IRequest): Promise<Establishment> {
    const establishment = await this.establishmentRepository.findById(id);

    if (!establishment) {
      throw new AppError('Establishment does not exists', 400);
    }
    return establishment;
  }
}

export default ListOneEstablishmentsService;
