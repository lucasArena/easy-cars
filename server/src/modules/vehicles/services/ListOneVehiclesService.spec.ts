import 'reflect-metadata';

import FakeVehiclesRepository from '@modules/vehicles/mock/FakeVehiclesRepository';
import CreateVehiclesService from '@modules/vehicles/services/CreateVehiclesService';
import ListOneVehicleService from '@modules/vehicles/services/ListOneVehicleService';
import AppError from '@shared/errors/AppError';

let fakeVehiclesRepository: FakeVehiclesRepository;
let listOneVehicleService: ListOneVehicleService;
let createVehiclesService: CreateVehiclesService;

describe('ListAllVehiclesService', () => {
  beforeEach(() => {
    fakeVehiclesRepository = new FakeVehiclesRepository();
    createVehiclesService = new CreateVehiclesService(fakeVehiclesRepository);
    listOneVehicleService = new ListOneVehicleService(fakeVehiclesRepository);
  });

  it('should be able list one vehicle', async () => {
    const vehicle = await createVehiclesService.execute({
      brand: 'Toyota',
      model: 'Collora',
      color: 'Branco',
      plate: 'TTT-1234',
      type_id: 'uuid',
    });

    const foundVehicle = await listOneVehicleService.execute({
      id: String(vehicle.id),
    });

    expect(foundVehicle).toHaveProperty('id');
  });

  it('should not be able list one vehicle that does not exists', async () => {
    await expect(
      listOneVehicleService.execute({
        id: 'wrong-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
