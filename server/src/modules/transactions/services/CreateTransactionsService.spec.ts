import 'reflect-metadata';

import CNPJCPFValidatorProvider from '@modules/establishments/providers/CNPJCPFValidatorProvider/implementations/CNPJCPFValidatorProvider';

import FakeEstablishmentRepository from '@modules/establishments/mock/FakeEstablishmentRepository';
import FakeVehiclesRepository from '@modules/vehicles/mock/FakeVehiclesRepository';
import CreateEstablishmentService from '@modules/establishments/services/CreateEstablishmentService';
import CreateVehiclesService from '@modules/vehicles/services/CreateVehiclesService';
import AppError from '@shared/errors/AppError';
import FakeTransactionsRepository from '../mock/FakeTransactionsRepository';

import CreateTransactionsService from './CreateTransactionsService';

let cnpjCPFValidatorProvider: CNPJCPFValidatorProvider;

let fakeTransactionsRepository: FakeTransactionsRepository;
let fakeEstablishmentRepository: FakeEstablishmentRepository;
let fakeVehiclesRepository: FakeVehiclesRepository;

let createTransactionsService: CreateTransactionsService;
let createEstablishmentService: CreateEstablishmentService;
let createVehiclesService: CreateVehiclesService;

describe('CreateEstablishmentsService', () => {
  beforeEach(() => {
    cnpjCPFValidatorProvider = new CNPJCPFValidatorProvider();

    fakeTransactionsRepository = new FakeTransactionsRepository();
    fakeVehiclesRepository = new FakeVehiclesRepository();
    fakeEstablishmentRepository = new FakeEstablishmentRepository();

    createTransactionsService = new CreateTransactionsService(
      fakeTransactionsRepository,
      fakeVehiclesRepository,
      fakeEstablishmentRepository,
    );

    createVehiclesService = new CreateVehiclesService(fakeVehiclesRepository);
    createEstablishmentService = new CreateEstablishmentService(
      fakeEstablishmentRepository,
      cnpjCPFValidatorProvider,
    );
  });

  it('should be able create a new transaction', async () => {
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

    expect(transaction).toHaveProperty('id');
  });

  it('should not be able create a new transaction with a invalid establishment', async () => {
    const vehicle = await createVehiclesService.execute({
      brand: 'Toyota',
      model: 'Collora',
      color: 'Branco',
      plate: 'TTT-1234',
      type_id: 'uuid',
    });

    await expect(
      createTransactionsService.execute({
        establishment_id: 'wrong-establishment',
        vehicle_id: String(vehicle.id),
        type: 'in',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able create a new transaction with a invalid vehicle', async () => {
    const establishment = await createEstablishmentService.execute({
      name: 'Lucas estacionamento',
      cnpj: 32055085000100,
      address: 'Rua prefeito armindo faustino de mello, 41',
      phone: '11 99943-2124',
      quantity_cars: 1,
      quantity_motorcycles: 2,
    });

    await expect(
      createTransactionsService.execute({
        establishment_id: String(establishment.id),
        vehicle_id: 'wrong-vehicle',
        type: 'in',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
