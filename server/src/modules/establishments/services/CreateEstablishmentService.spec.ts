import 'reflect-metadata';

import FakeEstablishmentRepository from '@modules/establishments/mock/FakeEstablishmentRepository';
import CNPJCPFValidatorProvider from '@modules/establishments/providers/CNPJCPFValidatorProvider/implementations/CNPJCPFValidatorProvider';
import AppError from '@shared/errors/AppError';
import CreateEstablishmentService from '@modules/establishments/services/CreateEstablishmentService';

let fakeEstablishmentRepository: FakeEstablishmentRepository;
let cnpjCPFValidatorProvider: CNPJCPFValidatorProvider;
let createEstablishmentService: CreateEstablishmentService;

describe('CreateEstablishmentsService', () => {
  beforeEach(() => {
    fakeEstablishmentRepository = new FakeEstablishmentRepository();
    cnpjCPFValidatorProvider = new CNPJCPFValidatorProvider();
    createEstablishmentService = new CreateEstablishmentService(
      fakeEstablishmentRepository,
      cnpjCPFValidatorProvider,
    );
  });

  it('should be able create a new establishment', async () => {
    const establishment = await createEstablishmentService.execute({
      name: 'Lucas estacionamento',
      cnpj: 32055085000100,
      address: 'Rua prefeito armindo faustino de mello, 41',
      phone: '11 99943-2124',
      quantity_cars: 1,
      quantity_motorcycles: 2,
    });

    expect(establishment).toHaveProperty('id');
  });

  it('should not be able create a establishment with invalid CNPJ', async () => {
    await expect(
      createEstablishmentService.execute({
        name: 'Lucas estacionamento',
        cnpj: 1132213,
        address: 'Rua prefeito armindo faustino de mello, 41',
        phone: '11 99943-2124',
        quantity_cars: 1,
        quantity_motorcycles: 2,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
