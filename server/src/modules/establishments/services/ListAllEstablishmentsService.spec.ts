import 'reflect-metadata';

import FakeEstablishmentRepository from '@modules/establishments/mock/FakeEstablishmentRepository';
import CNPJCPFValidatorProvider from '@modules/establishments/providers/CNPJCPFValidatorProvider/implementations/CNPJCPFValidatorProvider';
import ListAllEstablishmentsService from '@modules/establishments/services/ListAllEstablishmentsService';
import CreateEstablishmentService from '@modules/establishments/services/CreateEstablishmentService';

let fakeEstablishmentRepository: FakeEstablishmentRepository;
let listAllEstablishmentsService: ListAllEstablishmentsService;
let createEstablishmentService: CreateEstablishmentService;
let cnpjCPFValidatorProvider: CNPJCPFValidatorProvider;

describe('ListAllEstablishmentsService', () => {
  beforeEach(() => {
    fakeEstablishmentRepository = new FakeEstablishmentRepository();
    cnpjCPFValidatorProvider = new CNPJCPFValidatorProvider();
    createEstablishmentService = new CreateEstablishmentService(
      fakeEstablishmentRepository,
      cnpjCPFValidatorProvider,
    );
    listAllEstablishmentsService = new ListAllEstablishmentsService(
      fakeEstablishmentRepository,
    );
  });

  it('should be able list all establishements', async () => {
    const establishment = await createEstablishmentService.execute({
      name: 'Lucas estacionamento',
      cnpj: 32055085000100,
      address: 'Rua prefeito armindo faustino de mello, 41',
      phone: '11 99943-2124',
      quantity_cars: 1,
      quantity_motorcycles: 2,
    });

    const establishments = await listAllEstablishmentsService.execute();

    expect(establishments).toEqual([establishment]);
  });
});
