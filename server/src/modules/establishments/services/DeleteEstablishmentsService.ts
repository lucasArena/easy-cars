import { inject, injectable } from 'tsyringe';

import Establishment from '@interfaces/establishments/Establishment';
import IEstablismentRepository from '@interfaces/establishments/IEstablishmentRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

@injectable()
class DeleteEstablishmentService {
  constructor(
    @inject('EstablishmentRepository')
    private establishmentRepository: IEstablismentRepository,
  ) { }

  public async execute({ id }: IRequest): Promise<Establishment | undefined> {
    const establishmentExists = await this.establishmentRepository.findById(id);

    if (!establishmentExists) {
      throw new AppError('Establishment does not exists', 400);
    }

    const establishment = await this.establishmentRepository.delete(id);

    return establishment;
  }
}

export default DeleteEstablishmentService;
