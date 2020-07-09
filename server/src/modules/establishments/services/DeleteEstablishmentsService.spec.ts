import 'reflect-metadata';

import FakeEstablishmentRepository from '@modules/establishments/mock/FakeEstablishmentRepository';
import CNPJCPFValidatorProvider from '@modules/establishments/providers/CNPJCPFValidatorProvider/implementations/CNPJCPFValidatorProvider';
import CreateEstablishmentService from '@modules/establishments/services/CreateEstablishmentService';
import DeleteEstablishmentsService from '@modules/establishments/services/DeleteEstablishmentsService';
import AppError from '@shared/errors/AppError';

let fakeEstablishmentRepository: FakeEstablishmentRepository;
let createEstablishmentService: CreateEstablishmentService;
let deleteEstablishmentsService: DeleteEstablishmentsService;
let cnpjCPFValidatorProvider: CNPJCPFValidatorProvider;

describe('DeleteEstablishmentsService', () => {
  beforeEach(() => {
    fakeEstablishmentRepository = new FakeEstablishmentRepository();
    cnpjCPFValidatorProvider = new CNPJCPFValidatorProvider();
    createEstablishmentService = new CreateEstablishmentService(
      fakeEstablishmentRepository,
      cnpjCPFValidatorProvider,
    );

    deleteEstablishmentsService = new DeleteEstablishmentsService(
      fakeEstablishmentRepository,
    );
  });

  it('should be able delete a establishement', async () => {
    const establishment = await createEstablishmentService.execute({
      name: 'Lucas estacionamento',
      cnpj: 32055085000100,
      address: 'Rua prefeito armindo faustino de mello, 41',
      phone: '11 99943-2124',
      quantity_cars: 1,
      quantity_motorcycles: 2,
    });

    const establishments = await deleteEstablishmentsService.execute({
      id: String(establishment.id),
    });

    expect(establishments).toHaveProperty('id');
  });

  it('should not be able to delte a establishement', async () => {
    expect(
      deleteEstablishmentsService.execute({
        id: 'wrong-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
