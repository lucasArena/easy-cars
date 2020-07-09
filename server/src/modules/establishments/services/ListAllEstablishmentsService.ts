import { inject, injectable } from 'tsyringe';

import Establishment from '@interfaces/establishments/Establishment';
import IEstablismentRepository from '@interfaces/establishments/IEstablishmentRepository';

@injectable()
class ListAllEstablishmentsService {
  constructor(
    @inject('EstablishmentRepository')
    private establishmentRepository: IEstablismentRepository,
  ) { }

  public async execute(): Promise<Establishment[]> {
    const establishments = await this.establishmentRepository.index();
    return establishments;
  }
}

export default ListAllEstablishmentsService;
