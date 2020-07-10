import 'reflect-metadata';

import FakeEstablishmentRepository from '@modules/establishments/mock/FakeEstablishmentRepository';
import CNPJCPFValidatorProvider from '@modules/establishments/providers/CNPJCPFValidatorProvider/implementations/CNPJCPFValidatorProvider';
import ListOneEstablishmentService from '@modules/establishments/services/ListOneEstablishmentService';
import CreateEstablishmentService from '@modules/establishments/services/CreateEstablishmentService';

let fakeEstablishmentRepository: FakeEstablishmentRepository;
let listOneEstablishmentService: ListOneEstablishmentService;
let createEstablishmentService: CreateEstablishmentService;
let cnpjCPFValidatorProvider: CNPJCPFValidatorProvider;

describe('ListOneEstablishmentsService', () => {
  beforeEach(() => {
    fakeEstablishmentRepository = new FakeEstablishmentRepository();
    cnpjCPFValidatorProvider = new CNPJCPFValidatorProvider();
    createEstablishmentService = new CreateEstablishmentService(
      fakeEstablishmentRepository,
      cnpjCPFValidatorProvider,
    );
    listOneEstablishmentService = new ListOneEstablishmentService(
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

    const foundEstablishment = await listOneEstablishmentService.execute({
      id: String(establishment.id),
    });

    expect(foundEstablishment).toHaveProperty('id');
  });
});
