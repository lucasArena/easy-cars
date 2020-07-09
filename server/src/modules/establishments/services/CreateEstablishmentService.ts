import { inject, injectable } from 'tsyringe';

import Establishment from '@interfaces/establishments/Establishment';
import AppError from '@shared/errors/AppError';
import IEstablismentRepository from '@interfaces/establishments/IEstablishmentRepository';
import ICNPJCPFValidatorProvider from '../providers/CNPJCPFValidatorProvider/models/ICNPJCPFValidatorProvider';

@injectable()
class CreateEstablishmentService {
  constructor(
    @inject('EstablishmentRepository')
    private establishmentRepository: IEstablismentRepository,
    @inject('CNPJCPFValidatorProvider')
    private validatorCNPJCPFValidatorProvider: ICNPJCPFValidatorProvider,
  ) { }

  public async execute({
    name,
    cnpj,
    address,
    phone,
    quantity_cars,
    quantity_motorcycles,
  }: Establishment): Promise<Establishment> {
    const cnpjValid = this.validatorCNPJCPFValidatorProvider.cnpjValidate(cnpj);

    if (!cnpjValid) {
      throw new AppError('CNPJ provided is not valid', 400);
    }

    const establishment = await this.establishmentRepository.create({
      name,
      cnpj,
      address,
      phone,
      quantity_cars,
      quantity_motorcycles,
    });

    return establishment;
  }
}

export default CreateEstablishmentService;
