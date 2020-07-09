import 'reflect-metadata';

import FakeEstablishmentRepository from '@modules/establishments/mock/FakeEstablishmentRepository';
import CNPJCPFValidatorProvider from '@modules/establishments/providers/CNPJCPFValidatorProvider/implementations/CNPJCPFValidatorProvider';
import AppError from '@shared/errors/AppError';
import CreateEstablishmentService from '@modules/establishments/services/CreateEstablishmentService';
import UpdateEstablishmentsService from './UpdateEstablishmentsService';

let fakeEstablishmentRepository: FakeEstablishmentRepository;
let cnpjCPFValidatorProvider: CNPJCPFValidatorProvider;
let updateEstablishmentsService: UpdateEstablishmentsService;
let createEstablishmentService: CreateEstablishmentService;

describe('UpdateEstablishmentsService', () => {
  beforeEach(() => {
    fakeEstablishmentRepository = new FakeEstablishmentRepository();
    cnpjCPFValidatorProvider = new CNPJCPFValidatorProvider();

    createEstablishmentService = new CreateEstablishmentService(
      fakeEstablishmentRepository,
      cnpjCPFValidatorProvider,
    );

    updateEstablishmentsService = new UpdateEstablishmentsService(
      fakeEstablishmentRepository,
    );
  });

  it('should be able update an establishment', async () => {
    const establishment = await createEstablishmentService.execute({
      name: 'Lucas estacionamento',
      cnpj: 32055085000100,
      address: 'Rua prefeito armindo faustino de mello, 41',
      phone: '11 99943-2124',
      quantity_cars: 1,
      quantity_motorcycles: 2,
    });

    const updatedEstablishment = await updateEstablishmentsService.execute({
      id: establishment.id,
      name: 'Teste Lucas estacionamento',
      address: 'Rua prefeito armindo faustino de mello, 41',
      phone: '11 99943-2124',
      quantity_cars: 1,
      quantity_motorcycles: 2,
    });

    expect(updatedEstablishment.name).toBe('Teste Lucas estacionamento');
  });

  it('should not be able to update a establishment that does not exists', async () => {
    await expect(
      updateEstablishmentsService.execute({
        name: 'Teste Lucas estacionamento',
        address: 'Rua prefeito armindo faustino de mello, 41',
        phone: '11 99943-2124',
        quantity_cars: 1,
        quantity_motorcycles: 2,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a establishment with invalid CNPJ', async () => {
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
