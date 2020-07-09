import 'reflect-metadata';

import FakeVehiclesRepository from '@modules/vehicles/mock/FakeVehiclesRepository';
import AppError from '@shared/errors/AppError';
import UpdateVehiclesService from '@modules/vehicles/services/UpdateVehiclesService';
import CreateVehiclesService from '@modules/vehicles/services/CreateVehiclesService';

let fakeVehicleRepository: FakeVehiclesRepository;
let createVehiclesService: CreateVehiclesService;
let updateVehiclesService: UpdateVehiclesService;

describe('UpdateVehicleService', () => {
  beforeEach(() => {
    fakeVehicleRepository = new FakeVehiclesRepository();
    createVehiclesService = new CreateVehiclesService(fakeVehicleRepository);
    updateVehiclesService = new UpdateVehiclesService(fakeVehicleRepository);
  });

  it('should be able update a vehicle', async () => {
    const vehicle = await createVehiclesService.execute({
      brand: 'Toyota',
      model: 'Collora',
      color: 'Branco',
      plate: 'TTT-1234',
      type_id: 'uuid',
    });

    const updatedVehicle = await updateVehiclesService.execute({
      id: vehicle.id,
      brand: 'Toyota',
      model: 'Prius',
      color: 'Branco',
      plate: 'TTT-1234',
      type_id: 'uuid',
    });

    expect(updatedVehicle.model).toBe('Prius');
  });

  it('should not be able update a vehicle that does not exists', async () => {
    await expect(
      updateVehiclesService.execute({
        id: 'wrong-id',
        brand: 'Toyota',
        model: 'Prius',
        color: 'Branco',
        plate: 'TTT-1234',
        type_id: 'uuid',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
