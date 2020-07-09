import 'reflect-metadata';

import FakeVehiclesRepository from '@modules/vehicles/mock/FakeVehiclesRepository';
import FakeEstablishmentRepository from '@modules/establishments/mock/FakeEstablishmentRepository';
import CreateVehiclesService from '@modules/vehicles/services/CreateVehiclesService';
import CreateEstablishmentService from '@modules/establishments/services/CreateEstablishmentService';
import CNPJCPFValidatorProvider from '@modules/establishments/providers/CNPJCPFValidatorProvider/implementations/CNPJCPFValidatorProvider';
import FakeTransactionsRepository from '../mock/FakeTransactionsRepository';

import ListTransactionsByDayService from './ListTransactionsByDayService';

import CreateTransactionsService from './CreateTransactionsService';

let fakeTransactionsRepository: FakeTransactionsRepository;
let fakeVehiclesRepository: FakeVehiclesRepository;
let fakeEstablishmentRepository: FakeEstablishmentRepository;
let listTransactionsByDayService: ListTransactionsByDayService;
let createTransactionsService: CreateTransactionsService;
let createVehiclesService: CreateVehiclesService;
let cnpjCPFValidatorProvider: CNPJCPFValidatorProvider;
let createEstablishmentService: CreateEstablishmentService;

describe('ListTransactionsByDayService', () => {
  beforeEach(() => {
    fakeTransactionsRepository = new FakeTransactionsRepository();
    fakeEstablishmentRepository = new FakeEstablishmentRepository();
    fakeVehiclesRepository = new FakeVehiclesRepository();
    cnpjCPFValidatorProvider = new CNPJCPFValidatorProvider();

    createVehiclesService = new CreateVehiclesService(fakeVehiclesRepository);

    createEstablishmentService = new CreateEstablishmentService(
      fakeEstablishmentRepository,
      cnpjCPFValidatorProvider,
    );

    createTransactionsService = new CreateTransactionsService(
      fakeTransactionsRepository,
      fakeVehiclesRepository,
      fakeEstablishmentRepository,
    );

    listTransactionsByDayService = new ListTransactionsByDayService(
      fakeTransactionsRepository,
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

    const vehicle = await createVehiclesService.execute({
      brand: 'Toyota',
      model: 'Collora',
      color: 'Branco',
      plate: 'TTT-1234',
      type_id: 'uuid',
    });

    const transaction = await createTransactionsService.execute({
      establishment_id: String(establishment.id),
      vehicle_id: String(vehicle.id),
      type: 'in',
    });

    const transactions = await listTransactionsByDayService.execute();

    expect(transactions).toEqual([transaction]);
  });
});
